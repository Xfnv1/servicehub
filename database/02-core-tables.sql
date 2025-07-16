-- =============================================================================
-- ServiceHub Database - Core Tables
-- =============================================================================
-- This file creates all core tables with proper constraints and relationships
-- Execute this AFTER 01-extensions-and-types.sql

-- =============================================================================
-- USERS TABLE
-- =============================================================================
CREATE TABLE users (
    -- Primary identification
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Authentication fields
    email VARCHAR(255) NOT NULL UNIQUE,
    email_verified BOOLEAN DEFAULT FALSE,
    phone VARCHAR(20),
    phone_verified BOOLEAN DEFAULT FALSE,
    
    -- Basic profile information
    full_name VARCHAR(255) NOT NULL,
    display_name VARCHAR(100),
    user_type user_type_enum NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    
    -- Location information
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(50),
    postal_code VARCHAR(20),
    country VARCHAR(50) DEFAULT 'Brasil',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    
    -- Personal information
    birth_date DATE,
    cpf VARCHAR(14) UNIQUE,
    
    -- Provider-specific fields
    profession VARCHAR(255),
    experience_years INTEGER CHECK (experience_years >= 0),
    specialties TEXT[],
    work_radius_km INTEGER CHECK (work_radius_km > 0),
    hourly_rate DECIMAL(10,2) CHECK (hourly_rate >= 0),
    
    -- Rating and statistics
    average_rating DECIMAL(3,2) DEFAULT 0.00 CHECK (average_rating >= 0 AND average_rating <= 5),
    total_reviews INTEGER DEFAULT 0 CHECK (total_reviews >= 0),
    total_services INTEGER DEFAULT 0 CHECK (total_services >= 0),
    completed_services INTEGER DEFAULT 0 CHECK (completed_services >= 0),
    cancelled_services INTEGER DEFAULT 0 CHECK (cancelled_services >= 0),
    
    -- Financial information
    total_earnings DECIMAL(12,2) DEFAULT 0.00 CHECK (total_earnings >= 0),
    
    -- Performance metrics
    response_time_minutes INTEGER CHECK (response_time_minutes > 0),
    acceptance_rate DECIMAL(5,2) DEFAULT 0.00 CHECK (acceptance_rate >= 0 AND acceptance_rate <= 100),
    completion_rate DECIMAL(5,2) DEFAULT 0.00 CHECK (completion_rate >= 0 AND completion_rate <= 100),
    
    -- Account status
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    is_premium BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE,
    
    -- Constraints
    CONSTRAINT users_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT users_cpf_format CHECK (cpf ~ '^\d{11}$'),
    CONSTRAINT users_phone_format CHECK (phone ~ '^$$\d{2}$$\s\d{4,5}-\d{4}$'),
    CONSTRAINT users_completed_services_check CHECK (completed_services <= total_services),
    CONSTRAINT users_cancelled_services_check CHECK (cancelled_services <= total_services),
    CONSTRAINT users_provider_fields_check CHECK (
        (user_type = 'prestador' AND profession IS NOT NULL) OR 
        (user_type = 'cliente')
    )
);

-- =============================================================================
-- SERVICE CATEGORIES TABLE
-- =============================================================================
CREATE TABLE service_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(100),
    color VARCHAR(7) CHECK (color ~ '^#[0-9A-Fa-f]{6}$'),
    parent_id UUID REFERENCES service_categories(id) ON DELETE SET NULL,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- SERVICES TABLE
-- =============================================================================
CREATE TABLE services (
    -- Primary identification
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Relationships
    client_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider_id UUID REFERENCES users(id) ON DELETE SET NULL,
    category_id UUID NOT NULL REFERENCES service_categories(id) ON DELETE RESTRICT,
    
    -- Service details
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT[],
    
    -- Pricing
    budget_min DECIMAL(10,2) CHECK (budget_min >= 0),
    budget_max DECIMAL(10,2) CHECK (budget_max >= budget_min),
    final_price DECIMAL(10,2) CHECK (final_price >= 0),
    
    -- Location
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    postal_code VARCHAR(20),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    
    -- Service properties
    urgency urgency_level_enum DEFAULT 'normal',
    status service_status_enum DEFAULT 'draft',
    
    -- Scheduling
    preferred_date TIMESTAMP WITH TIME ZONE,
    deadline TIMESTAMP WITH TIME ZONE,
    estimated_duration_hours INTEGER CHECK (estimated_duration_hours > 0),
    
    -- Progress tracking
    progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    
    -- Media and tags
    images TEXT[],
    tags TEXT[],
    
    -- Metadata
    views_count INTEGER DEFAULT 0 CHECK (views_count >= 0),
    proposals_count INTEGER DEFAULT 0 CHECK (proposals_count >= 0),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE,
    
    -- Constraints
    CONSTRAINT services_budget_check CHECK (budget_max IS NULL OR budget_max >= budget_min),
    CONSTRAINT services_completion_check CHECK (
        (status = 'completed' AND completed_at IS NOT NULL) OR 
        (status != 'completed')
    ),
    CONSTRAINT services_assignment_check CHECK (
        (status IN ('assigned', 'in_progress', 'completed') AND provider_id IS NOT NULL) OR 
        (status NOT IN ('assigned', 'in_progress', 'completed'))
    )
);

