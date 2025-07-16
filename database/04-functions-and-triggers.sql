-- =============================================================================
-- ServiceHub Database - Functions and Triggers
-- =============================================================================
-- This file creates all functions, triggers, and automated procedures
-- Execute this AFTER 03-indexes-and-constraints.sql

-- =============================================================================
-- UTILITY FUNCTIONS
-- =============================================================================

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to generate slug from text
CREATE OR REPLACE FUNCTION generate_slug(input_text TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN lower(
        regexp_replace(
            regexp_replace(
                unaccent(trim(input_text)),
                '[^a-zA-Z0-9\s-]', '', 'g'
            ),
            '\s+', '-', 'g'
        )
    );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to calculate distance between two points (Haversine formula)
CREATE OR REPLACE FUNCTION calculate_distance_km(
    lat1 DECIMAL, lon1 DECIMAL, 
    lat2 DECIMAL, lon2 DECIMAL
)
RETURNS DECIMAL AS $$
DECLARE
    r DECIMAL := 6371; -- Earth's radius in kilometers
    dlat DECIMAL;
    dlon DECIMAL;
    a DECIMAL;
    c DECIMAL;
BEGIN
    IF lat1 IS NULL OR lon1 IS NULL OR lat2 IS NULL OR lon2 IS NULL THEN
        RETURN NULL;
    END IF;
    
    dlat := radians(lat2 - lat1);
    dlon := radians(lon2 - lon1);
    
    a := sin(dlat/2) * sin(dlat/2) + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon/2) * sin(dlon/2);
    c := 2 * atan2(sqrt(a), sqrt(1-a));
    
    RETURN r * c;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- =============================================================================
-- BUSINESS LOGIC FUNCTIONS
-- =============================================================================

-- Function to update user rating based on reviews
CREATE OR REPLACE FUNCTION update_user_rating(user_uuid UUID)
RETURNS VOID AS $$
DECLARE
    avg_rating DECIMAL(3,2);
    review_count INTEGER;
BEGIN
    SELECT 
        COALESCE(AVG(rating), 0),
        COUNT(*)
    INTO avg_rating, review_count
    FROM reviews 
    WHERE reviewed_id = user_uuid 
    AND review_type = 'client_to_provider';
    
    UPDATE users 
    SET 
        average_rating = avg_rating,
        total_reviews = review_count,
        updated_at = NOW()
    WHERE id = user_uuid;
END;
$$ LANGUAGE plpgsql;

-- Function to update service proposal count
CREATE OR REPLACE FUNCTION update_service_proposal_count(service_uuid UUID)
RETURNS VOID AS $$
DECLARE
    proposal_count INTEGER;
BEGIN
    SELECT COUNT(*) 
    INTO proposal_count
    FROM proposals 
    WHERE service_id = service_uuid 
    AND status != 'withdrawn';
    
    UPDATE services 
    SET 
        proposals_count = proposal_count,
        status = CASE 
            WHEN proposal_count > 0 AND status = 'published' THEN 'proposal_received'::service_status_enum
            ELSE status
        END,
        updated_at = NOW()
    WHERE id = service_uuid;
END;
$$ LANGUAGE plpgsql;

-- Function to update user service statistics
CREATE OR REPLACE FUNCTION update_user_service_stats(user_uuid UUID)
RETURNS VOID AS $$
DECLARE
    total_count INTEGER;
    completed_count INTEGER;
    cancelled_count INTEGER;
    completion_rate DECIMAL(5,2);
BEGIN
    -- For providers: count services where they are the provider
    -- For clients: count services where they are the client
    SELECT 
        COUNT(*) FILTER (WHERE provider_id = user_uuid OR client_id = user_uuid),
        COUNT(*) FILTER (WHERE (provider_id = user_uuid OR client_id = user_uuid) AND status = 'completed'),
        COUNT(*) FILTER (WHERE (provider_id = user_uuid OR client_id = user_uuid) AND status = 'cancelled')
    INTO total_count, completed_count, cancelled_count
    FROM services 
    WHERE provider_id = user_uuid OR client_id = user_uuid;
    
    -- Calculate completion rate
    completion_rate := CASE 
        WHEN total_count > 0 THEN (completed_count::DECIMAL / total_count::DECIMAL) * 100
        ELSE 0
    END;
    
    UPDATE users 
    SET 
        total_services = total_count,
        completed_services = completed_count,
        cancelled_services = cancelled_count,
        completion_rate = completion_rate,
        updated_at = NOW()
    WHERE id = user_uuid;
END;
$$ LANGUAGE plpgsql;

