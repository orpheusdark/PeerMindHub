"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ProtectedRoute } from "@/components/auth/protected-route"
import {
  Heart,
  MessageCircle,
  ThumbsUp,
  Search,
  Plus,
  Filter,
  Flag,
  Eye,
  ArrowLeft,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { api, getAuthToken } from "@/lib/api"

// Category-specific fallback mock posts in case the backend fails.
const categoryFallbackPosts: Record<string, any[]> = {
  placements: [
    { id: 101, title: "Rejected after 4 rounds at Google.", content: "I prepared for 6 months. I feel completely empty right now. Should I even bother applying off-campus?", author_name: "Arjun Kulkarni", created_at: new Date().toISOString(), likes: 210, views: 2945, replies: 5, tags: "rejections, google, interview", category: "placements" },
    { id: 102, title: "Is 6 LPA good for a fresher in Bangalore?", content: "I got a PPO from my internship but it's 6 LPA. My friends are holding out for 10+ LPA packages.", author_name: "Simran Kaur", created_at: new Date().toISOString(), likes: 57, views: 1823, replies: 5, tags: "ppo, salary, bangalore", category: "placements" }
  ],
  academics: [
    { id: 103, title: "My attendance is 62%. Will medical certificates work?", content: "The college says minimum 75% is required or I'll get a backlog. Has anyone survived with 60%?", author_name: "Priyanshi Sharma", created_at: new Date().toISOString(), likes: 94, views: 842, replies: 5, tags: "attendance, college, panic", category: "academics" },
    { id: 104, title: "How to clear backlogs without losing your mind?", content: "I failed Engineering Drawing and M2 in my first year. Now I'm in 3rd year and the ATKT exams are clashing with my regular mid-sems.", author_name: "Kunal Verma", created_at: new Date().toISOString(), likes: 42, views: 530, replies: 5, tags: "backlogs, exams, engineering", category: "academics" }
  ],
  wellness: [
    { id: 105, title: "Deleted LinkedIn for a month. Best decision ever.", content: "Seeing everyone post 'I am thrilled to announce...' was destroying my self-esteem. I took a 30 day detox.", author_name: "Siddharth Menon", created_at: new Date().toISOString(), likes: 342, views: 1530, replies: 5, tags: "linkedin, mental-health, advice", category: "wellness" },
    { id: 106, title: "Is it okay to have no friends in 3rd year?", content: "I lost touch with my first year friend group. Now everyone has their solid cliques. I sit alone in the canteen and library.", author_name: "Kavya Singh", created_at: new Date().toISOString(), likes: 145, views: 940, replies: 5, tags: "lonely, friends, college", category: "wellness" }
  ],
  hostel: [
    { id: 107, title: "My roommate plays Valorant till 3 AM screaming.", content: "Guys I need advice. He screams in the mic. I have morning classes at 8 AM.", author_name: "Rahul Dravid", created_at: new Date().toISOString(), likes: 88, views: 612, replies: 5, tags: "hostel, roommates, sleep", category: "hostel" },
    { id: 108, title: "Homesickness is killing me. Miss my mom's food.", content: "It's my first month in the hostel. The mess food is terrible (dal looks like yellow water).", author_name: "Rishi Kumar", created_at: new Date().toISOString(), likes: 56, views: 432, replies: 5, tags: "hostel, homesick, food", category: "hostel" }
  ],
  coding: [
    { id: 109, title: "I solved 400 LC questions and still blanked in OA", content: "I've been grinding Leetcode since 2nd year. Yesterday was an OA and I literally blanked out on a simple sliding window problem.", author_name: "Aarav Mehta", created_at: new Date().toISOString(), likes: 203, views: 2100, replies: 5, tags: "leetcode, oa, burnout", category: "coding" },
    { id: 110, title: "Is open source actually helpful for jobs?", content: "Everyone on Twitter says 'contribute to open source'. But the codebases are massive.", author_name: "Omkar Naik", created_at: new Date().toISOString(), likes: 75, views: 850, replies: 5, tags: "open-source, jobs, github", category: "coding" }
  ],
  "student-life": [
    { id: 111, title: "How do you guys manage time for hobbies?", content: "Between 9 to 5 classes, assignments, and preparing for placements, I literally have zero time for playing guitar.", author_name: "Testing User", created_at: new Date().toISOString(), likes: 65, views: 540, replies: 5, tags: "time-management, hobbies", category: "student-life" },
    { id: 112, title: "College festivals are overrated.", content: "Unpopular opinion: College fests are just crowded, noisy, and way too expensive.", author_name: "Diya Kapoor", created_at: new Date().toISOString(), likes: 180, views: 1100, replies: 5, tags: "fests, introvert, college", category: "student-life" }
  ],
  general: [
    { id: 999, title: "Feature under development", content: "This category does not have any active posts yet.", author_name: "System", created_at: new Date().toISOString(), likes: 0, views: 0, replies: 0, tags: "system", category: "general" }
  ]
}

const categoryInfo = {
  placements: {
    name: "Placement & Careers",
    description: "Discuss OAs, interviews, resume reviews, and off-campus jobs",
    icon: "💼",
    memberCount: 2292,
    guidelines: [
      "Share genuine interview experiences",
      "Do not leak confidential OA questions directly",
      "Offer constructive feedback on resumes",
      "Keep compensation discussions respectful",
    ],
  },
  academics: {
    name: "Exams & Academics",
    description: "Semester exams, backlogs, attendance, and study tips",
    icon: "📚",
    memberCount: 1840,
    guidelines: [
      "Share helpful study resources and notes",
      "Do not promote academic dishonesty",
      "Offer support for students struggling with backlogs",
    ],
  },
  wellness: {
    name: "Mental Wellness",
    description: "Anxiety, burnout, imposter syndrome, and coping strategies",
    icon: "🧘",
    memberCount: 867,
    guidelines: [
      "This is a safe, judgment-free zone",
      "Avoid giving direct medical advice",
      "Use trigger warnings for sensitive topics",
      "Be empathetic and supportive",
    ],
  },
  hostel: {
    name: "Hostel Life",
    description: "Mess food, noisy roommates, homesickness, and survival tips",
    icon: "🏠",
    memberCount: 634,
    guidelines: [
      "Share practical survival tips for hostel living",
      "Respect the privacy of your roommates in stories",
      "Keep food reviews clean",
    ],
  },
  coding: {
    name: "Coding & Hackathons",
    description: "LeetCode, open source, projects, and hackathon teams",
    icon: "💻",
    memberCount: 3789,
    guidelines: [
      "Share coding resources and project ideas",
      "Help debug without insulting skill levels",
      "Post hackathon team-up requests clearly",
    ],
  },
  "student-life": {
    name: "Student Life",
    description: "Clubs, fests, hobbies, and balancing college life",
    icon: "🎸",
    memberCount: 1234,
    guidelines: [
      "Share club and fest experiences",
      "Discuss hobbies and work-life balance",
      "Keep campus gossip to a minimum",
    ],
  },
  general: {
    name: "General Discussion",
    description: "Feature under development",
    icon: "💬",
    memberCount: 0,
    guidelines: ["Be respectful"],
  },
}

function CategoryContent() {
  const params = useParams()
  const category = params.category as string
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewPost, setShowNewPost] = useState(false)
  const [posts, setPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    isAnonymous: true,
    tags: "",
  })

  const categoryData = categoryInfo[category as keyof typeof categoryInfo] || categoryInfo.general

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await api.get("/community")
        // Filter posts by category
        const filtered = data.filter((p: any) => p.category === category)
        if (filtered.length > 0) {
          setPosts(filtered)
        } else {
          // No backend posts for this category, use contextual fallback
          setPosts(categoryFallbackPosts[category] || categoryFallbackPosts.general)
        }
      } catch (err) {
        console.error("Failed to fetch backend posts, using fallbacks:", err)
        setPosts(categoryFallbackPosts[category] || categoryFallbackPosts.general)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPosts()
  }, [category])

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.tags && post.tags.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("New post:", newPost)
    setShowNewPost(false)
    setNewPost({ title: "", content: "", isAnonymous: true, tags: "" })
  }

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

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
                <ArrowLeft className="h-4 w-4 mr-1 inline" />
                Back to Forums
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-4xl">{categoryData.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{categoryData.name}</h1>
              <p className="text-muted-foreground">{categoryData.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>{categoryData.memberCount} members</span>
            <span>•</span>
            <span>{posts.length} posts</span>
            <span>•</span>
            <span>Moderated community</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts in this category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button onClick={() => setShowNewPost(!showNewPost)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Post
                </Button>
              </div>
            </div>

            {/* New Post Form */}
            {showNewPost && (
              <Card>
                <CardHeader>
                  <CardTitle>Create New Post</CardTitle>
                  <CardDescription>Share your thoughts, questions, or experiences with the community</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitPost} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="title" className="text-sm font-medium">
                        Title
                      </label>
                      <Input
                        id="title"
                        placeholder="What would you like to discuss?"
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="content" className="text-sm font-medium">
                        Content
                      </label>
                      <Textarea
                        id="content"
                        placeholder="Share your thoughts, experiences, or questions..."
                        value={newPost.content}
                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                        rows={6}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="tags" className="text-sm font-medium">
                        Tags (optional)
                      </label>
                      <Input
                        id="tags"
                        placeholder="e.g., placements, anxiety, leetcode"
                        value={newPost.tags}
                        onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="ghost" onClick={() => setShowNewPost(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Post to Community</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Posts List */}
            <div className="space-y-4">
              {isLoading ? (
                <div className="text-center py-8 text-muted-foreground">Loading community posts...</div>
              ) : filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                <Card key={post.id} className="hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {(post.tags ? post.tags.split(',') : []).map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag.trim()}
                            </Badge>
                          ))}
                        </div>
                        <Link href={`/forums/post/${post.id}`}>
                          <CardTitle className="text-lg hover:text-primary transition-colors cursor-pointer">
                            {post.title}
                          </CardTitle>
                        </Link>
                        <CardDescription className="mt-2 line-clamp-2">{post.content}</CardDescription>
                      </div>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs bg-primary/10 text-primary">
                              {post.author_name ? post.author_name.charAt(0) : "A"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-sm">
                            <span className="font-medium">{post.author_name || "Anonymous"}</span>
                            <span className="text-muted-foreground ml-2">{formatDate(post.created_at)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{post.views || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.replies || post.comments?.length || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.likes || 0}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))) : (
                <div className="text-center py-8 text-muted-foreground border rounded-lg bg-muted/20">
                  <p>No discussions found in this category.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Category Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Guidelines</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {categoryData.guidelines.map((guideline: string, index: number) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">{guideline}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Moderation Info */}
            <Alert className="border-primary/20 bg-primary/5">
              <Shield className="h-4 w-4 text-primary" />
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-medium text-sm">Safe Space Promise</p>
                  <p className="text-xs">
                    This forum is actively moderated 24/7. All posts are reviewed for community guidelines compliance.
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CategoryPage() {
  return (
    <ProtectedRoute>
      <CategoryContent />
    </ProtectedRoute>
  )
}
