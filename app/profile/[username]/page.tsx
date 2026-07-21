"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, MessageCircle, Calendar, GraduationCap, MapPin, Award } from "lucide-react"
import { UnderDevelopmentModal } from "@/components/ui/under-development-modal"
import Link from "next/link"

const fallbackProfile = {
  id: 1,
  name: "Rahul Sharma",
  bio: "Preparing for semester exams and placements.",
  university: "Fictional Engineering University",
  course: "B.Tech Computer Science",
  year: "2nd Year",
  interests: "Coding, Guitar, Reading",
  joined: "2026-06-15T10:00:00Z",
  posts_count: 5,
  comments_count: 14
}

export default function ProfilePage() {
  const params = useParams()
  const [profile, setProfile] = useState<any>(fallbackProfile)
  const [loading, setLoading] = useState(true)
  
  // Clean up username from URL (e.g., %20 to space)
  const username = decodeURIComponent(params.username as string)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`https://peermindhub.onrender.com/users/public/${username}`)
        if (res.ok) {
          const data = await res.json()
          setProfile(data)
        } else {
          // If 404, we just use a mocked version based on their username to prevent breaking demo
          setProfile({
            ...fallbackProfile,
            name: username,
            bio: "Student exploring PeerMindHub.",
          })
        }
      } catch (err) {
        console.warn("Backend unavailable, using fallback profile data.")
        setProfile({
          ...fallbackProfile,
          name: username,
          bio: "Student exploring PeerMindHub.",
        })
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [username])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading profile...</div>
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column: Avatar & Basic Info */}
          <div className="md:col-span-1 space-y-6">
            <Card className="text-center shadow-sm">
              <CardContent className="pt-6">
                <Avatar className="h-32 w-32 mx-auto mb-4 border-4 border-background shadow-sm">
                  {profile.avatar_url ? (
                    <AvatarImage src={profile.avatar_url} />
                  ) : (
                    <AvatarFallback className="text-4xl bg-primary/10 text-primary">
                      {profile.name.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                <p className="text-muted-foreground mt-2 px-4">{profile.bio}</p>
                
                <div className="mt-6">
                  <UnderDevelopmentModal featureName="Connect / Message">
                    <Button className="w-full mb-2">Connect</Button>
                  </UnderDevelopmentModal>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.university && (
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                    <span>{profile.university}</span>
                  </div>
                )}
                {profile.course && (
                  <div className="flex items-center text-sm">
                    <GraduationCap className="h-4 w-4 mr-2 text-primary" />
                    <span>{profile.course} ({profile.year})</span>
                  </div>
                )}
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  <span>Joined {new Date(profile.joined).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Stats & Activity */}
          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card className="shadow-sm">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <BookOpen className="h-8 w-8 text-primary mb-2" />
                  <span className="text-3xl font-bold">{profile.posts_count}</span>
                  <span className="text-sm text-muted-foreground">Discussions</span>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  <MessageCircle className="h-8 w-8 text-primary mb-2" />
                  <span className="text-3xl font-bold">{profile.comments_count}</span>
                  <span className="text-sm text-muted-foreground">Helpful Replies</span>
                </CardContent>
              </Card>
            </div>

            {profile.interests && (
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Interests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.split(",").map((interest: string, i: number) => (
                      <Badge key={i} variant="secondary">{interest.trim()}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Award className="h-5 w-5 mr-2 text-primary" /> Recent Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <div className="text-center">
                    <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-2 text-2xl">
                      🌟
                    </div>
                    <span className="text-xs">Helpful Peer</span>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-2 text-2xl">
                      ✍️
                    </div>
                    <span className="text-xs">Journaler</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
                <CardDescription>This section is visible to the public.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-start border-b pb-4">
                    <div>
                      <p className="font-medium text-sm">Replied to "Exam Anxiety: Feeling completely frozen..."</p>
                      <p className="text-sm text-muted-foreground mt-1">"I went through exactly this last semester. What helped me was studying for 25 minutes..."</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">2 days ago</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">Posted a discussion in Recovery</p>
                      <Link href="/forums/post/demo-1" className="text-sm text-primary hover:underline mt-1 block">"Meditation helps - 10 minute guided session"</Link>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">1 week ago</span>
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
