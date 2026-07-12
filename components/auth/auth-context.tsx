"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { api, getAuthToken } from "@/lib/api"

interface User {
  id: string
  email: string
  name?: string
  displayName?: string
  bio?: string
  isAnonymous: boolean
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (userData: any) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = getAuthToken()
        if (token) {
          const profile = await api.get("/users/me")
          setUser({ ...profile, id: String(profile.id), displayName: profile.name, isAnonymous: false })
        } else {
          // Check for demo user
          const savedDemoUser = localStorage.getItem("peermind_demo_user")
          if (savedDemoUser) setUser(JSON.parse(savedDemoUser))
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        localStorage.removeItem("token")
      } finally {
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [])

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const res = await api.post("/auth/login", { email, password })
      localStorage.setItem("token", res.access_token)
      
      const profile = await api.get("/users/me")
      setUser({ ...profile, id: String(profile.id), displayName: profile.name, isAnonymous: false })
    } catch (error) {
      console.error("Sign in failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (userData: any) => {
    setIsLoading(true)
    try {
      await api.post("/auth/register", {
        name: userData.displayName || "Anonymous",
        email: userData.email,
        password: userData.password
      })
      // Auto login after registration
      await signIn(userData.email, userData.password)
    } catch (error) {
      console.error("Sign up failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    localStorage.removeItem("token")
    localStorage.removeItem("peermind_demo_user")
    setUser(null)
    window.location.href = "/"
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return
    try {
      if (getAuthToken()) {
        const profile = await api.put("/users/me", data)
        setUser({ ...profile, id: String(profile.id), displayName: profile.name, isAnonymous: false })
      } else {
        const updated = { ...user, ...data }
        localStorage.setItem("peermind_demo_user", JSON.stringify(updated))
        setUser(updated)
      }
    } catch (error) {
      console.error("Profile update failed:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut, updateProfile }}>
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
