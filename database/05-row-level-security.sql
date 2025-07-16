-- =============================================================================
-- ServiceHub Database - Row Level Security (RLS) Policies
-- =============================================================================
-- This file creates all RLS policies for data security
-- Execute this AFTER 04-functions-and-triggers.sql

-- =============================================================================
-- ENABLE ROW LEVEL SECURITY
-- =============================================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- USERS TABLE POLICIES
-- =============================================================================

-- Users can view their own profile
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Users can insert their own profile (registration)
CREATE POLICY "users_insert_own" ON users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Anyone can view public provider profiles
CREATE POLICY "users_select_providers_public" ON users
    FOR SELECT USING (
        user_type = 'prestador' 
        AND is_active = true 
        AND is_verified = true
    );

-- Anyone can view basic client info (for reviews and messages)
CREATE POLICY "users_select_clients_basic" ON users
    FOR SELECT USING (
        user_type = 'cliente' 
        AND is_active = true
    );

-- Public profiles are viewable
CREATE POLICY "Public profiles are viewable" ON users
    FOR SELECT USING (is_active = true);

-- =============================================================================
-- SERVICE CATEGORIES POLICIES
-- =============================================================================

-- Anyone can view active service categories
CREATE POLICY "service_categories_select_active" ON service_categories
    FOR SELECT USING (is_active = true);

-- Only authenticated users can view all categories
CREATE POLICY "service_categories_select_all" ON service_categories
    FOR SELECT USING (auth.role() = 'authenticated');

-- Service categories are publicly readable
CREATE POLICY "Service categories are publicly readable" ON service_categories
    FOR SELECT USING (is_active = true);

-- =============================================================================
-- SERVICES POLICIES
-- =============================================================================

-- Clients can view their own services
CREATE POLICY "services_select_own_client" ON services
    FOR SELECT USING (auth.uid() = client_id);

-- Clients can create services
CREATE POLICY "Clients can create services" ON services
    FOR INSERT WITH CHECK (auth.uid() = client_id);

-- Clients can update their own services
CREATE POLICY "Clients can update their own services" ON services
    FOR UPDATE USING (auth.uid() = client_id);

-- Providers can view assigned services
CREATE POLICY "services_select_assigned_provider" ON services
    FOR SELECT USING (auth.uid() = provider_id);

-- Providers can update assigned services (limited fields)
CREATE POLICY "services_update_assigned_provider" ON services
    FOR UPDATE USING (
        auth.uid() = provider_id 
        AND status IN ('assigned', 'in_progress', 'completed')
    );

-- Anyone can view published services (for browsing)
CREATE POLICY "services_select_published" ON services
    FOR SELECT USING (
        status IN ('published', 'proposal_received')
        AND published_at IS NOT NULL
    );

-- Providers can view services in their work radius
CREATE POLICY "services_select_in_radius" ON services
    FOR SELECT USING (
        status IN ('published', 'proposal_received')
        AND EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.user_type = 'prestador'
            AND users.is_active = true
            AND (
                users.work_radius_km IS NULL 
                OR calculate_distance_km(
                    users.latitude, users.longitude,
                    services.latitude, services.longitude
                ) <= users.work_radius_km
            )
        )
    );

-- Users can view all active services
CREATE POLICY "Users can view all active services" ON services
    FOR SELECT USING (true);

-- Providers can update accepted services
CREATE POLICY "Providers can update accepted services" ON services
    FOR UPDATE USING (auth.uid() = provider_id);

-- =============================================================================
-- PROPOSALS POLICIES
-- =============================================================================

-- Providers can view their own proposals
CREATE POLICY "proposals_select_own_provider" ON proposals
    FOR SELECT USING (auth.uid() = provider_id);

-- Providers can create proposals
CREATE POLICY "Providers can create proposals" ON proposals
    FOR INSERT WITH CHECK (auth.uid() = provider_id);

-- Providers can update their own proposals
CREATE POLICY "Providers can update their own proposals" ON proposals
    FOR UPDATE USING (
        auth.uid() = provider_id 
        AND status IN ('pending', 'accepted')
    );

-- Clients can view proposals for their services
CREATE POLICY "proposals_select_for_own_services" ON proposals
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM services 
            WHERE services.id = service_id 
            AND services.client_id = auth.uid()
        )
    );

-- Clients can update proposals for their services (accept/reject)
CREATE POLICY "proposals_update_for_own_services" ON proposals
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM services 
            WHERE services.id = service_id 
            AND services.client_id = auth.uid()
        )
        AND status = 'pending'
    );

-- Service owners and providers can view proposals
CREATE POLICY "Service owners and providers can view proposals" ON proposals
    FOR SELECT USING (
        auth.uid() = provider_id OR 
        auth.uid() IN (SELECT client_id FROM services WHERE id = service_id)
    );

-- =============================================================================
-- REVIEWS POLICIES
-- =============================================================================

