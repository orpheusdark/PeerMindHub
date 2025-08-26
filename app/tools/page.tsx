"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Heart, Brain, BookOpen, Wind, TrendingUp, Calendar, Play } from "lucide-react"
import Link from "next/link"

function ToolsContent() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-foreground">PeerMindHub</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/forums" className="text-muted-foreground hover:text-primary transition-colors">
                Forums
              </Link>
              <Link href="/resources" className="text-muted-foreground hover:text-primary transition-colors">
                Resources
              </Link>
              <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Self-Help Tools</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Empower your mental health journey with interactive tools for mood tracking, journaling, and mindfulness
            practice.
          </p>
        </div>

        {/* Tools Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/tools/mood-tracker">
              <CardHeader className="text-center">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Mood Tracker</CardTitle>
                <CardDescription>Track your daily emotions and identify patterns over time</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Daily Insights
                </Badge>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/tools/journal">
              <CardHeader className="text-center">
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Private Journal</CardTitle>
                <CardDescription>Express your thoughts and feelings in a safe, private space</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Completely Private
                </Badge>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link href="/tools/breathing">
              <CardHeader className="text-center">
                <Wind className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Breathing Exercises</CardTitle>
                <CardDescription>Guided breathing and mindfulness exercises for immediate relief</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Instant Relief
                </Badge>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Quick Access Tools */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="mood">Quick Mood</TabsTrigger>
            <TabsTrigger value="journal">Quick Note</TabsTrigger>
            <TabsTrigger value="breathing">Quick Breathe</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <span>Your Mental Health Toolkit</span>
                </CardTitle>
                <CardDescription>Comprehensive tools to support your wellbeing journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Track & Understand</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 border rounded-lg">
                        <TrendingUp className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-medium">Mood Tracking</h4>
                          <p className="text-sm text-muted-foreground">
                            Log daily emotions and identify patterns to better understand your mental health trends.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 border rounded-lg">
                        <Calendar className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-medium">Progress Insights</h4>
                          <p className="text-sm text-muted-foreground">
                            View weekly and monthly reports to track your mental health journey over time.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Express & Practice</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 p-3 border rounded-lg">
                        <BookOpen className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-medium">Private Journaling</h4>
                          <p className="text-sm text-muted-foreground">
                            Write freely in a completely private space to process thoughts and emotions.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 p-3 border rounded-lg">
                        <Wind className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-medium">Mindfulness Practice</h4>
                          <p className="text-sm text-muted-foreground">
                            Access guided breathing exercises and meditation for immediate stress relief.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mood">
            <Card>
              <CardHeader>
                <CardTitle>Quick Mood Check</CardTitle>
                <CardDescription>How are you feeling right now?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { mood: "Great", emoji: "😊", color: "bg-green-100 text-green-800 border-green-200" },
                    { mood: "Good", emoji: "🙂", color: "bg-blue-100 text-blue-800 border-blue-200" },
                    { mood: "Okay", emoji: "😐", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
                    { mood: "Low", emoji: "😔", color: "bg-orange-100 text-orange-800 border-orange-200" },
                    { mood: "Difficult", emoji: "😢", color: "bg-red-100 text-red-800 border-red-200" },
                  ].map((item) => (
                    <Button
                      key={item.mood}
                      variant="outline"
                      className={`h-20 flex-col space-y-2 ${item.color} hover:opacity-80`}
                    >
                      <span className="text-2xl">{item.emoji}</span>
                      <span className="text-sm font-medium">{item.mood}</span>
                    </Button>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Full Mood Tracker
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="journal">
            <Card>
              <CardHeader>
                <CardTitle>Quick Journal Entry</CardTitle>
                <CardDescription>Capture your thoughts in the moment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <textarea
                  className="w-full h-32 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="What's on your mind today? Write freely - this is completely private..."
                />
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">Your entries are encrypted and completely private</p>
                  <div className="flex gap-2">
                    <Button variant="outline" className="bg-transparent">
                      Save Draft
                    </Button>
                    <Button>
                      <BookOpen className="h-4 w-4 mr-2" />
                      Save Entry
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="breathing">
            <Card>
              <CardHeader>
                <CardTitle>Quick Breathing Exercise</CardTitle>
                <CardDescription>Take a moment to center yourself with guided breathing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-primary/20 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                      <Wind className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">4-7-8 Breathing</h3>
                  <p className="text-muted-foreground mb-4">Inhale for 4, hold for 7, exhale for 8</p>
                </div>
                <div className="flex justify-center gap-4">
                  <Button size="lg">
                    <Play className="h-5 w-5 mr-2" />
                    Start Exercise
                  </Button>
                  <Button size="lg" variant="outline" className="bg-transparent">
                    <Wind className="h-5 w-5 mr-2" />
                    More Exercises
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function ToolsPage() {
  return (
    <ProtectedRoute>
      <ToolsContent />
    </ProtectedRoute>
  )
}
