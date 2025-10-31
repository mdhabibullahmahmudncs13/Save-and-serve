'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { 
  BarChart3, 
  Heart, 
  Plus, 
  MapPin, 
  Users, 
  Utensils,
  Bell,
  Settings,
  LogOut
} from 'lucide-react'

export default function DashboardPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const isDonor = user.role === 'donor'
  const isOrganization = user.role === 'organization'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-green-600 mr-2" />
              <span className="text-2xl font-bold text-gray-900">Save&Serve</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:text-gray-900">
                    <Settings className="h-5 w-5" />
                  </button>
                  
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-gray-600 hover:text-gray-900"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600">
            {isDonor && "Ready to make a difference? List your surplus food and help fight hunger."}
            {isOrganization && "Check out available donations in your area and help serve your community."}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Utensils className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">
                  {isDonor ? "Total Donations" : "Total Pickups"}
                </p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Meals Rescued</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Impact Score</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <MapPin className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">CO₂ Saved</p>
                <p className="text-2xl font-bold text-gray-900">0 kg</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Panel */}
          <div className="lg:col-span-2">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              
              {isDonor && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group">
                    <Plus className="h-8 w-8 text-gray-400 group-hover:text-green-500 mr-3" />
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">Create Donation</p>
                      <p className="text-sm text-gray-600">List surplus food for pickup</p>
                    </div>
                  </button>
                  
                  <button className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                    <BarChart3 className="h-8 w-8 text-gray-400 group-hover:text-blue-500 mr-3" />
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">View Analytics</p>
                      <p className="text-sm text-gray-600">Track your impact</p>
                    </div>
                  </button>
                </div>
              )}

              {isOrganization && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group">
                    <MapPin className="h-8 w-8 text-gray-400 group-hover:text-green-500 mr-3" />
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">Browse Donations</p>
                      <p className="text-sm text-gray-600">Find food in your area</p>
                    </div>
                  </button>
                  
                  <button className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                    <Users className="h-8 w-8 text-gray-400 group-hover:text-blue-500 mr-3" />
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">Schedule Pickup</p>
                      <p className="text-sm text-gray-600">Coordinate volunteers</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              
              <div className="space-y-4">
                {/* Empty state */}
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 mb-2">No activity yet</p>
                  <p className="text-sm text-gray-500">
                    {isDonor && "Your donations and their status will appear here"}
                    {isOrganization && "Your claimed donations and pickups will appear here"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Completion */}
            {!user.verified && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-yellow-800 mb-2">
                  Complete Your Profile
                </h3>
                <p className="text-sm text-yellow-700 mb-3">
                  Verify your email to start {isDonor ? 'donating' : 'claiming'} food.
                </p>
                <button className="text-sm bg-yellow-600 text-white px-3 py-2 rounded hover:bg-yellow-700">
                  Verify Email
                </button>
              </div>
            )}

            {/* Tips */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {isDonor ? "Donation Tips" : "Pickup Tips"}
              </h3>
              
              <ul className="space-y-3 text-sm text-gray-600">
                {isDonor && (
                  <>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Take clear photos of your food items
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Provide accurate pickup time windows
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Include any special handling instructions
                    </li>
                  </>
                )}
                
                {isOrganization && (
                  <>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Respond quickly to donation notifications
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Confirm pickup times with donors
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Rate your experience after pickup
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Community Impact */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Impact</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Platform Meals</span>
                  <span className="font-semibold">150,000+</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">CO₂ Emissions Saved</span>
                  <span className="font-semibold">75 tons</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Organizations</span>
                  <span className="font-semibold">500+</span>
                </div>
                
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    Together, we're fighting hunger and reducing waste 🌱
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}