-- =============================================================================
-- PROPOSALS TABLE
-- =============================================================================
CREATE TABLE proposals (
    -- Primary identification
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Relationships
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    provider_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Proposal details
    message TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    estimated_duration_hours INTEGER CHECK (estimated_duration_hours > 0),
    
    -- Scheduling
    available_from TIMESTAMP WITH TIME ZONE,
    available_until TIMESTAMP WITH TIME ZONE,
    
    -- Additional information
    materials_included BOOLEAN DEFAULT FALSE,
    materials_description TEXT,
    warranty_months INTEGER CHECK (warranty_months >= 0),
    
    -- Status and lifecycle
    status proposal_status_enum DEFAULT 'pending',
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '7 days'),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    responded_at TIMESTAMP WITH TIME ZONE,
    
    -- Constraints
    CONSTRAINT proposals_unique_active CHECK (
        status != 'pending' OR 
        NOT EXISTS (
            SELECT 1 FROM proposals p2 
            WHERE p2.service_id = proposals.service_id 
            AND p2.provider_id = proposals.provider_id 
            AND p2.status = 'pending' 
            AND p2.id != proposals.id
        )
    ),
    CONSTRAINT proposals_availability_check CHECK (
        available_until IS NULL OR available_until > available_from
    )
);

-- =============================================================================
-- REVIEWS TABLE
-- =============================================================================
CREATE TABLE reviews (
    -- Primary identification
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Relationships
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reviewed_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Review content
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    
    -- Review type and verification
    review_type review_type_enum NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    
    -- Response from reviewed user
    response TEXT,
    response_at TIMESTAMP WITH TIME ZONE,
    
    -- Helpful votes
    helpful_votes INTEGER DEFAULT 0 CHECK (helpful_votes >= 0),
    total_votes INTEGER DEFAULT 0 CHECK (total_votes >= helpful_votes),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT reviews_unique_per_service UNIQUE (service_id, reviewer_id, review_type),
    CONSTRAINT reviews_no_self_review CHECK (reviewer_id != reviewed_id)
);

-- =============================================================================
-- MESSAGES TABLE
-- =============================================================================
CREATE TABLE messages (
    -- Primary identification
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Relationships
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    parent_message_id UUID REFERENCES messages(id) ON DELETE SET NULL,
    
    -- Message content
    content TEXT NOT NULL,
    message_type message_type_enum DEFAULT 'text',
    
    -- File attachments
    attachments JSONB,
    
    -- Message status
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP WITH TIME ZONE,
    is_deleted_by_sender BOOLEAN DEFAULT FALSE,
    is_deleted_by_receiver BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT messages_no_self_message CHECK (sender_id != receiver_id),
    CONSTRAINT messages_content_not_empty CHECK (LENGTH(TRIM(content)) > 0)
);

-- =============================================================================
-- NOTIFICATIONS TABLE
-- =============================================================================
CREATE TABLE notifications (
    -- Primary identification
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Relationships
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    related_service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    related_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Notification content
    type notification_type_enum NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    
    -- Notification properties
    is_read BOOLEAN DEFAULT FALSE,
    is_urgent BOOLEAN DEFAULT FALSE,
    
    -- Additional data
    data JSONB,
    
    -- Action URL
    action_url TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    read_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE
);

-- =============================================================================
-- PAYMENTS TABLE
-- =============================================================================
CREATE TABLE payments (
    -- Primary identification
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Relationships
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE RESTRICT,
    payer_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    
    -- Payment details
    amount DECIMAL(12,2) NOT NULL CHECK (amount > 0),
    currency VARCHAR(3) DEFAULT 'BRL',
    
    -- Platform fees
    platform_fee DECIMAL(12,2) DEFAULT 0 CHECK (platform_fee >= 0),
    net_amount DECIMAL(12,2) GENERATED ALWAYS AS (amount - platform_fee) STORED,
    
    -- Payment method and processing
    payment_method VARCHAR(50),
    payment_provider VARCHAR(50),
    external_transaction_id VARCHAR(255),
    
    -- Status and lifecycle
    status payment_status_enum DEFAULT 'pending',
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_at TIMESTAMP WITH TIME ZONE,
    
    -- Additional information
    description TEXT,
    metadata JSONB,
    
    -- Constraints
    CONSTRAINT payments_no_self_payment CHECK (payer_id != receiver_id),
    CONSTRAINT payments_platform_fee_check CHECK (platform_fee <= amount)
);

-- =============================================================================
-- USER SESSIONS TABLE (for tracking active sessions)
-- =============================================================================
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) NOT NULL UNIQUE,
    ip_address INET,
    user_agent TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- AUDIT LOG TABLE (for tracking important changes)
-- =============================================================================
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_name VARCHAR(100) NOT NULL,
    record_id UUID NOT NULL,
    action VARCHAR(20) NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
    old_values JSONB,
    new_values JSONB,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    ip_address INET,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
