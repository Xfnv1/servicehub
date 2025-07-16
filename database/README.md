# ServiceHub Database - Complete Setup Guide

## 🚀 Quick Start

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - **Name**: ServiceHub
   - **Database Password**: (save this securely)
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for project initialization (2-3 minutes)

### Step 2: Execute Database Scripts

**⚠️ IMPORTANT: Execute scripts in EXACT order!**

1. Open your Supabase project dashboard
2. Go to **SQL Editor** (left sidebar)
3. Execute each script in order:

#### Script 1: Extensions and Types
\`\`\`sql
-- Copy content from 01-extensions-and-types.sql
-- Click "Run" button
\`\`\`

#### Script 2: Core Tables
\`\`\`sql
-- Copy content from 02-core-tables.sql
-- Click "Run" button
\`\`\`

#### Script 3: Indexes and Constraints
\`\`\`sql
-- Copy content from 03-indexes-and-constraints.sql
-- Click "Run" button
\`\`\`

#### Script 4: Functions and Triggers
\`\`\`sql
-- Copy content from 04-functions-and-triggers.sql
-- Click "Run" button
\`\`\`

#### Script 5: Row Level Security
\`\`\`sql
-- Copy content from 05-row-level-security.sql
-- Click "Run" button
\`\`\`

#### Script 6: Seed Data
\`\`\`sql
-- Copy content from 06-seed-data.sql
-- Click "Run" button
\`\`\`

#### Script 7: Maintenance Procedures
\`\`\`sql
-- Copy content from 07-maintenance-procedures.sql
-- Click "Run" button
\`\`\`

### Step 3: Verify Installation

Run this verification query in SQL Editor:

\`\`\`sql
-- Verify all tables were created
SELECT 
    schemaname,
    tablename,
    tableowner
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- Check sample data
SELECT 'service_categories' as table_name, count(*) as records FROM service_categories
UNION ALL
SELECT 'brazilian_locations', count(*) FROM brazilian_locations
UNION ALL
SELECT 'users', count(*) FROM users
UNION ALL
SELECT 'system_stats', count(*) FROM system_stats;

-- Run health check
SELECT * FROM database_health_check();
\`\`\`

Expected results:
- ✅ 11 tables created
- ✅ 10 service categories
- ✅ 20+ Brazilian locations
- ✅ 8 sample users
- ✅ 6 system statistics
- ✅ All health checks return "OK"

### Step 4: Configure Environment Variables

Add these to your `.env.local`:

\`\`\`env
# Get these from Supabase Project Settings > API
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
\`\`\`

### Step 5: Enable Authentication

1. Go to **Authentication** > **Settings**
2. Configure providers (Email, Google, etc.)
3. Set up email templates
4. Configure redirect URLs

## 📊 Database Schema Overview

### Core Tables
- **users**: Both clients and service providers
- **service_categories**: Service classification
- **services**: Service requests and jobs
- **proposals**: Provider bids on services
- **reviews**: Rating and feedback system
- **messages**: In-app messaging
- **notifications**: User notifications
- **payments**: Payment tracking
- **user_sessions**: Session management
- **system_stats**: Platform statistics
- **brazilian_locations**: Geographic data

### Key Features
- ✅ **Full-text search** on services
- ✅ **Geographic queries** with PostGIS
- ✅ **Automatic statistics** updates
- ✅ **Row Level Security** for data protection
- ✅ **Audit trails** and timestamps
- ✅ **Performance optimized** with 50+ indexes

## 🔧 Maintenance

### Daily Tasks (Automated)
\`\`\`sql
-- Run this daily via cron or scheduled function
SELECT refresh_all_stats();
\`\`\`

### Weekly Tasks
\`\`\`sql
-- Clean up expired data
SELECT cleanup_expired_data();

-- Health check
SELECT * FROM database_health_check();
\`\`\`

### Monthly Tasks
\`\`\`sql
-- Analyze table statistics
ANALYZE;

-- Vacuum tables
VACUUM;
\`\`\`

## 🛠 Troubleshooting

### Common Issues

**Error: "extension does not exist"**
- Solution: Ensure PostGIS extension is enabled in Supabase

**Error: "permission denied"**
- Solution: Check RLS policies are correctly configured

**Error: "relation does not exist"**
- Solution: Verify scripts were run in correct order

**Slow queries**
- Solution: Check if indexes are being used with `EXPLAIN ANALYZE`

### Performance Monitoring

\`\`\`sql
-- Check slow queries
SELECT 
    query,
    calls,
    total_time,
    mean_time
FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;

-- Check index usage
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;
\`\`\`

## 🔐 Security Best Practices

1. **Never expose service role key** in client-side code
2. **Use RLS policies** for all data access
3. **Validate input** in application layer
4. **Monitor for suspicious activity**
5. **Regular security audits**

## 📈 Scaling Considerations

- **Connection pooling**: Use PgBouncer for high traffic
- **Read replicas**: For read-heavy workloads
- **Partitioning**: For large tables (messages, notifications)
- **Caching**: Implement Redis for frequently accessed data

## 🆘 Support

If you encounter issues:
1. Check the troubleshooting section
2. Verify all scripts ran successfully
3. Check Supabase logs in dashboard
4. Review RLS policies for permission issues

---

**Database Version**: 1.0.0  
**Last Updated**: 2024  
**Compatibility**: PostgreSQL 14+, Supabase
\`\`\`

Now I'll update the components to use the database instead of static data:
