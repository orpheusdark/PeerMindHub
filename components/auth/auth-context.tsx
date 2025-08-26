"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  email: string
  displayName?: string
  bio?: string
  isAnonymous: boolean
  createdAt: Date
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (userData: SignUpData) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

interface SignUpData {
  email: string
  password: string
  displayName?: string
  bio?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: Check for existing session
    // This would typically check localStorage/sessionStorage or make an API call
    const checkAuth = async () => {
      try {
        // Simulate checking for existing session
        const savedUser = localStorage.getItem("mindconnect_user")
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // TODO: Implement actual authentication API call
      // This is a mock implementation
      const mockUser: User = {
        id: "user_" + Date.now(),
        email,
        displayName: "Anonymous User",
        isAnonymous: true,
        createdAt: new Date(),
      }

      localStorage.setItem("mindconnect_user", JSON.stringify(mockUser))
      setUser(mockUser)
    } catch (error) {
      console.error("Sign in failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (userData: SignUpData) => {
    setIsLoading(true)
    try {
      // TODO: Implement actual registration API call
      // This is a mock implementation
      const newUser: User = {
        id: "user_" + Date.now(),
        email: userData.email,
        displayName: userData.displayName || "Anonymous User",
        bio: userData.bio,
        isAnonymous: !userData.displayName,
        createdAt: new Date(),
      }

      localStorage.setItem("mindconnect_user", JSON.stringify(newUser))
      setUser(newUser)
    } catch (error) {
      console.error("Sign up failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      localStorage.removeItem("mindconnect_user")
      setUser(null)
    } catch (error) {
      console.error("Sign out failed:", error)
      throw error
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return

    try {
      const updatedUser = { ...user, ...data }
      localStorage.setItem("mindconnect_user", JSON.stringify(updatedUser))
      setUser(updatedUser)
    } catch (error) {
      console.error("Profile update failed:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