-- Function to create notification
CREATE OR REPLACE FUNCTION create_notification(
    p_user_id UUID,
    p_type notification_type_enum,
    p_title VARCHAR(255),
    p_message TEXT,
    p_service_id UUID DEFAULT NULL,
    p_related_user_id UUID DEFAULT NULL,
    p_is_urgent BOOLEAN DEFAULT FALSE,
    p_data JSONB DEFAULT NULL,
    p_action_url TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    notification_id UUID;
BEGIN
    INSERT INTO notifications (
        user_id, type, title, message, related_service_id, 
        related_user_id, is_urgent, data, action_url
    ) VALUES (
        p_user_id, p_type, p_title, p_message, p_service_id,
        p_related_user_id, p_is_urgent, p_data, p_action_url
    ) RETURNING id INTO notification_id;
    
    RETURN notification_id;
END;
$$ LANGUAGE plpgsql;

-- Function to expire old proposals
CREATE OR REPLACE FUNCTION expire_old_proposals()
RETURNS INTEGER AS $$
DECLARE
    expired_count INTEGER;
BEGIN
    UPDATE proposals 
    SET 
        status = 'expired',
        updated_at = NOW()
    WHERE status = 'pending' 
    AND expires_at < NOW();
    
    GET DIAGNOSTICS expired_count = ROW_COUNT;
    RETURN expired_count;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- TRIGGER FUNCTIONS
-- =============================================================================

-- Trigger function for updated_at timestamp
CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger function for service category slug generation
CREATE OR REPLACE FUNCTION trigger_generate_category_slug()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.slug IS NULL OR NEW.slug = '' THEN
        NEW.slug = generate_slug(NEW.name);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger function for review rating update
CREATE OR REPLACE FUNCTION trigger_update_rating_on_review()
RETURNS TRIGGER AS $$
BEGIN
    -- Update rating for the reviewed user
    PERFORM update_user_rating(NEW.reviewed_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger function for proposal count update
CREATE OR REPLACE FUNCTION trigger_update_proposal_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        PERFORM update_service_proposal_count(NEW.service_id);
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        PERFORM update_service_proposal_count(NEW.service_id);
        IF OLD.service_id != NEW.service_id THEN
            PERFORM update_service_proposal_count(OLD.service_id);
        END IF;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        PERFORM update_service_proposal_count(OLD.service_id);
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger function for service statistics update
CREATE OR REPLACE FUNCTION trigger_update_service_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        PERFORM update_user_service_stats(NEW.client_id);
        IF NEW.provider_id IS NOT NULL THEN
            PERFORM update_user_service_stats(NEW.provider_id);
        END IF;
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        PERFORM update_user_service_stats(NEW.client_id);
        IF NEW.provider_id IS NOT NULL THEN
            PERFORM update_user_service_stats(NEW.provider_id);
        END IF;
        -- Handle provider change
        IF OLD.provider_id IS DISTINCT FROM NEW.provider_id THEN
            IF OLD.provider_id IS NOT NULL THEN
                PERFORM update_user_service_stats(OLD.provider_id);
            END IF;
        END IF;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        PERFORM update_user_service_stats(OLD.client_id);
        IF OLD.provider_id IS NOT NULL THEN
            PERFORM update_user_service_stats(OLD.provider_id);
        END IF;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger function for audit logging
CREATE OR REPLACE FUNCTION trigger_audit_log()
RETURNS TRIGGER AS $$
DECLARE
    user_id_val UUID;
BEGIN
    -- Try to get user_id from current session or use a default approach
    user_id_val := COALESCE(
        current_setting('app.current_user_id', true)::UUID,
        NULL
    );
    
    IF TG_OP = 'INSERT' THEN
        INSERT INTO audit_logs (table_name, record_id, action, new_values, user_id)
        VALUES (TG_TABLE_NAME, NEW.id, 'INSERT', to_jsonb(NEW), user_id_val);
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_logs (table_name, record_id, action, old_values, new_values, user_id)
        VALUES (TG_TABLE_NAME, NEW.id, 'UPDATE', to_jsonb(OLD), to_jsonb(NEW), user_id_val);
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO audit_logs (table_name, record_id, action, old_values, user_id)
        VALUES (TG_TABLE_NAME, OLD.id, 'DELETE', to_jsonb(OLD), user_id_val);
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- CREATE TRIGGERS
-- =============================================================================

-- Updated_at triggers for all relevant tables
CREATE TRIGGER trigger_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER trigger_service_categories_updated_at
    BEFORE UPDATE ON service_categories
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER trigger_services_updated_at
    BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER trigger_proposals_updated_at
    BEFORE UPDATE ON proposals
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER trigger_reviews_updated_at
    BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER trigger_messages_updated_at
    BEFORE UPDATE ON messages
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER trigger_payments_updated_at
    BEFORE UPDATE ON payments
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

-- Category slug generation trigger
CREATE TRIGGER trigger_service_categories_slug
    BEFORE INSERT OR UPDATE ON service_categories
    FOR EACH ROW EXECUTE FUNCTION trigger_generate_category_slug();

-- Review rating update trigger
CREATE TRIGGER trigger_reviews_rating_update
    AFTER INSERT OR UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION trigger_update_rating_on_review();

-- Proposal count update triggers
CREATE TRIGGER trigger_proposals_count_update
    AFTER INSERT OR UPDATE OR DELETE ON proposals
    FOR EACH ROW EXECUTE FUNCTION trigger_update_proposal_count();

-- Service statistics update triggers
CREATE TRIGGER trigger_services_stats_update
    AFTER INSERT OR UPDATE OR DELETE ON services
    FOR EACH ROW EXECUTE FUNCTION trigger_update_service_stats();

-- Audit logging triggers (for important tables)
CREATE TRIGGER trigger_users_audit
    AFTER INSERT OR UPDATE OR DELETE ON users
    FOR EACH ROW EXECUTE FUNCTION trigger_audit_log();

CREATE TRIGGER trigger_services_audit
    AFTER INSERT OR UPDATE OR DELETE ON services
    FOR EACH ROW EXECUTE FUNCTION trigger_audit_log();

CREATE TRIGGER trigger_proposals_audit
    AFTER INSERT OR UPDATE OR DELETE ON proposals
    FOR EACH ROW EXECUTE FUNCTION trigger_audit_log();

CREATE TRIGGER trigger_payments_audit
    AFTER INSERT OR UPDATE OR DELETE ON payments
    FOR EACH ROW EXECUTE FUNCTION trigger_audit_log();
