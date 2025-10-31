'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { account, databases, DATABASE_ID, COLLECTIONS } from '@/lib/appwrite'
import { User } from '@/lib/types'
import { ID } from 'appwrite'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

interface RegisterData {
  name: string
  email: string
  password: string
  phone?: string
  role: 'donor' | 'organization' | 'admin'
  location?: {
    lat: number
    lng: number
    address: string
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const session = await account.get()
      if (session) {
        await fetchUserProfile(session.$id)
      }
    } catch (error) {
      console.log('No active session')
    } finally {
      setLoading(false)
    }
  }

  const fetchUserProfile = async (userId: string) => {
    try {
      const userDoc = await databases.getDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        userId
      )
      setUser(userDoc as User)
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  const register = async (userData: RegisterData) => {
    try {
      // Create Appwrite account
      const response = await account.create(
        ID.unique(),
        userData.email,
        userData.password,
        userData.name
      )

      // Create user profile in database
      const userProfile: Omit<User, '$id'> = {
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        role: userData.role,
        verified: false,
        createdAt: new Date().toISOString(),
        location: userData.location,
      }

      await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        response.$id,
        userProfile
      )

      // Send verification email
      await account.createVerification('http://localhost:3000/verify-email')

      // Auto-login after registration
      await login(userData.email, userData.password)
    } catch (error) {
      throw error
    }
  }

  const login = async (email: string, password: string) => {
    try {
      await account.createEmailSession(email, password)
      const session = await account.get()
      await fetchUserProfile(session.$id)
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      await account.deleteSession('current')
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) throw new Error('No user logged in')

    try {
      const updatedUser = await databases.updateDocument(
        DATABASE_ID,
        COLLECTIONS.USERS,
        user.$id,
        data
      )
      setUser(updatedUser as User)
    } catch (error) {
      throw error
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext