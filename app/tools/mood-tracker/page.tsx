"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Heart, TrendingUp, Calendar, ArrowLeft, Save, BarChart3, LineChart } from "lucide-react"
import Link from "next/link"

// Mock data for mood history
const moodHistory = [
  { date: "2024-01-15", mood: 4, note: "Had a great day at work, feeling accomplished" },
  { date: "2024-01-14", mood: 3, note: "Okay day, some stress but manageable" },
  { date: "2024-01-13", mood: 2, note: "Feeling a bit low, weather was gloomy" },
  { date: "2024-01-12", mood: 4, note: "Good day with friends, felt supported" },
  { date: "2024-01-11", mood: 5, note: "Excellent day! Completed a big project" },
  { date: "2024-01-10", mood: 3, note: "Average day, nothing special" },
  { date: "2024-01-09", mood: 2, note: "Struggled with anxiety today" },
]

const moodLabels = {
  5: { label: "Excellent", emoji: "😊", color: "bg-green-500" },
  4: { label: "Good", emoji: "🙂", color: "bg-blue-500" },
  3: { label: "Okay", emoji: "😐", color: "bg-yellow-500" },
  2: { label: "Low", emoji: "😔", color: "bg-orange-500" },
  1: { label: "Very Low", emoji: "😢", color: "bg-red-500" },
}

function MoodTrackerContent() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [moodNote, setMoodNote] = useState("")
  const [selectedFactors, setSelectedFactors] = useState<string[]>([])

  const factors = [
    "Work/School",
    "Relationships",
    "Health",
    "Sleep",
    "Exercise",
    "Weather",
    "Social Activities",
    "Stress",
    "Anxiety",
    "Family",
    "Finances",
    "Other",
  ]

  const handleMoodSelect = (mood: number) => {
    setSelectedMood(mood)
  }

  const handleFactorToggle = (factor: string) => {
    setSelectedFactors((prev) => (prev.includes(factor) ? prev.filter((f) => f !== factor) : [...prev, factor]))
  }

  const handleSaveMood = () => {
    // TODO: Implement mood saving logic
    console.log("Saving mood:", { mood: selectedMood, note: moodNote, factors: selectedFactors })
    // Reset form
    setSelectedMood(null)
    setMoodNote("")
    setSelectedFactors([])
  }

  const averageMood = moodHistory.reduce((sum, entry) => sum + entry.mood, 0) / moodHistory.length

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
              <Link href="/tools" className="text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="h-4 w-4 mr-1 inline" />
                Back to Tools
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Mood Tracker</h1>
            <p className="text-lg text-muted-foreground">
              Track your daily emotions to identify patterns and improve your mental wellbeing
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Tracking */}
            <div className="lg:col-span-2 space-y-6">
              {/* Today's Mood */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span>How are you feeling today?</span>
                  </CardTitle>
                  <CardDescription>Select your current mood and add any notes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Mood Selection */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Select your mood:</h3>
                    <div className="grid grid-cols-5 gap-3">
                      {Object.entries(moodLabels).map(([value, data]) => (
                        <Button
                          key={value}
                          variant={selectedMood === Number.parseInt(value) ? "default" : "outline"}
                          className={`h-20 flex-col space-y-2 ${
                            selectedMood === Number.parseInt(value)
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted"
                          }`}
                          onClick={() => handleMoodSelect(Number.parseInt(value))}
                        >
                          <span className="text-2xl">{data.emoji}</span>
                          <span className="text-xs font-medium">{data.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Factors */}
                  <div className="space-y-4">
                    <h3 className="font-medium">What's influencing your mood? (optional)</h3>
                    <div className="flex flex-wrap gap-2">
                      {factors.map((factor) => (
                        <Button
                          key={factor}
                          variant={selectedFactors.includes(factor) ? "default" : "outline"}
                          size="sm"
                          className={
                            selectedFactors.includes(factor) ? "bg-primary text-primary-foreground" : "bg-transparent"
                          }
                          onClick={() => handleFactorToggle(factor)}
                        >
                          {factor}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <label htmlFor="mood-note" className="font-medium">
                      Add a note (optional):
                    </label>
                    <Textarea
                      id="mood-note"
                      placeholder="What happened today? How are you feeling? Any thoughts you'd like to capture..."
                      value={moodNote}
                      onChange={(e) => setMoodNote(e.target.value)}
                      rows={4}
                    />
                  </div>

                  {/* Save Button */}
                  <Button onClick={handleSaveMood} disabled={!selectedMood} className="w-full" size="lg">
                    <Save className="h-4 w-4 mr-2" />
                    Save Today's Mood
                  </Button>
                </CardContent>
              </Card>

              {/* Mood History */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>Recent Mood History</span>
                  </CardTitle>
                  <CardDescription>Your mood entries from the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {moodHistory.slice(0, 5).map((entry, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{moodLabels[entry.mood as keyof typeof moodLabels].emoji}</span>
                          <div>
                            <p className="font-medium text-sm">
                              {moodLabels[entry.mood as keyof typeof moodLabels].label}
                            </p>
                            <p className="text-xs text-muted-foreground">{entry.date}</p>
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">{entry.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="outline" className="bg-transparent">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Full History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Insights</CardTitle>
                  <CardDescription>Based on your recent entries</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-1">{averageMood.toFixed(1)}</div>
                    <p className="text-sm text-muted-foreground">Average mood this week</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Best day:</span>
                      <span className="font-medium">Jan 11 (Excellent)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Entries this week:</span>
                      <span className="font-medium">{moodHistory.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Streak:</span>
                      <span className="font-medium">7 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card>
                <CardHeader>
                  <CardTitle>Mood Tracking Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Track consistently for better insights</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Be honest about your feelings</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Look for patterns over time</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Use notes to capture context</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <LineChart className="h-4 w-4 mr-2" />
                    View Detailed Charts
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Calendar className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Set Reminders
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MoodTrackerPage() {
  return (
    <ProtectedRoute>
      <MoodTrackerContent />
    </ProtectedRoute>
  )
}
