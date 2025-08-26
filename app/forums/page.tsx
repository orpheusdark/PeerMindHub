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

const forumCategories = [
  {
    id: "anxiety",
    name: "चिंता सहायता (Anxiety Support)",
    description: "चिंता विकारों के लिए अनुभव और सामना करने की रणनीतियां साझा करें",
    icon: "🌊",
    postCount: 1847,
    memberCount: 1292,
    lastActivity: "2 minutes ago",
    isActive: true,
  },
  {
    id: "depression",
    name: "अवसाद सहायता (Depression Support)",
    description: "अवसाद और मूड विकारों पर चर्चा के लिए एक सुरक्षित स्थान",
    icon: "🌱",
    postCount: 2756,
    memberCount: 1840,
    lastActivity: "5 minutes ago",
    isActive: true,
  },
  {
    id: "stress",
    name: "तनाव प्रबंधन (Stress Management)",
    description: "दैनिक तनाव को संभालने की तकनीकें और सहायता",
    icon: "🧘",
    postCount: 1234,
    memberCount: 867,
    lastActivity: "12 minutes ago",
    isActive: true,
  },
  {
    id: "family",
    name: "पारिवारिक समस्याएं (Family Issues)",
    description: "पारिवारिक रिश्तों और घरेलू समस्याओं के लिए सहायता",
    icon: "👨‍👩‍👧‍👦",
    postCount: 956,
    memberCount: 634,
    lastActivity: "8 minutes ago",
    isActive: true,
  },
  {
    id: "work-stress",
    name: "कार्यक्षेत्र तनाव (Workplace Stress)",
    description: "नौकरी और करियर संबंधी तनाव की चर्चा",
    icon: "💼",
    postCount: 1123,
    memberCount: 789,
    lastActivity: "15 minutes ago",
    isActive: true,
  },
  {
    id: "students",
    name: "छात्र सहायता (Student Support)",
    description: "शैक्षणिक दबाव और करियर चिंताओं के लिए सहायता",
    icon: "📚",
    postCount: 1567,
    memberCount: 1234,
    lastActivity: "3 minutes ago",
    isActive: true,
  },
  {
    id: "women",
    name: "महिला स्वास्थ्य (Women's Mental Health)",
    description: "महिलाओं के मानसिक स्वास्थ्य के मुद्दों पर चर्चा",
    icon: "👩",
    postCount: 834,
    memberCount: 567,
    lastActivity: "20 minutes ago",
    isActive: true,
  },
  {
    id: "general",
    name: "सामान्य चर्चा (General Discussion)",
    description: "मानसिक स्वास्थ्य और कल्याण पर खुली चर्चा",
    icon: "💬",
    postCount: 2190,
    memberCount: 1867,
    lastActivity: "1 minute ago",
    isActive: true,
  },
]

const trendingTopics = [
  { title: "IIT/JEE की तैयारी में तनाव कैसे संभालें", replies: 43, category: "Student Support" },
  { title: "Working from home में mental health कैसे maintain करें", replies: 67, category: "Workplace Stress" },
  { title: "शादी के बाद depression - क्या करूं?", replies: 28, category: "Women's Mental Health" },
  { title: "Parents के साथ mental health के बारे में कैसे बात करें", replies: 35, category: "Family Issues" },
  { title: "Mumbai में affordable therapy options", replies: 52, category: "General Discussion" },
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
              <Link href="/crisis-helplines" className="text-muted-foreground hover:text-primary transition-colors">
                Crisis Help
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
                    <Link href="/forums/general" className="block hover:text-primary transition-colors">
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
                  <span className="font-semibold">12,507</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active Members</span>
                  <span className="font-semibold">8,290</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Online Now</span>
                  <span className="font-semibold text-primary">456</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Posts Today</span>
                  <span className="font-semibold">127</span>
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
                  <Link href="/crisis-helplines">
                    <Button size="sm" variant="destructive" className="w-full">
                      Crisis Resources
                    </Button>
                  </Link>
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
