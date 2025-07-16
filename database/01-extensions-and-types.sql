-- =============================================================================
-- ServiceHub Database - Extensions and Custom Types
-- =============================================================================
-- This file creates all necessary extensions and custom types
-- Execute this FIRST before any other database files

-- =============================================================================
-- EXTENSIONS
-- =============================================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable PostGIS for location data
CREATE EXTENSION IF NOT EXISTS postgis;

-- Enable full text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Enable unaccent for better search
CREATE EXTENSION IF NOT EXISTS unaccent;

-- =============================================================================
-- CUSTOM TYPES
-- =============================================================================

-- User types
CREATE TYPE user_type AS ENUM ('cliente', 'prestador', 'admin');

-- Service urgency levels
CREATE TYPE urgency_level AS ENUM ('low', 'normal', 'high', 'urgent');

-- Service status
CREATE TYPE service_status AS ENUM (
    'draft',        -- Rascunho
    'published',    -- Publicado
    'assigned',     -- Atribuído a um prestador
    'in_progress',  -- Em andamento
    'completed',    -- Concluído
    'cancelled',    -- Cancelado
    'disputed'      -- Em disputa
);

-- Proposal status
CREATE TYPE proposal_status AS ENUM (
    'pending',      -- Aguardando resposta
    'accepted',     -- Aceita
    'rejected',     -- Rejeitada
    'expired',      -- Expirada
    'withdrawn'     -- Retirada pelo prestador
);

-- Payment methods
CREATE TYPE payment_method AS ENUM (
    'credit_card',
    'debit_card',
    'pix',
    'bank_transfer',
    'cash'
);

-- Payment status
CREATE TYPE payment_status AS ENUM (
    'pending',
    'processing',
    'completed',
    'failed',
    'refunded',
    'cancelled'
);

-- Notification types
CREATE TYPE notification_type AS ENUM (
    'service_created',
    'proposal_received',
    'proposal_accepted',
    'proposal_rejected',
    'service_started',
    'service_completed',
    'payment_received',
    'review_received',
    'message_received',
    'system_update'
);

-- Message types
CREATE TYPE message_type AS ENUM (
    'text',
    'image',
    'file',
    'location',
    'system'
);

-- Review types
CREATE TYPE review_type AS ENUM (
    'client_to_provider',
    'provider_to_client'
);
