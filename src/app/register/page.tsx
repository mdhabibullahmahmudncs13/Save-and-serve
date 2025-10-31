'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { 
  Heart, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  MapPin, 
  Building, 
  FileText,
  Users,
  Utensils,
  Eye,
  EyeOff 
} from 'lucide-react'

type UserRole = 'donor' | 'organization'

interface FormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  phone: string
  role: UserRole
  organizationName?: string
  organizationType?: 'shelter' | 'food_bank' | 'community_center' | 'ngo'
  registrationNumber?: string
  capacity?: number
  serviceArea?: number
  location: {
    lat: number
    lng: number
    address: string
  }
}

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { register } = useAuth()

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'donor',
    location: {
      lat: 0,
      lng: 0,
      address: ''
    }
  })

  useEffect(() => {
    const type = searchParams.get('type')
    if (type === 'organization') {
      setFormData(prev => ({ ...prev, role: 'organization' }))
    }
  }, [searchParams])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name === 'capacity' || name === 'serviceArea') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields')
      return false
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      return false
    }
    
    return true
  }

  const validateStep2 = () => {
    if (formData.role === 'organization') {
      if (!formData.organizationName || !formData.organizationType || !formData.capacity) {
        setError('Please fill in all organization details')
        return false
      }
    }
    return true
  }

  const nextStep = () => {
    setError('')
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      setStep(3)
    }
  }

  const prevStep = () => {
    setStep(step - 1)
    setError('')
  }

  const handleSubmit = async () => {
    if (!validateStep1() || !validateStep2()) return

    setLoading(true)
    setError('')

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.role,
        location: formData.location.address ? formData.location : undefined
      })
      
      router.push('/dashboard')
    } catch (error: any) {
      setError(error.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            location: {
              ...prev.location,
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }))
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name *
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter your full name"
            required
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password *
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange}
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Create a password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password *
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Confirm your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter your phone number"
          />
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {formData.role === 'donor' ? 'Donor Information' : 'Organization Information'}
        </h2>
      </div>

      {/* Role Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          I am a *
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, role: 'donor' }))}
            className={`p-4 border-2 rounded-lg text-center transition-colors ${
              formData.role === 'donor'
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Utensils className="h-6 w-6 mx-auto mb-2" />
            <div className="font-semibold">Food Donor</div>
            <div className="text-sm text-gray-600">Restaurant, catering, events</div>
          </button>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, role: 'organization' }))}
            className={`p-4 border-2 rounded-lg text-center transition-colors ${
              formData.role === 'organization'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Users className="h-6 w-6 mx-auto mb-2" />
            <div className="font-semibold">Organization</div>
            <div className="text-sm text-gray-600">Shelter, food bank, NGO</div>
          </button>
        </div>
      </div>

      {/* Organization-specific fields */}
      {formData.role === 'organization' && (
        <>
          {/* Organization Name */}
          <div>
            <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-2">
              Organization Name *
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                id="organizationName"
                name="organizationName"
                type="text"
                value={formData.organizationName || ''}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter organization name"
                required
              />
            </div>
          </div>

          {/* Organization Type */}
          <div>
            <label htmlFor="organizationType" className="block text-sm font-medium text-gray-700 mb-2">
              Organization Type *
            </label>
            <select
              id="organizationType"
              name="organizationType"
              value={formData.organizationType || ''}
              onChange={handleInputChange}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="">Select organization type</option>
              <option value="shelter">Homeless Shelter</option>
              <option value="food_bank">Food Bank</option>
              <option value="community_center">Community Center</option>
              <option value="ngo">NGO/Charity</option>
            </select>
          </div>

          {/* Registration Number */}
          <div>
            <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Registration Number
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                id="registrationNumber"
                name="registrationNumber"
                type="text"
                value={formData.registrationNumber || ''}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter registration number"
              />
            </div>
          </div>

          {/* Capacity */}
          <div>
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-2">
              Meal Capacity (per pickup) *
            </label>
            <input
              id="capacity"
              name="capacity"
              type="number"
              value={formData.capacity || ''}
              onChange={handleInputChange}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter meal capacity"
              min="1"
              required
            />
          </div>

          {/* Service Area */}
          <div>
            <label htmlFor="serviceArea" className="block text-sm font-medium text-gray-700 mb-2">
              Service Area (km radius)
            </label>
            <input
              id="serviceArea"
              name="serviceArea"
              type="number"
              value={formData.serviceArea || ''}
              onChange={handleInputChange}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter service area radius"
              min="1"
            />
          </div>
        </>
      )}
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Location Information</h2>
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
          Address
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            id="address"
            name="address"
            type="text"
            value={formData.location.address}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              location: { ...prev.location, address: e.target.value }
            }))}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter your address"
          />
        </div>
        <button
          type="button"
          onClick={getCurrentLocation}
          className="mt-2 text-sm text-green-600 hover:text-green-500"
        >
          📍 Use my current location
        </button>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Registration Summary</h3>
        <div className="space-y-2 text-sm">
          <div><span className="font-medium">Name:</span> {formData.name}</div>
          <div><span className="font-medium">Email:</span> {formData.email}</div>
          <div><span className="font-medium">Role:</span> {formData.role === 'donor' ? 'Food Donor' : 'Organization'}</div>
          {formData.role === 'organization' && (
            <>
              <div><span className="font-medium">Organization:</span> {formData.organizationName}</div>
              <div><span className="font-medium">Type:</span> {formData.organizationType}</div>
              <div><span className="font-medium">Capacity:</span> {formData.capacity} meals</div>
            </>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center">
            <Heart className="h-8 w-8 text-green-600 mr-2" />
            <span className="text-2xl font-bold text-gray-900">Save&Serve</span>
          </Link>
          <p className="text-gray-600 mt-2">Join the fight against food waste</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Step {step} of 3</span>
            <span className="text-sm text-gray-600">{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Create Account</h1>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="min-h-[400px]">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 text-gray-600 hover:text-gray-800"
              >
                Back
              </button>
            )}
            
            <div className="ml-auto">
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              )}
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-green-600 font-semibold hover:text-green-500">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}