import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format date helpers
export const formatDate = (date: string | Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

export const formatDateTime = (date: string | Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(date))
}

export const formatTime = (date: string | Date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(date))
}

// Distance calculation helpers
export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371 // Radius of Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLng = (lng2 - lng1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export const formatDistance = (distanceKm: number): string => {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)}m`
  }
  return `${distanceKm.toFixed(1)}km`
}

// Impact calculation helpers
export const calculateCO2Savings = (weightKg: number): number => {
  // Average CO2 equivalent of food waste is 3.3 kg CO2 per kg of food
  return weightKg * 3.3
}

export const calculateMealsFromWeight = (weightKg: number): number => {
  // Average meal weight is approximately 0.4 kg
  return Math.round(weightKg / 0.4)
}

// Food type helpers
export const foodTypeLabels = {
  cooked: 'Cooked Food',
  packaged: 'Packaged Food',
  fresh_produce: 'Fresh Produce',
  bakery: 'Bakery Items',
  dairy: 'Dairy Products',
}

export const organizationTypeLabels = {
  shelter: 'Homeless Shelter',
  food_bank: 'Food Bank',
  community_center: 'Community Center',
  ngo: 'NGO/Charity',
}

// Validation helpers
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-()]+$/
  return phone.length >= 10 && phoneRegex.test(phone)
}

// File handling helpers
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/')
}

// URL helpers
export const createImageUrl = (fileId: string): string => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID}/files/${fileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`
}

// Time helpers
export const isPickupTimeValid = (startTime: string, endTime: string): boolean => {
  const start = new Date(startTime)
  const end = new Date(endTime)
  const now = new Date()
  
  return start > now && end > start && (end.getTime() - start.getTime()) >= 3600000 // At least 1 hour window
}

export const getTimeUntilPickup = (pickupTime: string): string => {
  const pickup = new Date(pickupTime)
  const now = new Date()
  const diffMs = pickup.getTime() - now.getTime()
  
  if (diffMs < 0) return 'Expired'
  
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
  
  if (diffHours > 24) {
    const days = Math.floor(diffHours / 24)
    return `${days} day${days > 1 ? 's' : ''}`
  }
  
  if (diffHours > 0) {
    return `${diffHours}h ${diffMinutes}m`
  }
  
  return `${diffMinutes}m`
}

// Generate unique IDs (for client-side use)
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Notification helpers
export const getNotificationIcon = (type: string): string => {
  switch (type) {
    case 'new_donation':
      return '🍽️'
    case 'claim_accepted':
      return '✅'
    case 'pickup_reminder':
      return '⏰'
    case 'rating_request':
      return '⭐'
    default:
      return '📢'
  }
}

// Local storage helpers
export const storage = {
  get: <T>(key: string): T | null => {
    if (typeof window === 'undefined') return null
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },
  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Handle storage errors
    }
  },
  remove: (key: string): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(key)
  },
}

// Error handling helpers
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  return 'An unexpected error occurred'
}