-- Anyone can view reviews
CREATE POLICY "reviews_select_all" ON reviews
    FOR SELECT USING (true);

-- Users can create reviews for services they participated in
CREATE POLICY "Clients can create reviews for their services" ON reviews
    FOR INSERT WITH CHECK (
        auth.uid() = client_id
        AND EXISTS (
            SELECT 1 FROM services 
            WHERE services.id = service_id 
            AND services.status = 'completed'
            AND (
                (services.client_id = auth.uid() AND reviewed_id = services.provider_id) OR
                (services.provider_id = auth.uid() AND reviewed_id = services.client_id)
            )
        )
    );

-- Users can update their own reviews
CREATE POLICY "Users can update their own reviews" ON reviews
    FOR UPDATE USING (auth.uid() = client_id OR auth.uid() = provider_id);

-- Reviewed users can respond to reviews
CREATE POLICY "reviews_respond" ON reviews
    FOR UPDATE USING (
        auth.uid() = reviewed_id 
        AND response IS NULL
    );

-- Reviews are publicly readable
CREATE POLICY "Reviews are publicly readable" ON reviews
    FOR SELECT USING (is_public = true);

-- =============================================================================
-- MESSAGES POLICIES
-- =============================================================================

-- Users can view messages they sent or received
CREATE POLICY "Users can view their own messages" ON messages
    FOR SELECT USING (
        auth.uid() = sender_id 
        OR auth.uid() = receiver_id
    );

-- Users can send messages
CREATE POLICY "Users can send messages" ON messages
    FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Users can update messages they received (mark as read)
CREATE POLICY "messages_update_receiver" ON messages
    FOR UPDATE USING (auth.uid() = receiver_id);

-- Users can update messages they sent (mark as deleted)
CREATE POLICY "messages_update_sender" ON messages
    FOR UPDATE USING (auth.uid() = sender_id);

-- Users can update their own messages
CREATE POLICY "Users can update their own messages" ON messages
    FOR UPDATE USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

-- =============================================================================
-- NOTIFICATIONS POLICIES
-- =============================================================================

-- Users can view their own notifications
CREATE POLICY "Users can view their own notifications" ON notifications
    FOR SELECT USING (auth.uid() = user_id);

-- Users can update their own notifications (mark as read)
CREATE POLICY "notifications_update_own" ON notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- System can create notifications for users
CREATE POLICY "notifications_insert_system" ON notifications
    FOR INSERT WITH CHECK (true);

-- =============================================================================
-- PAYMENTS POLICIES
-- =============================================================================

-- Users can view payments they are involved in
CREATE POLICY "Users can view their own payments" ON payments
    FOR SELECT USING (
        auth.uid() = payer_id 
        OR auth.uid() = receiver_id
    );

-- System can create payments
CREATE POLICY "payments_insert_system" ON payments
    FOR INSERT WITH CHECK (true);

-- System can update payments
CREATE POLICY "payments_update_system" ON payments
    FOR UPDATE USING (true);

-- =============================================================================
-- USER SESSIONS POLICIES
-- =============================================================================

-- Users can view their own sessions
CREATE POLICY "Users can view their own sessions" ON user_sessions
    FOR SELECT USING (auth.uid() = user_id);

-- Users can update their own sessions
CREATE POLICY "Users can update their own sessions" ON user_sessions
    FOR UPDATE USING (auth.uid() = user_id);

-- System can manage sessions
CREATE POLICY "user_sessions_insert_system" ON user_sessions
    FOR INSERT WITH CHECK (true);

-- =============================================================================
-- AUDIT LOGS POLICIES
-- =============================================================================

-- Only system/admin can view audit logs
CREATE POLICY "audit_logs_select_admin" ON audit_logs
    FOR SELECT USING (
        auth.jwt() ->> 'role' = 'admin'
        OR auth.jwt() ->> 'role' = 'service_role'
    );

-- System can insert audit logs
CREATE POLICY "audit_logs_insert_system" ON audit_logs
    FOR INSERT WITH CHECK (true);

-- =============================================================================
-- ADDITIONAL SECURITY FUNCTIONS
-- =============================================================================

-- Function to check if user can access service
CREATE OR REPLACE FUNCTION can_access_service(service_uuid UUID, user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM services 
        WHERE id = service_uuid 
        AND (
            client_id = user_uuid 
            OR provider_id = user_uuid 
            OR status IN ('published', 'proposal_received')
        )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user can message another user
CREATE OR REPLACE FUNCTION can_message_user(sender_uuid UUID, receiver_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM services s
        WHERE (s.client_id = sender_uuid AND s.provider_id = receiver_uuid)
           OR (s.client_id = receiver_uuid AND s.provider_id = sender_uuid)
           OR EXISTS (
               SELECT 1 FROM proposals p
               WHERE p.service_id = s.id
               AND ((s.client_id = sender_uuid AND p.provider_id = receiver_uuid)
                    OR (s.client_id = receiver_uuid AND p.provider_id = sender_uuid))
           )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
