import { databases, storage, DATABASE_ID, COLLECTIONS, STORAGE_BUCKET_ID } from '@/lib/appwrite'
import { ID, Query } from 'appwrite'
import { 
  Donation, 
  DonationFormData, 
  ApiResponse, 
  DonationFilters,
  FoodType 
} from '@/lib/types'
import { calculateCO2Savings, calculateMealsFromWeight } from '@/lib/utils'

/**
 * Donation API functions
 */
export class DonationAPI {
  /**
   * Create a new donation
   */
  static async createDonation(donorId: string, data: DonationFormData): Promise<ApiResponse<Donation>> {
    try {
      // Upload images first
      const imageIds: string[] = []
      for (const image of data.images) {
        const file = await storage.createFile(STORAGE_BUCKET_ID, ID.unique(), image)
        imageIds.push(file.$id)
      }

      // Prepare donation document
      const donationDoc = {
        donorId,
        title: data.title,
        description: data.description,
        foodType: JSON.stringify(data.foodType),
        quantity: JSON.stringify({
          portions: data.portions,
          weightKg: data.weightKg,
        }),
        images: JSON.stringify(imageIds),
        location: JSON.stringify(data.location),
        pickupWindow: JSON.stringify({
          startTime: data.pickupWindow.startTime,
          endTime: data.pickupWindow.endTime,
        }),
        status: 'available',
        specialInstructions: data.specialInstructions || '',
        createdAt: new Date().toISOString(),
      }

      const donation = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.DONATIONS,
        ID.unique(),
        donationDoc
      )

      return {
        success: true,
        data: donation as Donation,
        message: 'Donation created successfully',
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to create donation',
      }
    }
  }

  /**
   * Get donations with filters
   */
  static async getDonations(filters?: DonationFilters): Promise<ApiResponse<Donation[]>> {
    try {
      const queries: string[] = [
        Query.orderDesc('createdAt'),
        Query.limit(50),
      ]

      // Apply status filter
      if (filters?.status && filters.status.length > 0) {
        queries.push(Query.equal('status', filters.status))
      } else {
        queries.push(Query.equal('status', 'available'))
      }

      // Apply time filters
      if (filters?.startTime) {
        queries.push(Query.greaterThanEqual('createdAt', filters.startTime))
      }
      if (filters?.endTime) {
        queries.push(Query.lessThanEqual('createdAt', filters.endTime))
      }

      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.DONATIONS,
        queries
      )

      let donations = response.documents as Donation[]

      // Apply client-side filters for complex queries
      if (filters?.foodTypes && filters.foodTypes.length > 0) {
        donations = donations.filter(donation => {
          const donationFoodTypes: FoodType[] = JSON.parse(donation.foodType)
          return filters.foodTypes!.some(type => donationFoodTypes.includes(type))
        })
      }

      if (filters?.minPortions || filters?.maxPortions) {
        donations = donations.filter(donation => {
          const quantity = JSON.parse(donation.quantity)
          const portions = quantity.portions
          if (filters?.minPortions && portions < filters.minPortions) return false
          if (filters?.maxPortions && portions > filters.maxPortions) return false
          return true
        })
      }

      return {
        success: true,
        data: donations,
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch donations',
      }
    }
  }

  /**
   * Get donations by donor
   */
  static async getDonationsByDonor(donorId: string): Promise<ApiResponse<Donation[]>> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.DONATIONS,
        [
          Query.equal('donorId', donorId),
          Query.orderDesc('createdAt'),
        ]
      )

      return {
        success: true,
        data: response.documents as Donation[],
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch donations',
      }
    }
  }

  /**
   * Get donation by ID
   */
  static async getDonationById(donationId: string): Promise<ApiResponse<Donation>> {
    try {
      const donation = await databases.getDocument(
        DATABASE_ID,
        COLLECTIONS.DONATIONS,
        donationId
      )

      return {
        success: true,
        data: donation as Donation,
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Donation not found',
      }
    }
  }

  /**
   * Claim a donation
   */
  static async claimDonation(donationId: string, organizationId: string): Promise<ApiResponse<Donation>> {
    try {
      const donation = await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.DONATIONS,
        donationId,
        {
          status: 'claimed',
          claimedBy: organizationId,
          claimedAt: new Date().toISOString(),
        }
      )

      return {
        success: true,
        data: donation as Donation,
        message: 'Donation claimed successfully',
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to claim donation',
      }
    }
  }

  /**
   * Update donation status
   */
  static async updateDonationStatus(
    donationId: string, 
    status: Donation['status'], 
    additionalData?: any
  ): Promise<ApiResponse<Donation>> {
    try {
      const updateData: any = { status }

      if (status === 'picked_up') {
        updateData.completedAt = new Date().toISOString()
      }

      if (additionalData) {
        Object.assign(updateData, additionalData)
      }

      const donation = await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.DONATIONS,
        donationId,
        updateData
      )

      return {
        success: true,
        data: donation as Donation,
        message: 'Donation status updated successfully',
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to update donation status',
      }
    }
  }

  /**
   * Delete donation
   */
  static async deleteDonation(donationId: string): Promise<ApiResponse<void>> {
    try {
      // First get the donation to access image IDs
      const donation = await databases.getDocument(
        DATABASE_ID,
        COLLECTIONS.DONATIONS,
        donationId
      )

      // Delete associated images
      const imageIds = JSON.parse((donation as Donation).images || '[]')
      for (const imageId of imageIds) {
        try {
          await storage.deleteFile(STORAGE_BUCKET_ID, imageId)
        } catch (error) {
          console.warn(`Failed to delete image ${imageId}:`, error)
        }
      }

      // Delete the donation document
      await databases.deleteDocument(
        DATABASE_ID,
        COLLECTIONS.DONATIONS,
        donationId
      )

      return {
        success: true,
        message: 'Donation deleted successfully',
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to delete donation',
      }
    }
  }

  /**
   * Get nearby donations based on location and distance
   */
  static async getNearbyDonations(
    latitude: number,
    longitude: number,
    radiusKm: number = 25
  ): Promise<ApiResponse<Donation[]>> {
    try {
      // Get all available donations (we'll filter by distance client-side)
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.DONATIONS,
        [
          Query.equal('status', 'available'),
          Query.orderDesc('createdAt'),
          Query.limit(100),
        ]
      )

      const donations = response.documents as Donation[]
      
      // Filter by distance
      const nearbyDonations = donations.filter(donation => {
        const location = JSON.parse(donation.location)
        const distance = this.calculateDistance(latitude, longitude, location.lat, location.lng)
        return distance <= radiusKm
      })

      // Sort by distance
      nearbyDonations.sort((a, b) => {
        const locationA = JSON.parse(a.location)
        const locationB = JSON.parse(b.location)
        const distanceA = this.calculateDistance(latitude, longitude, locationA.lat, locationA.lng)
        const distanceB = this.calculateDistance(latitude, longitude, locationB.lat, locationB.lng)
        return distanceA - distanceB
      })

      return {
        success: true,
        data: nearbyDonations,
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch nearby donations',
      }
    }
  }

  /**
   * Calculate distance between two points (Haversine formula)
   */
  private static calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371 // Earth's radius in kilometers
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

  /**
   * Get donation statistics
   */
  static async getDonationStats(donorId?: string): Promise<ApiResponse<{
    totalDonations: number
    totalMeals: number
    totalWeight: number
    co2Saved: number
    activeListings: number
  }>> {
    try {
      const queries = donorId ? [Query.equal('donorId', donorId)] : []
      
      const [allDonations, activeDonations] = await Promise.all([
        databases.listDocuments(DATABASE_ID, COLLECTIONS.DONATIONS, [
          ...queries,
          Query.limit(1000),
        ]),
        databases.listDocuments(DATABASE_ID, COLLECTIONS.DONATIONS, [
          ...queries,
          Query.equal('status', 'available'),
          Query.limit(100),
        ]),
      ])

      let totalMeals = 0
      let totalWeight = 0

      allDonations.documents.forEach((donation: any) => {
        const quantity = JSON.parse(donation.quantity)
        totalMeals += quantity.portions || 0
        totalWeight += quantity.weightKg || 0
      })

      const co2Saved = calculateCO2Savings(totalWeight)

      return {
        success: true,
        data: {
          totalDonations: allDonations.documents.length,
          totalMeals,
          totalWeight,
          co2Saved,
          activeListings: activeDonations.documents.length,
        },
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch donation statistics',
      }
    }
  }
}