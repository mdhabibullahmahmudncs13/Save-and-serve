/**
 * Appwrite Database Schema Configuration
 * 
 * This file contains the database schema definitions for all collections
 * Run this configuration in your Appwrite console to set up the database
 */

export const databaseSchema = {
  databaseId: 'save-serve-db',
  collections: [
    {
      $id: 'users',
      name: 'Users',
      documentSecurity: true,
      attributes: [
        {
          key: 'email',
          type: 'string',
          size: 255,
          required: true,
        },
        {
          key: 'name',
          type: 'string',
          size: 255,
          required: true,
        },
        {
          key: 'phone',
          type: 'string',
          size: 20,
          required: false,
        },
        {
          key: 'role',
          type: 'string',
          size: 50,
          required: true,
          default: 'donor',
        },
        {
          key: 'verified',
          type: 'boolean',
          required: true,
          default: false,
        },
        {
          key: 'createdAt',
          type: 'datetime',
          required: true,
        },
        {
          key: 'location',
          type: 'string',
          size: 1000,
          required: false,
        },
        {
          key: 'profileImage',
          type: 'string',
          size: 255,
          required: false,
        },
      ],
      indexes: [
        {
          key: 'email_index',
          type: 'unique',
          attributes: ['email'],
        },
        {
          key: 'role_index',
          type: 'key',
          attributes: ['role'],
        },
      ],
    },
    {
      $id: 'organizations',
      name: 'Organizations',
      documentSecurity: true,
      attributes: [
        {
          key: 'userId',
          type: 'string',
          size: 255,
          required: true,
        },
        {
          key: 'organizationName',
          type: 'string',
          size: 255,
          required: true,
        },
        {
          key: 'registrationNumber',
          type: 'string',
          size: 100,
          required: false,
        },
        {
          key: 'organizationType',
          type: 'string',
          size: 50,
          required: true,
        },
        {
          key: 'capacity',
          type: 'integer',
          required: true,
          min: 1,
        },
        {
          key: 'serviceArea',
          type: 'integer',
          required: true,
          min: 1,
          default: 10,
        },
        {
          key: 'vehicleInfo',
          type: 'string',
          size: 500,
          required: false,
        },
        {
          key: 'verificationStatus',
          type: 'string',
          size: 50,
          required: true,
          default: 'pending',
        },
        {
          key: 'verificationDocs',
          type: 'string',
          size: 2000,
          required: false,
        },
        {
          key: 'preferences',
          type: 'string',
          size: 2000,
          required: true,
        },
        {
          key: 'impactStats',
          type: 'string',
          size: 1000,
          required: true,
        },
        {
          key: 'createdAt',
          type: 'datetime',
          required: true,
        },
      ],
      indexes: [
        {
          key: 'userId_index',
          type: 'unique',
          attributes: ['userId'],
        },
        {
          key: 'verification_index',
          type: 'key',
          attributes: ['verificationStatus'],
        },
        {
          key: 'type_index',
          type: 'key',
          attributes: ['organizationType'],
        },
      ],
    },
    {
      $id: 'donations',
      name: 'Donations',
      documentSecurity: true,
      attributes: [
        {
          key: 'donorId',
          type: 'string',
          size: 255,
          required: true,
        },
        {
          key: 'title',
          type: 'string',
          size: 255,
          required: true,
        },
        {
          key: 'description',
          type: 'string',
          size: 2000,
          required: true,
        },
        {
          key: 'foodType',
          type: 'string',
          size: 500,
          required: true,
        },
        {
          key: 'quantity',
          type: 'string',
          size: 500,
          required: true,
        },
        {
          key: 'images',
          type: 'string',
          size: 2000,
          required: false,
        },
        {
          key: 'location',
          type: 'string',
          size: 1000,
          required: true,
        },
        {
          key: 'pickupWindow',
          type: 'string',
          size: 500,
          required: true,
        },
        {
          key: 'status',
          type: 'string',
          size: 50,
          required: true,
          default: 'available',
        },
        {
          key: 'specialInstructions',
          type: 'string',
          size: 1000,
          required: false,
        },
        {
          key: 'createdAt',
          type: 'datetime',
          required: true,
        },
        {
          key: 'claimedBy',
          type: 'string',
          size: 255,
          required: false,
        },
        {
          key: 'claimedAt',
          type: 'datetime',
          required: false,
        },
        {
          key: 'completedAt',
          type: 'datetime',
          required: false,
        },
      ],
      indexes: [
        {
          key: 'donor_index',
          type: 'key',
          attributes: ['donorId'],
        },
        {
          key: 'status_index',
          type: 'key',
          attributes: ['status'],
        },
        {
          key: 'claimed_index',
          type: 'key',
          attributes: ['claimedBy'],
        },
        {
          key: 'created_index',
          type: 'key',
          attributes: ['createdAt'],
          orders: ['desc'],
        },
      ],
    },
    {
      $id: 'pickups',
      name: 'Pickups',
      documentSecurity: true,
      attributes: [
        {
          key: 'donationId',
          type: 'string',
          size: 255,
          required: true,
        },
        {
          key: 'organizationId',
          type: 'string',
          size: 255,
          required: true,
        },
        {
          key: 'donorId',
          type: 'string',
          size: 255,
          required: true,
        },
        {
          key: 'status',
          type: 'string',
          size: 50,
          required: true,
          default: 'scheduled',
        },
        {
          key: 'driverName',
          type: 'string',
          size: 255,
          required: false,
        },
        {
          key: 'driverPhone',
          type: 'string',
          size: 20,
          required: false,
        },
        {
          key: 'scheduledTime',
          type: 'datetime',
          required: true,
        },
        {
          key: 'actualPickupTime',
          type: 'datetime',
          required: false,
        },
        {
          key: 'rating',
          type: 'integer',
          required: false,
          min: 1,
          max: 5,
        },
        {
          key: 'feedback',
          type: 'string',
          size: 1000,
          required: false,
        },
        {
          key: 'impactCalculations',
          type: 'string',
          size: 500,
          required: true,
        },
        {
          key: 'createdAt',
          type: 'datetime',
          required: true,
        },
      ],
      indexes: [
        {
          key: 'donation_index',
          type: 'unique',
          attributes: ['donationId'],
        },
        {
          key: 'organization_index',
          type: 'key',
          attributes: ['organizationId'],
        },
        {
          key: 'donor_index',
          type: 'key',
          attributes: ['donorId'],
        },
        {
          key: 'status_index',
          type: 'key',
          attributes: ['status'],
        },
      ],
    },
    {
      $id: 'messages',
      name: 'Messages',
      documentSecurity: true,
      attributes: [
        {
          key: 'donationId',
          type: 'string',
          size: 255,
          required: true,
        },
        {
          key: 'senderId',
          type: 'string',
          size: 255,
          required: true,
        },
        {
          key: 'receiverId',
          type: 'string',
          size: 255,
          required: true,
        },
        {
          key: 'message',
          type: 'string',
          size: 2000,
          required: true,
        },
        {
          key: 'timestamp',
          type: 'datetime',
          required: true,
        },
        {
          key: 'read',
          type: 'boolean',
          required: true,
          default: false,
        },
      ],
      indexes: [
        {
          key: 'donation_index',
          type: 'key',
          attributes: ['donationId'],
        },
        {
          key: 'sender_index',
          type: 'key',
          attributes: ['senderId'],
        },
        {
          key: 'receiver_index',
          type: 'key',
          attributes: ['receiverId'],
        },
        {
          key: 'timestamp_index',
          type: 'key',
          attributes: ['timestamp'],
          orders: ['desc'],
        },
      ],
    },
    {
      $id: 'notifications',
      name: 'Notifications',
      documentSecurity: true,
      attributes: [
        {
          key: 'userId',
          type: 'string',
          size: 255,
          required: true,
        },
        {
          key: 'type',
          type: 'string',
          size: 50,
          required: true,
        },
        {
          key: 'title',
          type: 'string',
          size: 255,
          required: true,
        },
        {
          key: 'message',
          type: 'string',
          size: 1000,
          required: true,
        },
        {
          key: 'data',
          type: 'string',
          size: 2000,
          required: false,
        },
        {
          key: 'read',
          type: 'boolean',
          required: true,
          default: false,
        },
        {
          key: 'createdAt',
          type: 'datetime',
          required: true,
        },
      ],
      indexes: [
        {
          key: 'user_index',
          type: 'key',
          attributes: ['userId'],
        },
        {
          key: 'type_index',
          type: 'key',
          attributes: ['type'],
        },
        {
          key: 'read_index',
          type: 'key',
          attributes: ['read'],
        },
        {
          key: 'created_index',
          type: 'key',
          attributes: ['createdAt'],
          orders: ['desc'],
        },
      ],
    },
  ],
}

