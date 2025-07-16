-- =============================================================================
-- ServiceHub Database - Maintenance Procedures
-- =============================================================================
-- This file creates maintenance procedures and scheduled tasks
-- Execute this AFTER 06-seed-data.sql

-- =============================================================================
-- CLEANUP PROCEDURES
-- =============================================================================

-- Procedure to clean up expired notifications
CREATE OR REPLACE FUNCTION cleanup_expired_notifications()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM notifications 
    WHERE expires_at IS NOT NULL 
    AND expires_at < NOW() - INTERVAL '30 days';
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Procedure to clean up old audit logs
CREATE OR REPLACE FUNCTION cleanup_old_audit_logs()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM audit_logs 
    WHERE created_at < NOW() - INTERVAL '1 year';
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Procedure to clean up expired user sessions
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    DELETE FROM user_sessions 
    WHERE expires_at < NOW() 
    OR last_activity_at < NOW() - INTERVAL '30 days';
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Procedure to expire old proposals
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
    
    -- Update service proposal counts for affected services
    PERFORM update_service_proposal_count(service_id)
    FROM proposals 
    WHERE status = 'expired' 
    AND updated_at > NOW() - INTERVAL '1 minute';
    
    RETURN expired_count;
END;
$$ LANGUAGE plpgsql;

-- Procedure to clean up expired data
CREATE OR REPLACE FUNCTION cleanup_expired_data()
RETURNS void AS $$
BEGIN
    -- Clean up expired proposals
    DELETE FROM proposals 
    WHERE status = 'expired' 
    AND created_at < NOW() - INTERVAL '30 days';
    
    -- Clean up old notifications
    DELETE FROM notifications 
    WHERE created_at < NOW() - INTERVAL '90 days'
    AND is_read = true;
    
    -- Clean up expired sessions
    DELETE FROM user_sessions 
    WHERE expires_at < NOW();
    
    -- Clean up old messages (keep for 1 year)
    DELETE FROM messages 
    WHERE created_at < NOW() - INTERVAL '1 year';
    
    RAISE NOTICE 'Cleanup completed successfully';
END;
$$ language 'plpgsql';

-- =============================================================================
-- ANALYTICS AND REPORTING PROCEDURES
-- =============================================================================

