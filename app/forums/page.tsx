"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Heart, MessageCircle, Users, Clock, Search, Plus, Shield, AlertTriangle, TrendingUp } from "lucide-react"
import Link from "next/link"

// Mock data for forum categories and recent activity
const forumCategories = [
  {
    id: "anxiety",
    name: "Anxiety Support",
    description: "Share experiences and coping strategies for anxiety disorders",
    icon: "🌊",
    postCount: 1247,
    memberCount: 892,
    lastActivity: "2 minutes ago",
    isActive: true,
  },
  {
    id: "depression",
    name: "Depression Support",
    description: "A safe space to discuss depression and mood disorders",
    icon: "🌱",
    postCount: 2156,
    memberCount: 1340,
    lastActivity: "5 minutes ago",
    isActive: true,
  },
  {
    id: "stress",
    name: "Stress Management",
    description: "Techniques and support for managing daily stress",
    icon: "🧘",
    postCount: 834,
    memberCount: 567,
    lastActivity: "12 minutes ago",
    isActive: true,
  },
  {
    id: "grief",
    name: "Grief & Loss",
    description: "Support for those dealing with loss and bereavement",
    icon: "🕊️",
    postCount: 456,
    memberCount: 234,
    lastActivity: "1 hour ago",
    isActive: true,
  },
  {
    id: "lgbtq",
    name: "LGBTQ+ Support",
    description: "Mental health support for LGBTQ+ community members",
    icon: "🏳️‍🌈",
    postCount: 678,
    memberCount: 445,
    lastActivity: "30 minutes ago",
    isActive: true,
  },
  {
    id: "general",
    name: "General Support",
    description: "Open discussions about mental health and wellbeing",
    icon: "💬",
    postCount: 1890,
    memberCount: 1567,
    lastActivity: "1 minute ago",
    isActive: true,
  },
]

const trendingTopics = [
  { title: "Coping with work anxiety", replies: 23, category: "Anxiety Support" },
  { title: "Morning routine for better mental health", replies: 45, category: "General Support" },
  { title: "Dealing with seasonal depression", replies: 18, category: "Depression Support" },
  { title: "Mindfulness techniques that actually work", replies: 67, category: "Stress Management" },
]

function ForumsContent() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCategories = forumCategories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
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
              <Link href="/resources" className="text-muted-foreground hover:text-primary transition-colors">
                Resources
              </Link>
              <Link href="/profile" className="text-muted-foreground hover:text-primary transition-colors">
                Profile
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Community Forums</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with others who understand your journey. Share experiences, find support, and build meaningful
            connections in a safe, moderated environment.
          </p>
        </div>

        {/* Community Guidelines Alert */}
        <Alert className="mb-8 border-primary/20 bg-primary/5">
          <Shield className="h-4 w-4 text-primary" />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <span>
                Please read our{" "}
                <Link href="/community-guidelines" className="text-primary hover:underline font-medium">
                  Community Guidelines
                </Link>{" "}
                before posting. Respectful, supportive communication is required.
              </span>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Moderated 24/7
              </Badge>
            </div>
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Create Post */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search forums and topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </div>

            {/* Forum Categories */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Forum Categories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCategories.map((category) => (
                  <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <Link href={`/forums/${category.id}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{category.icon}</span>
                            <div>
                              <CardTitle className="text-lg">{category.name}</CardTitle>
                              <CardDescription className="text-sm">{category.description}</CardDescription>
                            </div>
                          </div>
                          {category.isActive && (
                            <Badge variant="secondary" className="bg-primary/10 text-primary">
                              Active
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="h-4 w-4" />
                              <span>{category.postCount} posts</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{category.memberCount} members</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{category.lastActivity}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>Trending Topics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="border-b border-border last:border-b-0 pb-3 last:pb-0">
                    <Link href="#" className="block hover:text-primary transition-colors">
                      <h4 className="font-medium text-sm mb-1">{topic.title}</h4>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{topic.category}</span>
                        <span>{topic.replies} replies</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Forum Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Posts</span>
                  <span className="font-semibold">7,261</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active Members</span>
                  <span className="font-semibold">5,045</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Online Now</span>
                  <span className="font-semibold text-primary">234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Posts Today</span>
                  <span className="font-semibold">89</span>
                </div>
              </CardContent>
            </Card>

            {/* Crisis Support */}
            <Alert className="border-destructive/20 bg-destructive/5">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-medium text-sm">Need immediate help?</p>
                  <p className="text-xs">
                    If you're in crisis, please contact emergency services or call a crisis helpline immediately.
                  </p>
                  <Button size="sm" variant="destructive" className="w-full">
                    Crisis Resources
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ForumsPage() {
  return (
    <ProtectedRoute>
      <ForumsContent />
    </ProtectedRoute>
  )
}
