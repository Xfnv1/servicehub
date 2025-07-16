# ServiceHub Database - Complete Setup Guide

This is a production-ready, enterprise-level database for the ServiceHub platform. Follow this guide step-by-step to deploy it to Supabase without any errors.

## 📋 Prerequisites

- A Supabase account (free tier is sufficient for development)
- Basic understanding of SQL
- Access to Supabase Dashboard

## 🚀 Step-by-Step Deployment Guide

### Step 1: Create Your Supabase Project

1. **Go to [Supabase Dashboard](https://app.supabase.com)**
2. **Click "New Project"**
3. **Fill in the details:**
   - Organization: Select your organization
   - Name: `servicehub-production` (or your preferred name)
   - Database Password: Generate a strong password and **SAVE IT**
   - Region: Choose the closest to your users
   - Pricing Plan: Select based on your needs

4. **Click "Create new project"**
5. **Wait for the project to be ready** (usually 2-3 minutes)

### Step 2: Access the SQL Editor

1. **In your Supabase project dashboard, click "SQL Editor" in the left sidebar**
2. **You'll see the SQL Editor interface where you can run SQL commands**

### Step 3: Execute the Database Scripts

**IMPORTANT: Execute the scripts in the exact order shown below. Do not skip any steps.**

#### 3.1 Extensions and Types
\`\`\`sql
-- Copy and paste the entire content of: database/01-extensions-and-types.sql
-- Click "Run" button
\`\`\`

#### 3.2 Core Tables
\`\`\`sql
-- Copy and paste the entire content of: database/02-core-tables.sql
-- Click "Run" button
\`\`\`

#### 3.3 Indexes and Constraints
\`\`\`sql
-- Copy and paste the entire content of: database/03-indexes-and-constraints.sql
-- Click "Run" button
\`\`\`

#### 3.4 Functions and Triggers
\`\`\`sql
-- Copy and paste the entire content of: database/04-functions-and-triggers.sql
-- Click "Run" button
\`\`\`

#### 3.5 Row Level Security
\`\`\`sql
-- Copy and paste the entire content of: database/05-row-level-security.sql
-- Click "Run" button
\`\`\`

#### 3.6 Seed Data (Optional - for development/testing)
\`\`\`sql
-- Copy and paste the entire content of: database/06-seed-data.sql
-- Click "Run" button
\`\`\`

#### 3.7 Maintenance Procedures
\`\`\`sql
-- Copy and paste the entire content of: database/07-maintenance-procedures.sql
-- Click "Run" button
\`\`\`

### Step 4: Verify the Installation

After running all scripts, verify everything was created correctly:

\`\`\`sql
-- Run this query to check all tables were created
SELECT 
    schemaname,
    tablename,
    tableowner
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;
\`\`\`

You should see these tables:
- `audit_logs`
- `messages`
- `notifications`
- `payments`
- `proposals`
- `reviews`
- `service_categories`
- `services`
- `user_sessions`
- `users`

\`\`\`sql
-- Check if sample data was inserted (if you ran the seed script)
SELECT 
    'Users' as table_name, COUNT(*) as record_count FROM users
UNION ALL
SELECT 'Services', COUNT(*) FROM services
UNION ALL
SELECT 'Service Categories', COUNT(*) FROM service_categories
UNION ALL
SELECT 'Proposals', COUNT(*) FROM proposals
UNION ALL
SELECT 'Reviews', COUNT(*) FROM reviews
UNION ALL
SELECT 'Messages', COUNT(*) FROM messages
UNION ALL
SELECT 'Notifications', COUNT(*) FROM notifications;
\`\`\`

### Step 5: Configure Authentication (Important!)

1. **Go to Authentication > Settings in your Supabase dashboard**
2. **Enable the authentication providers you want to use**
3. **Set up your site URL and redirect URLs**

### Step 6: Get Your Environment Variables

1. **Go to Settings > API in your Supabase dashboard**
2. **Copy these values for your application:**
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` key → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

## 🔧 Database Features

### Core Functionality
- ✅ **Complete user management** (clients and service providers)
- ✅ **Service categories** with hierarchical support
- ✅ **Service lifecycle management** (draft → published → assigned → completed)
- ✅ **Proposal system** with expiration and status tracking
- ✅ **Review and rating system** (bidirectional)
- ✅ **Real-time messaging** between users
- ✅ **Notification system** with multiple types
- ✅ **Payment tracking** with platform fees
- ✅ **Audit logging** for important operations
- ✅ **Session management** for security

### Security Features
- ✅ **Row Level Security (RLS)** on all tables
- ✅ **Comprehensive policies** for data access control
- ✅ **Input validation** with constraints and checks
- ✅ **Audit trail** for sensitive operations
- ✅ **Session tracking** and management

### Performance Features
- ✅ **Optimized indexes** for all common queries
- ✅ **Full-text search** capabilities
- ✅ **Geographic queries** support
- ✅ **Composite indexes** for complex filtering
- ✅ **Automatic statistics** updates

### Maintenance Features
- ✅ **Automated cleanup** procedures
- ✅ **Health check** functions
- ✅ **Performance monitoring** tools
- ✅ **Data integrity** checks
- ✅ **Backup preparation** functions

## 📊 Database Schema Overview

### Core Tables
1. **users** - User profiles (clients and providers)
2. **service_categories** - Hierarchical service categories
3. **services** - Service requests and offerings
4. **proposals** - Provider proposals for services
5. **reviews** - Bidirectional rating system
6. **messages** - Real-time messaging
7. **notifications** - System notifications
8. **payments** - Payment tracking
9. **user_sessions** - Session management
10. **audit_logs** - Audit trail

### Key Relationships
- Users can be clients or providers
- Services belong to clients, can be assigned to providers
- Proposals connect providers to services
- Reviews are bidirectional (client↔provider)
- Messages are linked to services
- Notifications track all system events

## 🛠 Maintenance

### Regular Maintenance (Run Weekly)
\`\`\`sql
SELECT * FROM run_maintenance();
\`\`\`

### Health Checks (Run Daily)
\`\`\`sql
SELECT * FROM check_database_health();
\`\`\`

### Platform Statistics
\`\`\`sql
SELECT * FROM get_platform_statistics();
\`\`\`

## 🚨 Troubleshooting

### Common Issues

1. **"Extension does not exist" error**
   - Make sure you're running the scripts in order
   - Extensions must be created first

2. **"Permission denied" error**
   - You might need to run scripts as the database owner
   - Check your Supabase project permissions

3. **"Relation does not exist" error**
   - Tables must be created before indexes and constraints
   - Follow the exact script order

4. **RLS policy errors**
   - Make sure all tables are created before applying RLS
   - Check that auth.uid() is available in your context

### Getting Help

If you encounter any issues:
1. Check the Supabase logs in your dashboard
2. Verify you followed the exact script order
3. Make sure all previous scripts completed successfully
4. Check the Supabase documentation for any platform-specific requirements

## 🎯 Next Steps

After successful deployment:
1. **Test the database** with sample queries
2. **Configure your application** with the environment variables
3. **Set up your authentication** flow
4. **Implement your business logic** using the provided functions
5. **Set up monitoring** and alerts for production

## 📈 Scaling Considerations

This database is designed to scale with your application:
- **Indexes** are optimized for common query patterns
- **Partitioning** can be added for large tables if needed
- **Read replicas** can be configured for high-traffic scenarios
- **Connection pooling** is recommended for production

---

**🎉 Congratulations! Your ServiceHub database is now ready for production use.**
\`\`\`
