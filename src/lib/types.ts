export interface User {
  $id: string
  email: string
  name: string
  phone?: string
  role: 'donor' | 'organization' | 'admin'
  verified: boolean
  createdAt: string
  location?: {
    lat: number
    lng: number
    address: string
  }
  profileImage?: string
}

export interface Organization {
  $id: string
  userId: string
  organizationName: string
  registrationNumber?: string
  organizationType: 'shelter' | 'food_bank' | 'community_center' | 'ngo'
  capacity: number // meals per pickup
  serviceArea: number // radius in km
  vehicleInfo?: string
  verificationStatus: 'pending' | 'verified' | 'rejected'
  verificationDocs?: string[] // storage file IDs
  preferences: {
    foodTypes: FoodType[]
    availableDays: number[] // 0-6 (Sunday to Saturday)
    availableHours: {
      start: string // 24-hour format
      end: string
    }
  }
  impactStats: {
    totalPickups: number
    totalMeals: number
    totalWeight: number // in kg
  }
}

export type FoodType = 'cooked' | 'packaged' | 'fresh_produce' | 'bakery' | 'dairy'

export interface Donation {
  $id: string
  donorId: string
  title: string
  description: string
  foodType: FoodType[]
  quantity: {
    portions: number
    weightKg: number
  }
  images: string[] // storage file IDs
  location: {
    lat: number
    lng: number
    address: string
  }
  pickupWindow: {
    startTime: string // ISO date string
    endTime: string
  }
  status: 'available' | 'claimed' | 'picked_up' | 'cancelled' | 'expired'
  specialInstructions?: string
  createdAt: string
  claimedBy?: string // organization ID
  claimedAt?: string
  completedAt?: string
}

export interface Pickup {
  $id: string
  donationId: string
  organizationId: string
  donorId: string
  status: 'scheduled' | 'in_transit' | 'completed' | 'cancelled'
  driverName?: string
  driverPhone?: string
  scheduledTime: string
  actualPickupTime?: string
  rating?: number // 1-5
  feedback?: string
  impactCalculations: {
    mealsRescued: number
    weightKg: number
    co2SavedKg: number
  }
}

export interface Message {
  $id: string
  donationId: string
  senderId: string
  receiverId: string
  message: string
  timestamp: string
  read: boolean
}

export interface Notification {
  $id: string
  userId: string
  type: 'new_donation' | 'claim_accepted' | 'pickup_reminder' | 'rating_request'
  title: string
  message: string
  data?: any // additional context
  read: boolean
  createdAt: string
}

export interface ImpactStats {
  totalMeals: number
  totalWeight: number
  co2Saved: number
  peopleServed: number
}

// Form interfaces
export interface DonationFormData {
  title: string
  description: string
  foodType: FoodType[]
  portions: number
  weightKg: number
  images: File[]
  location: {
    lat: number
    lng: number
    address: string
  }
  pickupWindow: {
    startTime: string
    endTime: string
  }
  specialInstructions?: string
}

export interface OrganizationRegistrationData {
  organizationName: string
  registrationNumber?: string
  organizationType: Organization['organizationType']
  capacity: number
  serviceArea: number
  vehicleInfo?: string
  verificationDocs: File[]
  preferences: Organization['preferences']
  location: {
    lat: number
    lng: number
    address: string
  }
}

export interface UserRegistrationData {
  name: string
  email: string
  password: string
  phone?: string
  role: User['role']
  location?: {
    lat: number
    lng: number
    address: string
  }
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Search and Filter types
export interface DonationFilters {
  foodTypes?: FoodType[]
  maxDistance?: number
  minPortions?: number
  maxPortions?: number
  startTime?: string
  endTime?: string
  status?: Donation['status'][]
}

export interface LocationCoordinates {
  lat: number
  lng: number
}

// Real-time subscription types
export interface RealtimeSubscription {
  unsubscribe: () => void
}