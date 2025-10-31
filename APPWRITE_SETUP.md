# Save&Serve - Appwrite Pro Backend Setup Guide

Complete setup guide for configuring Appwrite Pro as the backend for the Save&Serve food rescue platform.

## Table of Contents
- [Prerequisites](#prerequisites)  
- [Appwrite Pro Setup](#appwrite-pro-setup)
- [Project Configuration](#project-configuration)
- [Database Configuration](#database-configuration)
- [Authentication Setup](#authentication-setup)
- [Storage Configuration](#storage-configuration)
- [Pro Features Configuration](#pro-features-configuration)
- [Environment Variables](#environment-variables)
- [Testing & Validation](#testing--validation)
- [Production Deployment](#production-deployment)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- **Appwrite Pro account** (active subscription)
- **Node.js 18+** and npm
- **Git** for version control
- **Docker & Docker Compose** (for self-hosted option)

## Appwrite Pro Setup

### Option 1: Appwrite Cloud Pro (Recommended)

🎉 **You have Appwrite Pro!** Premium benefits include:
- **Higher resource limits** (50GB storage, 1M requests)
- **Advanced security features** (audit logs, IP filtering)
- **Priority support** with faster response times
- **Enhanced monitoring** and custom analytics
- **Custom domains** with automatic SSL
- **Antivirus scanning** for uploaded files
- **CDN acceleration** for global performance

**Setup Steps:**
1. Visit [https://cloud.appwrite.io](https://cloud.appwrite.io)
2. Access your Pro account dashboard
3. Click **"Create Project"**
4. Project name: `Save&Serve Food Rescue`
5. **Copy and save** your Project ID and API Endpoint

### Option 2: Self-Hosted Appwrite Pro

For enterprise deployments with Pro features:

```bash
# Install Appwrite with Pro configuration
docker run -it --rm \
    --volume /var/run/docker.sock:/var/run/docker.sock \
    --volume "$(pwd)"/appwrite:/usr/src/code/appwrite:rw \
    --entrypoint="install" \
    appwrite/appwrite:1.5.7

# Start services
cd appwrite
docker compose up -d --scale appwrite-worker-audits=3
```

## Project Configuration

### 1. Platform Setup

**Add Web Platform:**
1. Navigate to **Settings** → **Platforms**
2. Click **"Add Platform"** → **"Web App"**
3. Configure platform:
   - **Name**: `Save&Serve Web Application`
   - **Hostname**: `localhost` (development)
   - **Port**: `3001`
   - **HTTPS**: Enable for production

**Add additional platforms as needed:**
- Production domain: `saveandserve.org`
- Staging domain: `staging.saveandserve.org`

### 2. Pro Domain Configuration

**Custom API Domain (Pro Feature):**
1. Go to **Settings** → **Domains**
2. Add custom domain: `api.saveandserve.org`
3. Configure DNS CNAME record
4. SSL certificates auto-generated with Pro

## Database Configuration

### 1. Create Database

1. Navigate to **Databases**
2. Click **"Create Database"**
3. **Database ID**: `saveserve-main`
4. **Name**: `Save&Serve Production Database`
5. **Region**: Select closest to your users

### 2. Collection Setup

**Important:** Appwrite automatically provides these system attributes:
- `$id` (string) - Unique document identifier
- `$createdAt` (datetime) - Creation timestamp
- `$updatedAt` (datetime) - Last modification timestamp

Only add the custom attributes listed below.

#### Users Collection
- **Collection ID**: `users`
- **Name**: `Platform Users`

**Custom Attributes:**
```json
[
  { "key": "email", "type": "string", "size": 255, "required": true },
  { "key": "name", "type": "string", "size": 255, "required": true },
  { "key": "phone", "type": "string", "size": 20, "required": false },
  { "key": "role", "type": "string", "size": 20, "required": true },
  { "key": "profileImage", "type": "string", "size": 255, "required": false },
  { "key": "isVerified", "type": "boolean", "required": true, "default": false },
  { "key": "address", "type": "string", "size": 500, "required": false },
  { "key": "city", "type": "string", "size": 100, "required": false },
  { "key": "state", "type": "string", "size": 100, "required": false },
  { "key": "zipCode", "type": "string", "size": 10, "required": false },
  { "key": "preferences", "type": "string", "size": 2000, "required": false },
  { "key": "lastActive", "type": "datetime", "required": false },
  { "key": "timezone", "type": "string", "size": 50, "required": false }
]
```

#### Organizations Collection
- **Collection ID**: `organizations`
- **Name**: `Verified Organizations`

**Custom Attributes:**
```json
[
  { "key": "name", "type": "string", "size": 255, "required": true },
  { "key": "description", "type": "string", "size": 2000, "required": false },
  { "key": "email", "type": "string", "size": 255, "required": true },
  { "key": "phone", "type": "string", "size": 20, "required": false },
  { "key": "website", "type": "string", "size": 255, "required": false },
  { "key": "address", "type": "string", "size": 500, "required": true },
  { "key": "city", "type": "string", "size": 100, "required": true },
  { "key": "state", "type": "string", "size": 100, "required": true },
  { "key": "zipCode", "type": "string", "size": 10, "required": true },
  { "key": "taxId", "type": "string", "size": 50, "required": false },
  { "key": "isVerified", "type": "boolean", "required": true, "default": false },
  { "key": "verificationDate", "type": "datetime", "required": false },
  { "key": "servingAreas", "type": "string", "size": 2000, "required": false },
  { "key": "capacity", "type": "integer", "required": false },
  { "key": "operatingHours", "type": "string", "size": 1000, "required": false },
  { "key": "contactPerson", "type": "string", "size": 255, "required": false },
  { "key": "logo", "type": "string", "size": 255, "required": false },
  { "key": "certifications", "type": "string", "size": 1000, "required": false },
  { "key": "specialRequirements", "type": "string", "size": 1000, "required": false },
  { "key": "userId", "type": "string", "size": 255, "required": true }
]
```

#### Donations Collection
- **Collection ID**: `donations`
- **Name**: `Food Donations`

**Custom Attributes:**
```json
[
  { "key": "title", "type": "string", "size": 255, "required": true },
  { "key": "description", "type": "string", "size": 2000, "required": false },
  { "key": "foodType", "type": "string", "size": 100, "required": true },
  { "key": "category", "type": "string", "size": 100, "required": true },
  { "key": "quantity", "type": "integer", "required": true },
  { "key": "unit", "type": "string", "size": 50, "required": true },
  { "key": "estimatedWeight", "type": "float", "required": false },
  { "key": "expiryDate", "type": "datetime", "required": false },
  { "key": "pickupAddress", "type": "string", "size": 500, "required": true },
  { "key": "pickupCity", "type": "string", "size": 100, "required": true },
  { "key": "pickupState", "type": "string", "size": 100, "required": true },
  { "key": "pickupZipCode", "type": "string", "size": 10, "required": true },
  { "key": "pickupCoordinates", "type": "string", "size": 100, "required": false },
  { "key": "availableFrom", "type": "datetime", "required": true },
  { "key": "availableUntil", "type": "datetime", "required": true },
  { "key": "images", "type": "string", "size": 2000, "required": false },
  { "key": "specialInstructions", "type": "string", "size": 1000, "required": false },
  { "key": "storageRequirements", "type": "string", "size": 500, "required": false },
  { "key": "donorId", "type": "string", "size": 255, "required": true },
  { "key": "donorName", "type": "string", "size": 255, "required": true },
  { "key": "donorPhone", "type": "string", "size": 20, "required": false },
  { "key": "donorEmail", "type": "string", "size": 255, "required": true },
  { "key": "status", "type": "string", "size": 50, "required": true, "default": "available" },
  { "key": "priority", "type": "string", "size": 20, "required": false, "default": "normal" },
  { "key": "claimedBy", "type": "string", "size": 255, "required": false },
  { "key": "claimedAt", "type": "datetime", "required": false },
  { "key": "completedAt", "type": "datetime", "required": false },
  { "key": "cancelledAt", "type": "datetime", "required": false },
  { "key": "cancellationReason", "type": "string", "size": 500, "required": false }
]
```

#### Pickups Collection
- **Collection ID**: `pickups`
- **Name**: `Scheduled Pickups`

**Custom Attributes:**
```json
[
  { "key": "donationId", "type": "string", "size": 255, "required": true },
  { "key": "donorId", "type": "string", "size": 255, "required": true },
  { "key": "organizationId", "type": "string", "size": 255, "required": true },
  { "key": "scheduledDate", "type": "datetime", "required": true },
  { "key": "scheduledTimeStart", "type": "string", "size": 50, "required": true },
  { "key": "scheduledTimeEnd", "type": "string", "size": 50, "required": true },
  { "key": "actualPickupTime", "type": "datetime", "required": false },
  { "key": "status", "type": "string", "size": 50, "required": true, "default": "scheduled" },
  { "key": "pickupNotes", "type": "string", "size": 1000, "required": false },
  { "key": "pickupPersonName", "type": "string", "size": 255, "required": false },
  { "key": "pickupPersonPhone", "type": "string", "size": 20, "required": false },
  { "key": "actualQuantity", "type": "integer", "required": false },
  { "key": "actualWeight", "type": "float", "required": false },
  { "key": "completedAt", "type": "datetime", "required": false },
  { "key": "rating", "type": "integer", "required": false },
  { "key": "feedback", "type": "string", "size": 1000, "required": false },
  { "key": "issues", "type": "string", "size": 1000, "required": false }
]
```

#### Messages Collection
- **Collection ID**: `messages`
- **Name**: `Platform Messages`

**Custom Attributes:**
```json
[
  { "key": "donationId", "type": "string", "size": 255, "required": true },
  { "key": "senderId", "type": "string", "size": 255, "required": true },
  { "key": "receiverId", "type": "string", "size": 255, "required": true },
  { "key": "message", "type": "string", "size": 2000, "required": true },
  { "key": "messageType", "type": "string", "size": 50, "required": true, "default": "text" },
  { "key": "isRead", "type": "boolean", "required": true, "default": false },
  { "key": "readAt", "type": "datetime", "required": false },
  { "key": "attachments", "type": "string", "size": 1000, "required": false },
  { "key": "priority", "type": "string", "size": 20, "required": false, "default": "normal" }
]
```

#### Notifications Collection
- **Collection ID**: `notifications`
- **Name**: `System Notifications`

**Custom Attributes:**
```json
[
  { "key": "userId", "type": "string", "size": 255, "required": true },
  { "key": "title", "type": "string", "size": 255, "required": true },
  { "key": "message", "type": "string", "size": 1000, "required": true },
  { "key": "type", "type": "string", "size": 50, "required": true },
  { "key": "category", "type": "string", "size": 50, "required": false },
  { "key": "priority", "type": "string", "size": 20, "required": false, "default": "normal" },
  { "key": "isRead", "type": "boolean", "required": true, "default": false },
  { "key": "readAt", "type": "datetime", "required": false },
  { "key": "actionUrl", "type": "string", "size": 255, "required": false },
  { "key": "relatedId", "type": "string", "size": 255, "required": false },
  { "key": "expiresAt", "type": "datetime", "required": false },
  { "key": "metadata", "type": "string", "size": 1000, "required": false }
]
```

### 3. Collection Permissions

**Security Configuration for each collection:**

**Read Permissions:**
- `role:member` - Authenticated users only

**Create Permissions:**
- `role:member` - Authenticated users can create

**Update Permissions:**
- `role:member` - Users can update their own records
- Add document-level rules for ownership validation

**Delete Permissions:**
- `role:member` - Restricted based on ownership
- `role:admin` - Full delete access for moderation

**Indexes (Pro Performance Feature):**
- Create indexes on frequently queried fields:
  - `status` for donations
  - `userId` for user-related collections
  - `donationId` for related collections
  - `createdAt` for chronological sorting

## Authentication Setup

### 1. Authentication Methods

**Enable in Auth → Settings:**
- ✅ **Email/Password** - Primary authentication
- ✅ **Email OTP** - Passwordless login option
- ✅ **Phone (SMS)** - Pro feature for verification
- ✅ **Magic URL** - One-click login links

### 2. Pro Security Configuration

**Enhanced Security Settings:**
1. **Session Length**: `7776000` seconds (90 days)
2. **Password History**: `12` passwords (Pro limit)
3. **Password Dictionary**: Enable with custom words
4. **Personal Data Checks**: Enable PII detection
5. **Advanced Rate Limiting**: 100 requests/minute per IP
6. **IP Allowlist/Blocklist**: Configure for admin access
7. **Advanced Audit Logs**: Full activity monitoring
8. **Geographic Restrictions**: Block specific countries if needed

### 3. Email Configuration

**Custom SMTP (Pro Feature):**
1. Go to Auth → Settings → SMTP
2. Configure your email provider:
   - **Host**: `smtp.your-domain.com`
   - **Port**: `587` (TLS) or `465` (SSL)
   - **Username**: Your SMTP username
   - **Password**: Your SMTP password
3. **From Address**: `noreply@saveandserve.org`
4. **From Name**: `Save&Serve Platform`

**Email Templates Customization:**
- Email verification with branded design
- Password recovery with custom styling
- Welcome emails with platform introduction
- Magic URL emails with security messaging

## Storage Configuration

### 1. Pro Storage Buckets

#### Donation Images Bucket
- **Bucket ID**: `donation-images`
- **Name**: `Donation Food Images`
- **File Size Limit**: `100MB` (Pro limit)
- **Allowed Extensions**: `jpg,jpeg,png,webp,heic,heif,avif`
- **Encryption**: AES-256 enabled
- **Antivirus**: Enabled ✅ (Pro security)
- **Image Optimization**: Auto-compress and resize ✅
- **CDN**: Global delivery ✅ (Pro performance)

#### Profile Images Bucket
- **Bucket ID**: `profile-images`
- **Name**: `User Profile Pictures`
- **File Size Limit**: `50MB` (Pro limit)
- **Allowed Extensions**: `jpg,jpeg,png,webp,heic,heif`
- **Encryption**: AES-256 enabled
- **Antivirus**: Enabled ✅
- **Image Optimization**: Profile-specific sizing ✅

#### Organization Documents Bucket
- **Bucket ID**: `org-documents`
- **Name**: `Organization Verification Documents`
- **File Size Limit**: `200MB` (Pro limit)
- **Allowed Extensions**: `pdf,doc,docx,jpg,jpeg,png,txt,csv,xlsx,ppt,pptx`
- **Encryption**: AES-256 enabled
- **Antivirus**: Enhanced scanning ✅
- **Access Control**: Restricted to verified users

### 2. Advanced Storage Permissions

**Bucket-level security:**
- **Read**: `role:member` with document ownership
- **Create**: `role:member` with size/type validation
- **Update**: `role:member` (owner only)
- **Delete**: `role:member` (owner) + `role:admin`

## Pro Features Configuration

### 1. Advanced Analytics

**Custom Dashboards:**
1. Navigate to **Analytics** → **Custom Dashboards**
2. Create dashboards for:
   - **User Engagement**: Registration trends, active users
   - **Donation Metrics**: Items posted, claimed, completed
   - **Geographic Analysis**: Donation distribution by region
   - **Performance Monitoring**: API response times, error rates

**Key Metrics to Track:**
- Daily/monthly active users
- Donation success rate
- Average pickup time
- User retention rates
- Storage usage patterns

### 2. Advanced Security Monitoring

**Audit Log Configuration:**
1. **Authentication Events**: Login attempts, failures
2. **Database Operations**: Create, update, delete actions
3. **File Operations**: Upload, download, delete activities
4. **Permission Changes**: Role modifications, access grants

**Security Alerts:**
- Multiple failed login attempts
- Unusual geographic access patterns
- Large file uploads outside business hours
- Bulk data operations

### 3. Performance Optimization

**CDN Configuration:**
- **Global Edge Locations**: Automatic with Pro
- **Cache Headers**: Optimized for static assets
- **Image Optimization**: WebP conversion, lazy loading
- **Compression**: Gzip/Brotli for text content

**Database Performance:**
- **Query Optimization**: Automatic index suggestions
- **Connection Pooling**: Enhanced for high traffic
- **Read Replicas**: Geographic distribution
- **Caching**: Redis integration for frequently accessed data

### 4. Custom Domain Setup

**API Domain Configuration:**
1. **Domain**: `api.saveandserve.org`
2. **SSL Certificate**: Auto-provisioned with Let's Encrypt
3. **DNS Configuration**:
   ```
   CNAME: api.saveandserve.org → your-project.appwrite.global
   ```
4. **CORS Update**: Add custom domain to allowed origins

## Environment Variables

Create `.env.local` in your project root:

```env
# Appwrite Pro Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://api.saveandserve.org/v1
# Fallback: https://cloud.appwrite.io/v1

NEXT_PUBLIC_APPWRITE_PROJECT_ID=save-serve-production-2025

# Pro Features
NEXT_PUBLIC_APPWRITE_CUSTOM_DOMAIN=api.saveandserve.org
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_ADVANCED_SECURITY=true
NEXT_PUBLIC_ENABLE_AUDIT_LOGS=true

# Database Configuration
NEXT_PUBLIC_APPWRITE_DATABASE_ID=saveserve-main

# Collection IDs
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID=users
NEXT_PUBLIC_APPWRITE_ORGANIZATIONS_COLLECTION_ID=organizations
NEXT_PUBLIC_APPWRITE_DONATIONS_COLLECTION_ID=donations
NEXT_PUBLIC_APPWRITE_PICKUPS_COLLECTION_ID=pickups
NEXT_PUBLIC_APPWRITE_MESSAGES_COLLECTION_ID=messages
NEXT_PUBLIC_APPWRITE_NOTIFICATIONS_COLLECTION_ID=notifications

# Storage Bucket IDs
NEXT_PUBLIC_APPWRITE_DONATION_IMAGES_BUCKET_ID=donation-images
NEXT_PUBLIC_APPWRITE_PROFILE_IMAGES_BUCKET_ID=profile-images
NEXT_PUBLIC_APPWRITE_ORG_DOCUMENTS_BUCKET_ID=org-documents

# Application Configuration
NEXT_PUBLIC_APP_URL=https://saveandserve.org
NEXT_PUBLIC_APP_ENV=production

# Feature Flags
NEXT_PUBLIC_ENABLE_GEOLOCATION=true
NEXT_PUBLIC_ENABLE_PUSH_NOTIFICATIONS=true
NEXT_PUBLIC_ENABLE_REAL_TIME=true

# Third-party Integrations
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-key
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

## Testing & Validation

### 1. Connection Testing

```bash
# Start development server
npm run dev

# Check console for connection status
# Expected: ✅ Appwrite Pro connected successfully
```

### 2. Authentication Testing

**Test Flow:**
1. Navigate to `http://localhost:3001/register`
2. Create test accounts for each user type:
   - Donor account
   - Organization account
3. Verify email functionality
4. Check Appwrite console → Auth → Users

### 3. Database Operations Testing

**Test CRUD Operations:**
1. User registration → Users collection
2. Organization creation → Organizations collection
3. Donation posting → Donations collection
4. Message sending → Messages collection

### 4. Storage Testing

**File Upload Validation:**
1. Upload profile image (< 50MB)
2. Upload donation photos (< 100MB)
3. Upload organization documents (< 200MB)
4. Verify antivirus scanning
5. Test CDN delivery speed

### 5. Pro Features Validation

**Analytics Testing:**
- Custom dashboard data population
- Real-time metrics updates
- Export functionality

**Security Testing:**
- Rate limiting behavior
- Audit log generation
- IP filtering (if configured)

## Production Deployment

### Pro Security Checklist

✅ **Essential Security Steps:**
1. **Environment Variables**: Move to secure environment
2. **CORS Configuration**: Remove wildcards, add specific domains
3. **Custom Domain SSL**: Verify certificate installation
4. **Database Backups**: Configure automated daily backups
5. **Audit Logging**: Enable comprehensive activity tracking
6. **Rate Limiting**: Set production-appropriate limits
7. **IP Filtering**: Implement geographic restrictions if needed
8. **Antivirus Scanning**: Verify active protection
9. **Access Controls**: Review and restrict permissions
10. **Monitoring Alerts**: Set up incident notifications

### Production Environment Variables

```env
# Production Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://api.saveandserve.org/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=save-serve-production-2025
NEXT_PUBLIC_APP_URL=https://saveandserve.org
NEXT_PUBLIC_APP_ENV=production

# Security Settings
NEXT_PUBLIC_ENABLE_AUDIT_LOGS=true
NEXT_PUBLIC_ENABLE_ADVANCED_SECURITY=true
NEXT_PUBLIC_ENABLE_IP_FILTERING=true

# Performance Settings
NEXT_PUBLIC_ENABLE_CDN=true
NEXT_PUBLIC_ENABLE_CACHING=true
NEXT_PUBLIC_ENABLE_COMPRESSION=true
```

### Monitoring & Maintenance

**Key Metrics to Monitor:**
- API response times (< 200ms average)
- Error rates (< 0.1%)
- Storage usage (track growth)
- User activity patterns
- Security incidents

**Regular Maintenance Tasks:**
- Weekly backup verification
- Monthly security audit review
- Quarterly performance optimization
- Annual security assessment

## Troubleshooting

### Common Issues & Solutions

#### CORS Configuration Errors
**Symptoms:** `Access-Control-Allow-Origin` errors
**Solutions:**
1. Verify platform hostnames in Settings → Platforms
2. Add production domains without wildcards
3. Include custom domain in CORS origins
4. Check protocol (HTTP vs HTTPS) matching

#### Authentication Failures
**Symptoms:** Login/registration not working
**Solutions:**
1. Verify email/password method enabled
2. Check SMTP configuration for email verification
3. Validate session length settings
4. Review rate limiting configuration

#### Database Permission Errors
**Symptoms:** `Permission denied` for database operations
**Solutions:**
1. Verify collection permissions set to `role:member`
2. Check user authentication status
3. Validate document-level permissions
4. Review role assignments

#### Storage Upload Issues
**Symptoms:** File uploads failing or rejected
**Solutions:**
1. Check file size against bucket limits
2. Verify file extension in allowed list
3. Confirm antivirus scanning status
4. Test with different file types

#### Pro Feature Access Issues
**Symptoms:** Pro features not available
**Solutions:**
1. Verify Pro subscription active
2. Check account billing status
3. Confirm project created under Pro account
4. Contact Appwrite Pro support

### Performance Optimization

**Database Optimization:**
- Add indexes for frequently queried fields
- Use pagination for large datasets
- Implement query result caching
- Monitor slow query logs

**Storage Optimization:**
- Enable image compression
- Use WebP format when possible
- Implement lazy loading
- Configure CDN caching headers

### Getting Pro Support

**Support Channels:**
- 🎯 **Priority Support Portal**: [https://appwrite.io/support](https://appwrite.io/support)
- 💬 **Pro Discord Channel**: Dedicated Pro user support
- 📧 **Direct Email**: pro-support@appwrite.io
- 📞 **Phone Support**: Available for Enterprise Pro

**When Contacting Support:**
1. **Project ID** and **Account Email**
2. **Detailed Issue Description**
3. **Steps to Reproduce**
4. **Expected vs Actual Behavior**
5. **Screenshots/Logs** if applicable

### Resources & Documentation

**Official Documentation:**
- [Appwrite Pro Features](https://appwrite.io/docs/pro)
- [Next.js Integration Guide](https://appwrite.io/docs/tutorials/nextjs)
- [Security Best Practices](https://appwrite.io/docs/security)
- [Performance Optimization](https://appwrite.io/docs/performance)

**Community Resources:**
- [Appwrite Discord](https://discord.com/invite/GSeTUeA)
- [GitHub Discussions](https://github.com/appwrite/appwrite/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/appwrite)

---

**🚀 Ready to Launch?** 
Your Save&Serve platform is now configured with enterprise-grade Appwrite Pro backend. For additional help, check the main [README.md](./README.md) or contact Pro support.