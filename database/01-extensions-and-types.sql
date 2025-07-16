-- =============================================================================
-- ServiceHub Database - Extensions and Custom Types
-- =============================================================================
-- This file creates all necessary extensions and custom types
-- Execute this FIRST before any other scripts

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- =============================================================================
-- CUSTOM ENUM TYPES
-- =============================================================================

-- User type enumeration
CREATE TYPE user_type AS ENUM ('cliente', 'prestador');

-- Service status enumeration with complete workflow
CREATE TYPE service_status AS ENUM ('novo', 'proposta_enviada', 'aceito', 'em_andamento', 'concluido', 'cancelado');

-- Proposal status enumeration
CREATE TYPE proposal_status AS ENUM ('pending', 'accepted', 'rejected', 'expired');

-- Notification type enumeration
CREATE TYPE notification_type AS ENUM ('service_request', 'message', 'payment', 'review', 'system', 'proposal');

-- Payment status enumeration
CREATE TYPE payment_status AS ENUM ('pending', 'processing', 'completed', 'failed', 'refunded');

-- Payment method enumeration
CREATE TYPE payment_method AS ENUM ('credit_card', 'debit_card', 'pix', 'bank_transfer');

-- Urgency level enumeration
CREATE TYPE urgency_level AS ENUM ('baixa', 'normal', 'alta', 'urgente');

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