-- Function to get platform statistics
CREATE OR REPLACE FUNCTION get_platform_statistics()
RETURNS TABLE (
    total_users INTEGER,
    total_clients INTEGER,
    total_providers INTEGER,
    verified_providers INTEGER,
    total_services INTEGER,
    active_services INTEGER,
    completed_services INTEGER,
    total_proposals INTEGER,
    accepted_proposals INTEGER,
    total_reviews INTEGER,
    average_platform_rating DECIMAL(3,2),
    total_messages INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        (SELECT COUNT(*)::INTEGER FROM users WHERE is_active = true),
        (SELECT COUNT(*)::INTEGER FROM users WHERE user_type = 'cliente' AND is_active = true),
        (SELECT COUNT(*)::INTEGER FROM users WHERE user_type = 'prestador' AND is_active = true),
        (SELECT COUNT(*)::INTEGER FROM users WHERE user_type = 'prestador' AND is_verified = true AND is_active = true),
        (SELECT COUNT(*)::INTEGER FROM services),
        (SELECT COUNT(*)::INTEGER FROM services WHERE status IN ('published', 'proposal_received', 'assigned', 'in_progress')),
        (SELECT COUNT(*)::INTEGER FROM services WHERE status = 'completed'),
        (SELECT COUNT(*)::INTEGER FROM proposals),
        (SELECT COUNT(*)::INTEGER FROM proposals WHERE status = 'accepted'),
        (SELECT COUNT(*)::INTEGER FROM reviews),
        (SELECT COALESCE(AVG(rating), 0)::DECIMAL(3,2) FROM reviews WHERE review_type = 'client_to_provider'),
        (SELECT COUNT(*)::INTEGER FROM messages);
END;
$$ LANGUAGE plpgsql;

-- Function to get user activity summary
CREATE OR REPLACE FUNCTION get_user_activity_summary(user_uuid UUID)
RETURNS TABLE (
    user_id UUID,
    user_name TEXT,
    user_type user_type_enum,
    total_services INTEGER,
    active_services INTEGER,
    completed_services INTEGER,
    total_proposals INTEGER,
    accepted_proposals INTEGER,
    total_reviews INTEGER,
    average_rating DECIMAL(3,2),
    total_messages INTEGER,
    last_activity TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.id,
        u.full_name,
        u.user_type,
        CASE 
            WHEN u.user_type = 'cliente' THEN (SELECT COUNT(*)::INTEGER FROM services WHERE client_id = u.id)
            ELSE (SELECT COUNT(*)::INTEGER FROM services WHERE provider_id = u.id)
        END,
        CASE 
            WHEN u.user_type = 'cliente' THEN (SELECT COUNT(*)::INTEGER FROM services WHERE client_id = u.id AND status IN ('published', 'proposal_received', 'assigned', 'in_progress'))
            ELSE (SELECT COUNT(*)::INTEGER FROM services WHERE provider_id = u.id AND status IN ('assigned', 'in_progress'))
        END,
        u.completed_services,
        CASE 
            WHEN u.user_type = 'prestador' THEN (SELECT COUNT(*)::INTEGER FROM proposals WHERE provider_id = u.id)
            ELSE 0
        END,
        CASE 
            WHEN u.user_type = 'prestador' THEN (SELECT COUNT(*)::INTEGER FROM proposals WHERE provider_id = u.id AND status = 'accepted')
            ELSE 0
        END,
        u.total_reviews,
        u.average_rating,
        (SELECT COUNT(*)::INTEGER FROM messages WHERE sender_id = u.id OR receiver_id = u.id),
        GREATEST(u.last_login_at, u.updated_at)
    FROM users u
    WHERE u.id = user_uuid;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- PERFORMANCE OPTIMIZATION PROCEDURES
-- =============================================================================

-- Procedure to update table statistics
CREATE OR REPLACE FUNCTION update_table_statistics()
RETURNS VOID AS $$
BEGIN
    ANALYZE users;
    ANALYZE services;
    ANALYZE proposals;
    ANALYZE reviews;
    ANALYZE messages;
    ANALYZE notifications;
    ANALYZE service_categories;
    ANALYZE payments;
    ANALYZE user_sessions;
    ANALYZE audit_logs;
END;
$$ LANGUAGE plpgsql;

-- Procedure to reindex tables
CREATE OR REPLACE FUNCTION reindex_tables()
RETURNS VOID AS $$
BEGIN
    REINDEX TABLE users;
    REINDEX TABLE services;
    REINDEX TABLE proposals;
    REINDEX TABLE reviews;
    REINDEX TABLE messages;
    REINDEX TABLE notifications;
    REINDEX TABLE service_categories;
    REINDEX TABLE payments;
    REINDEX TABLE user_sessions;
    REINDEX TABLE audit_logs;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- BACKUP AND RECOVERY PROCEDURES
-- =============================================================================

-- Function to create a data snapshot summary
CREATE OR REPLACE FUNCTION create_data_snapshot()
RETURNS TABLE (
    table_name TEXT,
    record_count BIGINT,
    last_updated TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        'users'::TEXT,
        COUNT(*),
        MAX(updated_at)
    FROM users
    UNION ALL
    SELECT 
        'services'::TEXT,
        COUNT(*),
        MAX(updated_at)
    FROM services
    UNION ALL
    SELECT 
        'proposals'::TEXT,
        COUNT(*),
        MAX(updated_at)
    FROM proposals
    UNION ALL
    SELECT 
        'reviews'::TEXT,
        COUNT(*),
        MAX(created_at)
    FROM reviews
    UNION ALL
    SELECT 
        'messages'::TEXT,
        COUNT(*),
        MAX(created_at)
    FROM messages
    UNION ALL
    SELECT 
        'notifications'::TEXT,
        COUNT(*),
        MAX(created_at)
    FROM notifications
    UNION ALL
    SELECT 
        'payments'::TEXT,
        COUNT(*),
        MAX(updated_at)
    FROM payments;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- HEALTH CHECK PROCEDURES
-- =============================================================================

-- Function to check database health
CREATE OR REPLACE FUNCTION check_database_health()
RETURNS TABLE (
    check_name TEXT,
    status TEXT,
    details TEXT
) AS $$
BEGIN
    -- Check for orphaned records
    RETURN QUERY
    SELECT 
        'Orphaned Services'::TEXT,
        CASE WHEN COUNT(*) = 0 THEN 'OK' ELSE 'WARNING' END,
        'Found ' || COUNT(*) || ' services with invalid client_id'
    FROM services s
    LEFT JOIN users u ON s.client_id = u.id
    WHERE u.id IS NULL;
    
    RETURN QUERY
    SELECT 
        'Orphaned Proposals'::TEXT,
        CASE WHEN COUNT(*) = 0 THEN 'OK' ELSE 'WARNING' END,
        'Found ' || COUNT(*) || ' proposals with invalid service_id or provider_id'
    FROM proposals p
    LEFT JOIN services s ON p.service_id = s.id
    LEFT JOIN users u ON p.provider_id = u.id
    WHERE s.id IS NULL OR u.id IS NULL;
    
    -- Check for inconsistent ratings
    RETURN QUERY
    SELECT 
        'Rating Consistency'::TEXT,
        CASE WHEN COUNT(*) = 0 THEN 'OK' ELSE 'WARNING' END,
        'Found ' || COUNT(*) || ' users with inconsistent rating data'
    FROM users u
    WHERE u.user_type = 'prestador' 
    AND (
        u.total_reviews != (SELECT COUNT(*) FROM reviews WHERE reviewed_id = u.id AND review_type = 'client_to_provider')
        OR ABS(u.average_rating - COALESCE((SELECT AVG(rating) FROM reviews WHERE reviewed_id = u.id AND review_type = 'client_to_provider'), 0)) > 0.01
    );
    
    -- Check for expired proposals that should be updated
    RETURN QUERY
    SELECT 
        'Expired Proposals'::TEXT,
        CASE WHEN COUNT(*) = 0 THEN 'OK' ELSE 'ACTION_NEEDED' END,
        'Found ' || COUNT(*) || ' proposals that should be expired'
    FROM proposals
    WHERE status = 'pending' AND expires_at < NOW();
    
END;
$$ LANGUAGE plpgsql;

-- Health check function
CREATE OR REPLACE FUNCTION database_health_check()
RETURNS TABLE(
    check_name TEXT,
    status TEXT,
    details TEXT
) AS $$
BEGIN
    -- Check for orphaned records
    RETURN QUERY
    SELECT 
        'Orphaned Services'::TEXT,
        CASE WHEN COUNT(*) = 0 THEN 'OK' ELSE 'WARNING' END::TEXT,
        'Found ' || COUNT(*) || ' services without valid client'::TEXT
    FROM services s
    LEFT JOIN users u ON s.client_id = u.id
    WHERE u.id IS NULL;
    
    -- Check for expired proposals
    RETURN QUERY
    SELECT 
        'Expired Proposals'::TEXT,
        CASE WHEN COUNT(*) = 0 THEN 'OK' ELSE 'INFO' END::TEXT,
        'Found ' || COUNT(*) || ' expired proposals'::TEXT
    FROM proposals
    WHERE status = 'pending' AND expires_at < NOW();
    
    -- Check for inactive users with active services
    RETURN QUERY
    SELECT 
        'Inactive Users with Active Services'::TEXT,
        CASE WHEN COUNT(*) = 0 THEN 'OK' ELSE 'WARNING' END::TEXT,
        'Found ' || COUNT(*) || ' inactive users with active services'::TEXT
    FROM services s
    JOIN users u ON s.client_id = u.id
    WHERE u.is_active = false AND s.status IN ('novo', 'aceito', 'em_andamento');
    
END;
$$ language 'plpgsql';

-- =============================================================================
-- SYSTEM STATISTICS UPDATE PROCEDURE
-- =============================================================================

-- Placeholder for update_system_stats function
CREATE OR REPLACE FUNCTION update_system_stats()
RETURNS VOID AS $$
BEGIN
    -- Implementation for updating system statistics
    -- This is a placeholder and should be replaced with actual logic
    RAISE NOTICE 'System statistics updated';
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- PERFORMANCE OPTIMIZATION PROCEDURES
-- =============================================================================

-- Procedure to update all statistics
CREATE OR REPLACE FUNCTION refresh_all_stats()
RETURNS void AS $$
BEGIN
    -- Expire old proposals
    PERFORM expire_old_proposals();
    
    -- Update system statistics
    PERFORM update_system_stats();
    
    -- Update user last seen
    UPDATE users 
    SET last_seen = NOW() 
    WHERE id IN (
        SELECT DISTINCT user_id 
        FROM user_sessions 
        WHERE is_active = true 
        AND expires_at > NOW()
    );
    
    RAISE NOTICE 'All statistics refreshed successfully';
END;
$$ language 'plpgsql';

-- =============================================================================
-- SCHEDULED MAINTENANCE FUNCTION
-- =============================================================================

-- Main maintenance function to be run periodically
CREATE OR REPLACE FUNCTION run_maintenance()
RETURNS TABLE (
    task_name TEXT,
    records_affected INTEGER,
    execution_time INTERVAL,
    status TEXT
) AS $$
DECLARE
    start_time TIMESTAMP;
    end_time TIMESTAMP;
    affected_records INTEGER;
BEGIN
    -- Expire old proposals
    start_time := NOW();
    SELECT expire_old_proposals() INTO affected_records;
    end_time := NOW();
    
    RETURN QUERY SELECT 
        'Expire Old Proposals'::TEXT,
        affected_records,
        end_time - start_time,
        'COMPLETED'::TEXT;
    
    -- Clean up expired notifications
    start_time := NOW();
    SELECT cleanup_expired_notifications() INTO affected_records;
    end_time := NOW();
    
    RETURN QUERY SELECT 
        'Cleanup Expired Notifications'::TEXT,
        affected_records,
        end_time - start_time,
        'COMPLETED'::TEXT;
    
    -- Clean up expired sessions
    start_time := NOW();
    SELECT cleanup_expired_sessions() INTO affected_records;
    end_time := NOW();
    
    RETURN QUERY SELECT 
        'Cleanup Expired Sessions'::TEXT,
        affected_records,
        end_time - start_time,
        'COMPLETED'::TEXT;
    
    -- Update table statistics
    start_time := NOW();
    PERFORM update_table_statistics();
    end_time := NOW();
    
    RETURN QUERY SELECT 
        'Update Table Statistics'::TEXT,
        0,
        end_time - start_time,
        'COMPLETED'::TEXT;
    
    -- Refresh all statistics
    start_time := NOW();
    PERFORM refresh_all_stats();
    end_time := NOW();
    
    RETURN QUERY SELECT 
        'Refresh All Statistics'::TEXT,
        0,
        end_time - start_time,
        'COMPLETED'::TEXT;
    
END;
$$ LANGUAGE plpgsql;
