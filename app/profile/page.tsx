"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth/auth-context"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Heart, Shield, User, Edit, Save, X } from "lucide-react"
import Link from "next/link"

function ProfileContent() {
  const { user, updateProfile, signOut } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    bio: user?.bio || "",
  })

  const handleSave = async () => {
    try {
      await updateProfile(formData)
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to update profile:", error)
    }
  }

  const handleCancel = () => {
    setFormData({
      displayName: user?.displayName || "",
      bio: user?.bio || "",
    })
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-foreground">MindConnect</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Button variant="outline" size="sm" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Your Profile</h1>
            <p className="text-muted-foreground">Manage your pseudonymous identity and privacy settings</p>
          </div>

          {/* Privacy Status */}
          <Alert className="border-primary/20 bg-primary/5">
            <Shield className="h-4 w-4 text-primary" />
            <AlertDescription>
              <div className="flex items-center justify-between">
                <span>Your identity is protected with pseudonymous profiles</span>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {user?.isAnonymous ? "Anonymous" : "Pseudonymous"}
                </Badge>
              </div>
            </AlertDescription>
          </Alert>

          {/* Profile Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Profile Information</span>
                  </CardTitle>
                  <CardDescription>Your community identity and bio</CardDescription>
                </div>
                {!isEditing ? (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handleCancel}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email (Private)</Label>
                <Input id="email" value={user?.email || ""} disabled className="bg-muted" />
                <p className="text-xs text-muted-foreground">Your email is never shared with other users</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                {isEditing ? (
                  <Input
                    id="displayName"
                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    placeholder="Choose a pseudonym for community interactions"
                  />
                ) : (
                  <Input id="displayName" value={user?.displayName || "Anonymous User"} disabled className="bg-muted" />
                )}
                <p className="text-xs text-muted-foreground">
                  This name is visible to other community members. Keep it anonymous.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Share what you're comfortable with about your journey..."
                    rows={4}
                  />
                ) : (
                  <Textarea id="bio" value={user?.bio || "No bio provided"} disabled className="bg-muted" rows={4} />
                )}
                <p className="text-xs text-muted-foreground">
                  Avoid sharing personal identifying information. Keep it general and supportive.
                </p>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Member since:</span>
                  <span className="font-medium">{user?.createdAt?.toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Privacy & Security</span>
              </CardTitle>
              <CardDescription>Your data protection and privacy controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Data Encryption</p>
                    <p className="text-xs text-muted-foreground">All data encrypted at rest</p>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Anonymous Posting</p>
                    <p className="text-xs text-muted-foreground">Identity protected in forums</p>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Enabled
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">DPDPA 2023 Compliant</p>
                    <p className="text-xs text-muted-foreground">Indian data protection laws</p>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Compliant
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Data Portability</p>
                    <p className="text-xs text-muted-foreground">Export your data anytime</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Account Management</CardTitle>
              <CardDescription>Manage your account settings and data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="flex-1 bg-transparent">
                  Change Password
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Download My Data
                </Button>
                <Button variant="destructive" className="flex-1">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  )
}
