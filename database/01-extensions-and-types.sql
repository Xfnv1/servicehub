-- =============================================================================
-- ServiceHub Database - Extensions and Custom Types
-- =============================================================================
-- This file creates all necessary extensions and custom types
-- Execute this FIRST before any other scripts

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- =============================================================================
-- CUSTOM ENUM TYPES
-- =============================================================================

-- User type enumeration
CREATE TYPE user_type_enum AS ENUM (
    'cliente',
    'prestador'
);

-- Service status enumeration with complete workflow
CREATE TYPE service_status_enum AS ENUM (
    'draft',           -- Service being created
    'published',       -- Available for proposals
    'proposal_received', -- Has at least one proposal
    'assigned',        -- Provider assigned
    'in_progress',     -- Work started
    'completed',       -- Work finished
    'cancelled',       -- Cancelled by client
    'disputed'         -- Under dispute resolution
);

-- Proposal status enumeration
CREATE TYPE proposal_status_enum AS ENUM (
    'pending',         -- Waiting for client response
    'accepted',        -- Accepted by client
    'rejected',        -- Rejected by client
    'withdrawn',       -- Withdrawn by provider
    'expired'          -- Expired due to time limit
);

-- Notification type enumeration
CREATE TYPE notification_type_enum AS ENUM (
    'service_created',
    'proposal_received',
    'proposal_accepted',
    'proposal_rejected',
    'service_started',
    'service_completed',
    'payment_received',
    'review_received',
    'message_received',
    'system_announcement'
);

-- Payment status enumeration
CREATE TYPE payment_status_enum AS ENUM (
    'pending',
    'processing',
    'completed',
    'failed',
    'refunded',
    'disputed'
);

-- Urgency level enumeration
CREATE TYPE urgency_level_enum AS ENUM (
    'low',
    'normal',
    'high',
    'urgent'
);

-- Message type enumeration
CREATE TYPE message_type_enum AS ENUM (
    'text',
    'image',
    'file',
    'system'
);

-- Review type enumeration
CREATE TYPE review_type_enum AS ENUM (
    'client_to_provider',
    'provider_to_client'
);
