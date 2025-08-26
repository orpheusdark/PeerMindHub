"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useAuth } from "@/components/auth/auth-context"
import { Heart, TrendingUp, MessageCircle, BookOpen, Wind, Calendar, Users, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

function DashboardContent() {
  const { user } = useAuth()

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
              <Link href="/forums" className="text-muted-foreground hover:text-primary transition-colors">
                Forums
              </Link>
              <Link href="/resources" className="text-muted-foreground hover:text-primary transition-colors">
                Resources
              </Link>
              <Link href="/tools" className="text-muted-foreground hover:text-primary transition-colors">
                Tools
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link href="/safety-plan" className="text-muted-foreground hover:text-primary transition-colors">
                Safety Plan
              </Link>
              <Link href="/profile" className="text-muted-foreground hover:text-primary transition-colors">
                Profile
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Welcome Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user?.displayName || "Friend"}</h1>
            <p className="text-lg text-muted-foreground">
              Your mental health journey continues here. How can we support you today?
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href="/tools/mood-tracker">
                <CardHeader className="text-center pb-2">
                  <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">Track Mood</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <p className="text-sm text-muted-foreground">Log how you're feeling today</p>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href="/forums">
                <CardHeader className="text-center pb-2">
                  <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">Join Forums</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <p className="text-sm text-muted-foreground">Connect with supportive community</p>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href="/tools/breathing">
                <CardHeader className="text-center pb-2">
                  <Wind className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">Breathe</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <p className="text-sm text-muted-foreground">Quick breathing exercise</p>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href="/resources">
                <CardHeader className="text-center pb-2">
                  <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">Find Help</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <p className="text-sm text-muted-foreground">Professional resources near you</p>
                </CardContent>
              </Link>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>Your Recent Activity</span>
                  </CardTitle>
                  <CardDescription>Keep track of your mental health journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">Mood tracked</p>
                        <p className="text-xs text-muted-foreground">Yesterday - Feeling good</p>
                      </div>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        Good
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Wind className="h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">Breathing exercise completed</p>
                        <p className="text-xs text-muted-foreground">2 days ago - 4-7-8 breathing</p>
                      </div>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        4 min
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg">
                      <MessageCircle className="h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">Forum post</p>
                        <p className="text-xs text-muted-foreground">3 days ago - Anxiety Support</p>
                      </div>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        5 replies
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    View All Activity
                  </Button>
                </CardContent>
              </Card>

              {/* Recommended Resources */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-primary" />
                    <span>Recommended for You</span>
                  </CardTitle>
                  <CardDescription>Based on your interests and activity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Understanding Anxiety</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Comprehensive guide to managing anxiety disorders
                      </p>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        Read Article
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Dr. Priya Sharma</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Clinical Psychologist in Vadodara specializing in anxiety
                      </p>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        View Profile
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                  <CardDescription>This week's summary</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Mood entries</span>
                    <span className="font-semibold">5/7 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Breathing sessions</span>
                    <span className="font-semibold">3 sessions</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Forum interactions</span>
                    <span className="font-semibold">2 posts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Streak</span>
                    <span className="font-semibold text-primary">12 days</span>
                  </div>
                </CardContent>
              </Card>

              {/* Community Highlights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Community</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-1">234</div>
                    <p className="text-sm text-muted-foreground">Members online now</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>New posts today:</span>
                      <span className="font-medium">89</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Active discussions:</span>
                      <span className="font-medium">156</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Join Conversations
                  </Button>
                </CardContent>
              </Card>

              {/* Daily Inspiration */}
              <Card>
                <CardHeader>
                  <CardTitle>Daily Inspiration</CardTitle>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-sm italic text-muted-foreground mb-3">
                    "You are braver than you believe, stronger than you seem, and smarter than you think."
                  </blockquote>
                  <p className="text-xs text-muted-foreground">- A.A. Milne</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
