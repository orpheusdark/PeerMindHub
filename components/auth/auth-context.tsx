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
  role: "patient" | "counselor" | "admin"
  location?: string
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
        const savedUser = localStorage.getItem("peermind_user")
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
      const demoUsers = {
        "patient@demo.com": {
          id: "demo_patient_001",
          email: "patient@demo.com",
          displayName: "राहुल शर्मा (Rahul Sharma)",
          bio: "Software engineer from Mumbai dealing with work stress and anxiety. Looking for peer support.",
          isAnonymous: false,
          role: "patient" as const,
          location: "Mumbai, Maharashtra",
          createdAt: new Date("2024-01-01"),
        },
        "counselor@demo.com": {
          id: "demo_counselor_001",
          email: "counselor@demo.com",
          displayName: "Dr. प्रिया पटेल (Dr. Priya Patel)",
          bio: "Licensed clinical psychologist with 8 years experience. Specializing in anxiety and depression.",
          isAnonymous: false,
          role: "counselor" as const,
          location: "Delhi, India",
          createdAt: new Date("2023-06-15"),
        },
        "admin@demo.com": {
          id: "demo_admin_001",
          email: "admin@demo.com",
          displayName: "MindConnect Admin",
          bio: "Platform administrator ensuring safe and supportive community environment.",
          isAnonymous: false,
          role: "admin" as const,
          location: "Bangalore, Karnataka",
          createdAt: new Date("2023-01-01"),
        },
      }

      const demoUser = demoUsers[email as keyof typeof demoUsers]
      if (demoUser && password === "password123") {
        localStorage.setItem("peermind_user", JSON.stringify(demoUser))
        setUser(demoUser)
        return
      }

      const mockUser: User = {
        id: "user_" + Date.now(),
        email,
        displayName: "Anonymous User",
        isAnonymous: true,
        role: "patient",
        createdAt: new Date(),
      }

      localStorage.setItem("peermind_user", JSON.stringify(mockUser))
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
      const newUser: User = {
        id: "user_" + Date.now(),
        email: userData.email,
        displayName: userData.displayName || "Anonymous User",
        bio: userData.bio,
        isAnonymous: !userData.displayName,
        role: "patient",
        createdAt: new Date(),
      }

      localStorage.setItem("peermind_user", JSON.stringify(newUser))
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
      localStorage.removeItem("peermind_user")
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
      localStorage.setItem("peermind_user", JSON.stringify(updatedUser))
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
