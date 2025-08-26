"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Heart, BookOpen, Save, Plus, Calendar, Lock, Search } from "lucide-react"
import Link from "next/link"

function JournalContent() {
  const [currentEntry, setCurrentEntry] = useState("")
  const [entryTitle, setEntryTitle] = useState("")
  const [entries] = useState([
    {
      id: 1,
      title: "आज का दिन",
      date: "2024-01-15",
      preview: "आज मैंने महसूस किया कि मेरी चिंता कम हो रही है...",
      mood: "बेहतर",
    },
    {
      id: 2,
      title: "Reflection on Progress",
      date: "2024-01-14",
      preview: "I've been practicing mindfulness for a week now and I can see small changes...",
      mood: "Hopeful",
    },
    {
      id: 3,
      title: "कल की चुनौतियां",
      date: "2024-01-13",
      preview: "कल का दिन थोड़ा कठिन था, लेकिन मैंने सांस की तकनीक का उपयोग किया...",
      mood: "Mixed",
    },
  ])

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
              <Link href="/tools" className="text-muted-foreground hover:text-primary transition-colors">
                Tools
              </Link>
              <Link href="/crisis-helplines" className="text-muted-foreground hover:text-primary transition-colors">
                Crisis Help
              </Link>
              <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Journal Entries List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span>My Journal</span>
                  </CardTitle>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    <Lock className="h-3 w-3 mr-1" />
                    Private
                  </Badge>
                </div>
                <CardDescription>Your thoughts, completely secure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search entries..." className="pl-10" />
                </div>
                <div className="space-y-3">
                  {entries.map((entry) => (
                    <div
                      key={entry.id}
                      className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm">{entry.title}</h4>
                        <span className="text-xs text-muted-foreground">{entry.date}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{entry.preview}</p>
                      <Badge variant="outline" className="text-xs">
                        {entry.mood}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Journal Editor */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5 text-primary" />
                  <span>New Journal Entry</span>
                </CardTitle>
                <CardDescription>Express yourself freely in your private space</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <Input
                    placeholder="Entry title (optional)"
                    value={entryTitle}
                    onChange={(e) => setEntryTitle(e.target.value)}
                  />
                  <Textarea
                    placeholder="आज आपका दिन कैसा रहा? अपने विचार और भावनाएं यहाँ लिखें... / How was your day today? Write your thoughts and feelings here..."
                    value={currentEntry}
                    onChange={(e) => setCurrentEntry(e.target.value)}
                    className="min-h-[300px] resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    <span>End-to-end encrypted • Only you can read this</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="bg-transparent">
                      <Calendar className="h-4 w-4 mr-2" />
                      Save Draft
                    </Button>
                    <Button>
                      <Save className="h-4 w-4 mr-2" />
                      Save Entry
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Journal Tips */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Journaling Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <h4 className="font-medium">Getting Started</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Write without judgment</li>
                      <li>• Focus on feelings, not just events</li>
                      <li>• Use both Hindi and English freely</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Helpful Prompts</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• What am I grateful for today?</li>
                      <li>• How did I handle challenges?</li>
                      <li>• What would I tell a friend?</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function JournalPage() {
  return (
    <ProtectedRoute>
      <JournalContent />
    </ProtectedRoute>
  )
}
