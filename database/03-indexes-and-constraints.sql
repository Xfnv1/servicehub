-- =============================================================================
-- ServiceHub Database - Indexes and Performance Optimization
-- =============================================================================
-- This file creates all indexes for optimal query performance
-- Execute this AFTER 02-core-tables.sql

-- =============================================================================
-- USERS TABLE INDEXES
-- =============================================================================

-- Primary lookup indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_cpf ON users(cpf);

-- Filtering and search indexes
CREATE INDEX idx_users_user_type ON users(user_type);
CREATE INDEX idx_users_is_active ON users(is_active);
CREATE INDEX idx_users_is_verified ON users(is_verified);
CREATE INDEX idx_users_city_state ON users(city, state);
CREATE INDEX idx_users_location ON users(location);
CREATE INDEX idx_users_coordinates ON users USING GIST(coordinates);
CREATE INDEX idx_users_average_rating ON users(average_rating DESC);
CREATE INDEX idx_users_created_at ON users(created_at DESC);

-- Provider-specific indexes
CREATE INDEX idx_users_providers ON users(user_type, is_active, is_verified) WHERE user_type = 'prestador';
CREATE INDEX idx_users_hourly_rate ON users(hourly_rate) WHERE user_type = 'prestador';

-- Location-based indexes
CREATE INDEX idx_users_location ON users(latitude, longitude) WHERE latitude IS NOT NULL AND longitude IS NOT NULL;

-- Full-text search indexes
CREATE INDEX idx_users_full_name_trgm ON users USING gin(full_name gin_trgm_ops);
CREATE INDEX idx_users_specialties_gin ON users USING gin(specialties) WHERE user_type = 'prestador';

-- Performance tracking indexes
CREATE INDEX idx_users_last_login ON users(last_login_at DESC);

-- =============================================================================
-- SERVICE CATEGORIES TABLE INDEXES
-- =============================================================================

CREATE INDEX idx_service_categories_slug ON service_categories(slug);
CREATE INDEX idx_service_categories_parent ON service_categories(parent_id);
CREATE INDEX idx_service_categories_name ON service_categories(name);
CREATE INDEX idx_service_categories_active ON service_categories(is_active);
CREATE INDEX idx_service_categories_sort ON service_categories(sort_order);
CREATE INDEX idx_service_categories_name_trgm ON service_categories USING gin(name gin_trgm_ops);

-- =============================================================================
-- SERVICES TABLE INDEXES
-- =============================================================================

-- Relationship indexes
CREATE INDEX idx_services_client_id ON services(client_id);
CREATE INDEX idx_services_provider_id ON services(provider_id);
CREATE INDEX idx_services_category_id ON services(category_id);

-- Status and filtering indexes
CREATE INDEX idx_services_status ON services(status);
CREATE INDEX idx_services_urgency ON services(urgency);
CREATE INDEX idx_services_published ON services(status, published_at DESC) WHERE status != 'draft';
CREATE INDEX idx_services_location ON services(location);
CREATE INDEX idx_services_coordinates ON services USING GIST(coordinates);

-- Date and time indexes
CREATE INDEX idx_services_created_at ON services(created_at DESC);
CREATE INDEX idx_services_preferred_date ON services(preferred_date);
CREATE INDEX idx_services_deadline ON services(deadline);

-- Search and filtering indexes
CREATE INDEX idx_services_budget ON services(budget_min, budget_max);
CREATE INDEX idx_services_title_trgm ON services USING gin(title gin_trgm_ops);
CREATE INDEX idx_services_description_trgm ON services USING gin(description gin_trgm_ops);
CREATE INDEX idx_services_tags_gin ON services USING gin(tags);
CREATE INDEX idx_services_full_text ON services USING GIN(to_tsvector('portuguese', title || ' ' || description));

-- Available services (most important query)
CREATE INDEX idx_services_available ON services(status, category_id, city, created_at DESC) 
WHERE status IN ('published', 'proposal_received');

-- Provider dashboard
CREATE INDEX idx_services_provider_dashboard ON services(provider_id, status, updated_at DESC) 
WHERE provider_id IS NOT NULL;

-- Client dashboard
CREATE INDEX idx_services_client_dashboard ON services(client_id, status, updated_at DESC);

-- =============================================================================
-- PROPOSALS TABLE INDEXES
-- =============================================================================

-- Relationship indexes
CREATE INDEX idx_proposals_service_id ON proposals(service_id);
CREATE INDEX idx_proposals_provider_id ON proposals(provider_id);

-- Status and lifecycle indexes
CREATE INDEX idx_proposals_status ON proposals(status);
CREATE INDEX idx_proposals_expires_at ON proposals(expires_at) WHERE status = 'pending';
CREATE INDEX idx_proposals_created_at ON proposals(created_at DESC);

-- Service-provider combination
CREATE INDEX idx_proposals_service_provider ON proposals(service_id, provider_id);

-- Provider dashboard
CREATE INDEX idx_proposals_provider_dashboard ON proposals(provider_id, status, created_at DESC);

-- Active proposals
CREATE INDEX idx_proposals_active ON proposals(service_id, status, created_at DESC) 
WHERE status = 'pending' AND expires_at > NOW();

