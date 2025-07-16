-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_categories_updated_at BEFORE UPDATE ON service_categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_proposals_updated_at BEFORE UPDATE ON proposals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update user statistics
CREATE OR REPLACE FUNCTION update_user_stats()
RETURNS TRIGGER AS $$
BEGIN
    -- Update provider statistics when a service is completed
    IF NEW.status = 'concluido' AND OLD.status != 'concluido' THEN
        UPDATE users 
        SET completed_services = completed_services + 1
        WHERE id = NEW.provider_id;
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_stats_trigger AFTER UPDATE ON services
    FOR EACH ROW EXECUTE FUNCTION update_user_stats();

-- Function to update average rating
CREATE OR REPLACE FUNCTION update_provider_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE users 
    SET 
        average_rating = (
            SELECT COALESCE(AVG(rating), 0) 
            FROM reviews 
            WHERE provider_id = NEW.provider_id
        ),
        total_reviews = (
            SELECT COUNT(*) 
            FROM reviews 
            WHERE provider_id = NEW.provider_id
        )
    WHERE id = NEW.provider_id;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_provider_rating_trigger AFTER INSERT OR UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_provider_rating();

-- Function to expire old proposals
CREATE OR REPLACE FUNCTION expire_old_proposals()
RETURNS void AS $$
BEGIN
    UPDATE proposals 
    SET status = 'expired' 
    WHERE status = 'pending' 
    AND expires_at < NOW();
END;
$$ language 'plpgsql';

-- Function to update system statistics
CREATE OR REPLACE FUNCTION update_system_stats()
RETURNS void AS $$
BEGIN
    -- Update active users count
    INSERT INTO system_stats (stat_key, stat_value, description)
    VALUES ('active_users', (SELECT COUNT(*) FROM users WHERE is_active = true), 'Total active users')
    ON CONFLICT (stat_key) 
    DO UPDATE SET 
        stat_value = EXCLUDED.stat_value,
        last_updated = NOW();
    
    -- Update active providers count
    INSERT INTO system_stats (stat_key, stat_value, description)
    VALUES ('active_providers', (SELECT COUNT(*) FROM users WHERE user_type = 'prestador' AND is_active = true), 'Total active providers')
    ON CONFLICT (stat_key) 
    DO UPDATE SET 
        stat_value = EXCLUDED.stat_value,
        last_updated = NOW();
    
    -- Update completed services count
    INSERT INTO system_stats (stat_key, stat_value, description)
    VALUES ('completed_services', (SELECT COUNT(*) FROM services WHERE status = 'concluido'), 'Total completed services')
    ON CONFLICT (stat_key) 
    DO UPDATE SET 
        stat_value = EXCLUDED.stat_value,
        last_updated = NOW();
    
    -- Update average rating
    INSERT INTO system_stats (stat_key, stat_value, description)
    VALUES ('average_rating', (SELECT COALESCE(AVG(average_rating), 0) FROM users WHERE user_type = 'prestador' AND total_reviews > 0), 'Platform average rating')
    ON CONFLICT (stat_key) 
    DO UPDATE SET 
        stat_value = EXCLUDED.stat_value,
        last_updated = NOW();
END;
$$ language 'plpgsql';