// Storage buckets configuration
export const storageBuckets = [
  {
    $id: 'images',
    name: 'Images',
    fileSecurity: true,
    maximumFileSize: 10485760, // 10MB
    allowedFileExtensions: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    compression: 'gzip',
    encryption: true,
    antivirus: true,
  },
  {
    $id: 'documents',
    name: 'Documents',
    fileSecurity: true,
    maximumFileSize: 5242880, // 5MB
    allowedFileExtensions: ['pdf', 'doc', 'docx'],
    compression: 'gzip',
    encryption: true,
    antivirus: true,
  },
]

// Functions configuration (for Appwrite Functions)
export const functionsConfig = [
  {
    $id: 'matching-algorithm',
    name: 'Donation Matching Algorithm',
    runtime: 'node-18.0',
    execute: ['users'],
    events: [],
    schedule: '',
    timeout: 15,
    enabled: true,
  },
  {
    $id: 'notification-sender',
    name: 'Notification Sender',
    runtime: 'node-18.0',
    execute: ['users'],
    events: [
      'databases.*.collections.donations.documents.*.create',
      'databases.*.collections.pickups.documents.*.update',
    ],
    schedule: '',
    timeout: 15,
    enabled: true,
  },
  {
    $id: 'impact-calculator',
    name: 'Impact Calculator',
    runtime: 'node-18.0',
    execute: ['users'],
    events: ['databases.*.collections.pickups.documents.*.update'],
    schedule: '',
    timeout: 15,
    enabled: true,
  },
  {
    $id: 'cleanup-expired',
    name: 'Cleanup Expired Donations',
    runtime: 'node-18.0',
    execute: ['users'],
    events: [],
    schedule: '0 0 * * *', // Daily at midnight
    timeout: 15,
    enabled: true,
  },
]

// Default permissions for collections
export const defaultPermissions = {
  read: ['role:donor', 'role:organization', 'role:admin'],
  write: ['role:donor', 'role:organization', 'role:admin'],
  create: ['role:donor', 'role:organization', 'role:admin'],
  update: ['role:donor', 'role:organization', 'role:admin'],
  delete: ['role:admin'],
}