-- =============================================================================
-- REVIEWS TABLE INDEXES
-- =============================================================================

-- Relationship indexes
CREATE INDEX idx_reviews_service_id ON reviews(service_id);
CREATE INDEX idx_reviews_reviewer_id ON reviews(reviewer_id);
CREATE INDEX idx_reviews_reviewed_id ON reviews(reviewed_id);
CREATE INDEX idx_reviews_client_id ON reviews(client_id);
CREATE INDEX idx_reviews_provider_id ON reviews(provider_id);

-- Rating and sorting indexes
CREATE INDEX idx_reviews_rating ON reviews(rating DESC);
CREATE INDEX idx_reviews_created_at ON reviews(created_at DESC);
CREATE INDEX idx_reviews_public ON reviews(is_public);

-- Provider reviews (most common query)
CREATE INDEX idx_reviews_provider ON reviews(reviewed_id, rating DESC, created_at DESC) 
WHERE review_type = 'client_to_provider';

-- Helpful reviews
CREATE INDEX idx_reviews_helpful ON reviews(helpful_votes DESC, total_votes DESC);

-- Full-text search
CREATE INDEX idx_reviews_comment_trgm ON reviews USING gin(comment gin_trgm_ops) 
WHERE comment IS NOT NULL;

-- =============================================================================
-- MESSAGES TABLE INDEXES
-- =============================================================================

-- Relationship indexes
CREATE INDEX idx_messages_service_id ON messages(service_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON messages(receiver_id);

-- Conversation indexes
CREATE INDEX idx_messages_conversation ON messages(sender_id, receiver_id, service_id);
CREATE INDEX idx_messages_user_conversations ON messages(sender_id, receiver_id, created_at DESC);

-- Unread messages
CREATE INDEX idx_messages_unread ON messages(receiver_id, is_read);

-- Thread support
CREATE INDEX idx_messages_parent ON messages(parent_message_id);

-- =============================================================================
-- NOTIFICATIONS TABLE INDEXES
-- =============================================================================

-- User notifications (most common query)
CREATE INDEX idx_notifications_user ON notifications(user_id, created_at DESC);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_urgent ON notifications(is_urgent);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX idx_notifications_expires_at ON notifications(expires_at);

-- Related entities
CREATE INDEX idx_notifications_service ON notifications(related_service_id);
CREATE INDEX idx_notifications_user_related ON notifications(related_user_id);

-- =============================================================================
-- PAYMENTS TABLE INDEXES
-- =============================================================================

-- Relationship indexes
CREATE INDEX idx_payments_service_id ON payments(service_id);
CREATE INDEX idx_payments_payer_id ON payments(payer_id);
CREATE INDEX idx_payments_receiver_id ON payments(receiver_id);

-- Status and processing
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_processed_at ON payments(processed_at DESC);

-- Financial reporting
CREATE INDEX idx_payments_amount ON payments(amount DESC);
CREATE INDEX idx_payments_created_at ON payments(created_at DESC);
CREATE INDEX idx_payments_transaction_id ON payments(transaction_id);

-- Provider earnings
CREATE INDEX idx_payments_provider_earnings ON payments(receiver_id, status, processed_at DESC) 
WHERE status = 'completed';

-- External tracking
CREATE INDEX idx_payments_external_id ON payments(external_transaction_id) 
WHERE external_transaction_id IS NOT NULL;

-- =============================================================================
-- USER SESSIONS TABLE INDEXES
-- =============================================================================

CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX idx_user_sessions_active ON user_sessions(is_active);
CREATE INDEX idx_user_sessions_expires_at ON user_sessions(expires_at);

-- =============================================================================
-- AUDIT LOGS TABLE INDEXES
-- =============================================================================

CREATE INDEX idx_audit_logs_table_record ON audit_logs(table_name, record_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);

-- =============================================================================
-- COMPOSITE INDEXES FOR COMPLEX QUERIES
-- =============================================================================

-- Service search with filters
CREATE INDEX idx_services_search_composite ON services(
    status, category_id, city, budget_min, budget_max, created_at DESC
) WHERE status IN ('published', 'proposal_received');

-- Provider performance tracking
CREATE INDEX idx_users_provider_performance ON users(
    user_type, average_rating DESC, total_reviews DESC, completion_rate DESC
) WHERE user_type = 'prestador' AND is_active = TRUE;

-- Recent activity dashboard
CREATE INDEX idx_services_recent_activity ON services(
    client_id, status, updated_at DESC
) WHERE status IN ('in_progress', 'completed', 'cancelled');

-- =============================================================================
-- SYSTEM STATS TABLE INDEXES
-- =============================================================================

CREATE INDEX idx_system_stats_key ON system_stats(stat_key);
CREATE INDEX idx_system_stats_updated ON system_stats(last_updated DESC);

-- =============================================================================
-- BRAZILIAN LOCATIONS TABLE INDEXES
-- =============================================================================

CREATE INDEX idx_brazilian_locations_state ON brazilian_locations(state);
CREATE INDEX idx_brazilian_locations_city ON brazilian_locations(city);
CREATE INDEX idx_brazilian_locations_coordinates ON brazilian_locations(latitude, longitude);
CREATE INDEX idx_brazilian_locations_capital ON brazilian_locations(is_capital);
