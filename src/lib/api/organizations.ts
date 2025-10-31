import { databases, storage, DATABASE_ID, COLLECTIONS, STORAGE_BUCKET_ID } from '@/lib/appwrite'
import { ID, Query } from 'appwrite'
import { 
  Organization, 
  OrganizationRegistrationData, 
  ApiResponse,
  User 
} from '@/lib/types'

/**
 * Organization API functions
 */
export class OrganizationAPI {
  /**
   * Create organization profile
   */
  static async createOrganization(
    userId: string, 
    data: OrganizationRegistrationData
  ): Promise<ApiResponse<Organization>> {
    try {
      // Upload verification documents
      const docIds: string[] = []
      for (const doc of data.verificationDocs) {
        const file = await storage.createFile(STORAGE_BUCKET_ID, ID.unique(), doc)
        docIds.push(file.$id)
      }

      // Prepare organization document
      const orgDoc = {
        userId,
        organizationName: data.organizationName,
        registrationNumber: data.registrationNumber || '',
        organizationType: data.organizationType,
        capacity: data.capacity,
        serviceArea: data.serviceArea || 10,
        vehicleInfo: data.vehicleInfo || '',
        verificationStatus: 'pending',
        verificationDocs: JSON.stringify(docIds),
        preferences: JSON.stringify(data.preferences),
        impactStats: JSON.stringify({
          totalPickups: 0,
          totalMeals: 0,
          totalWeight: 0,
        }),
        createdAt: new Date().toISOString(),
      }

      const organization = await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.ORGANIZATIONS,
        ID.unique(),
        orgDoc
      )

      return {
        success: true,
        data: organization as Organization,
        message: 'Organization profile created successfully',
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to create organization profile',
      }
    }
  }

  /**
   * Get organization by user ID
   */
  static async getOrganizationByUserId(userId: string): Promise<ApiResponse<Organization>> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.ORGANIZATIONS,
        [Query.equal('userId', userId)]
      )

      if (response.documents.length === 0) {
        return {
          success: false,
          error: 'Organization profile not found',
        }
      }

      return {
        success: true,
        data: response.documents[0] as Organization,
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch organization profile',
      }
    }
  }

  /**
   * Get organization by ID
   */
  static async getOrganizationById(organizationId: string): Promise<ApiResponse<Organization>> {
    try {
      const organization = await databases.getDocument(
        DATABASE_ID,
        COLLECTIONS.ORGANIZATIONS,
        organizationId
      )

      return {
        success: true,
        data: organization as Organization,
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Organization not found',
      }
    }
  }

  /**
   * Update organization profile
   */
  static async updateOrganization(
    organizationId: string,
    data: Partial<Organization>
  ): Promise<ApiResponse<Organization>> {
    try {
      // Prepare update data
      const updateData: any = {}
      
      if (data.organizationName) updateData.organizationName = data.organizationName
      if (data.registrationNumber) updateData.registrationNumber = data.registrationNumber
      if (data.organizationType) updateData.organizationType = data.organizationType
      if (data.capacity) updateData.capacity = data.capacity
      if (data.serviceArea) updateData.serviceArea = data.serviceArea
      if (data.vehicleInfo) updateData.vehicleInfo = data.vehicleInfo
      if (data.preferences) updateData.preferences = JSON.stringify(data.preferences)

      const organization = await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.ORGANIZATIONS,
        organizationId,
        updateData
      )

      return {
        success: true,
        data: organization as Organization,
        message: 'Organization profile updated successfully',
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to update organization profile',
      }
    }
  }

  /**
   * Update verification status (admin only)
   */
  static async updateVerificationStatus(
    organizationId: string,
    status: 'pending' | 'verified' | 'rejected'
  ): Promise<ApiResponse<Organization>> {
    try {
      const organization = await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.ORGANIZATIONS,
        organizationId,
        { verificationStatus: status }
      )

      return {
        success: true,
        data: organization as Organization,
        message: `Organization ${status} successfully`,
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to update verification status',
      }
    }
  }

  /**
   * Get organizations pending verification (admin only)
   */
  static async getPendingVerifications(): Promise<ApiResponse<Organization[]>> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.ORGANIZATIONS,
        [
          Query.equal('verificationStatus', 'pending'),
          Query.orderDesc('createdAt'),
        ]
      )

      return {
        success: true,
        data: response.documents as Organization[],
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch pending verifications',
      }
    }
  }

  /**
   * Get verified organizations in area
   */
  static async getVerifiedOrganizationsInArea(
    latitude: number,
    longitude: number,
    radiusKm: number = 50
  ): Promise<ApiResponse<Organization[]>> {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTIONS.ORGANIZATIONS,
        [
          Query.equal('verificationStatus', 'verified'),
          Query.orderDesc('createdAt'),
          Query.limit(100),
        ]
      )

      // Filter by service area (client-side for now)
      const organizations = response.documents as Organization[]
      
      // For now, return all verified organizations
      // In a production app, you'd implement geospatial queries or use a geospatial database
      const nearbyOrganizations = organizations.filter(org => {
        return org.serviceArea >= radiusKm
      })

      return {
        success: true,
        data: nearbyOrganizations,
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch organizations',
      }
    }
  }

  /**
   * Update organization impact stats
   */
  static async updateImpactStats(
    organizationId: string,
    mealsRescued: number,
    weightKg: number
  ): Promise<ApiResponse<Organization>> {
    try {
      // Get current organization
      const org = await databases.getDocument(
        DATABASE_ID,
        COLLECTIONS.ORGANIZATIONS,
        organizationId
      )

      const currentStats = JSON.parse((org as Organization).impactStats)
      const updatedStats = {
        totalPickups: currentStats.totalPickups + 1,
        totalMeals: currentStats.totalMeals + mealsRescued,
        totalWeight: currentStats.totalWeight + weightKg,
      }

      const organization = await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.ORGANIZATIONS,
        organizationId,
        { impactStats: JSON.stringify(updatedStats) }
      )

      return {
        success: true,
        data: organization as Organization,
        message: 'Impact stats updated successfully',
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to update impact stats',
      }
    }
  }

  /**
   * Get organization statistics
   */
  static async getOrganizationStats(organizationId?: string): Promise<ApiResponse<{
    totalOrganizations: number
    verifiedOrganizations: number
    pendingVerifications: number
    totalPickups: number
    totalMealsRescued: number
    totalWeightRescued: number
  }>> {
    try {
      const [allOrgs, verifiedOrgs, pendingOrgs] = await Promise.all([
        databases.listDocuments(DATABASE_ID, COLLECTIONS.ORGANIZATIONS, [Query.limit(1000)]),
        databases.listDocuments(DATABASE_ID, COLLECTIONS.ORGANIZATIONS, [
          Query.equal('verificationStatus', 'verified'),
          Query.limit(1000),
        ]),
        databases.listDocuments(DATABASE_ID, COLLECTIONS.ORGANIZATIONS, [
          Query.equal('verificationStatus', 'pending'),
          Query.limit(100),
        ]),
      ])

      let totalPickups = 0
      let totalMealsRescued = 0
      let totalWeightRescued = 0

      if (organizationId) {
        // Get stats for specific organization
        const org = await databases.getDocument(
          DATABASE_ID,
          COLLECTIONS.ORGANIZATIONS,
          organizationId
        )
        const stats = JSON.parse((org as Organization).impactStats)
        totalPickups = stats.totalPickups
        totalMealsRescued = stats.totalMeals
        totalWeightRescued = stats.totalWeight
      } else {
        // Aggregate stats for all organizations
        allOrgs.documents.forEach((org: any) => {
          const stats = JSON.parse(org.impactStats)
          totalPickups += stats.totalPickups
          totalMealsRescued += stats.totalMeals
          totalWeightRescued += stats.totalWeight
        })
      }

      return {
        success: true,
        data: {
          totalOrganizations: allOrgs.documents.length,
          verifiedOrganizations: verifiedOrgs.documents.length,
          pendingVerifications: pendingOrgs.documents.length,
          totalPickups,
          totalMealsRescued,
          totalWeightRescued,
        },
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to fetch organization statistics',
      }
    }
  }

  /**
   * Check if organization can handle donation
   */
  static async canHandleDonation(
    organizationId: string,
    portions: number,
    foodTypes: string[]
  ): Promise<ApiResponse<boolean>> {
    try {
      const org = await databases.getDocument(
        DATABASE_ID,
        COLLECTIONS.ORGANIZATIONS,
        organizationId
      )

      const organization = org as Organization
      
      // Check verification status
      if (organization.verificationStatus !== 'verified') {
        return {
          success: true,
          data: false,
        }
      }

      // Check capacity
      if (portions > organization.capacity) {
        return {
          success: true,
          data: false,
        }
      }

      // Check food type preferences
      const preferences = JSON.parse(organization.preferences)
      const acceptedFoodTypes = preferences.foodTypes || []
      
      const canAccept = foodTypes.some(type => acceptedFoodTypes.includes(type))
      
      return {
        success: true,
        data: canAccept,
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to check organization capacity',
      }
    }
  }
}