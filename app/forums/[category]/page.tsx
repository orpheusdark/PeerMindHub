"use client"

import type React from "react"

import { useState } from "react"
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
  Send,
  Shield,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock data for posts in a category
const mockPosts = [
  {
    id: "1",
    title: "How do you cope with morning anxiety?",
    content:
      "I've been struggling with intense anxiety every morning for the past few months. It makes it hard to start my day. Has anyone found techniques that help?",
    author: {
      displayName: "MorningWarrior",
      isAnonymous: true,
      joinDate: "2 months ago",
    },
    createdAt: "2 hours ago",
    replies: 12,
    likes: 8,
    views: 45,
    isSticky: false,
    tags: ["anxiety", "morning", "coping"],
  },
  {
    id: "2",
    title: "Breathing exercises that actually work",
    content:
      "I wanted to share some breathing techniques that have really helped me manage my anxiety attacks. The 4-7-8 technique has been a game changer...",
    author: {
      displayName: "BreathingBuddy",
      isAnonymous: true,
      joinDate: "6 months ago",
    },
    createdAt: "4 hours ago",
    replies: 23,
    likes: 34,
    views: 156,
    isSticky: true,
    tags: ["breathing", "techniques", "helpful"],
  },
  {
    id: "3",
    title: "Anxiety at work - need advice",
    content:
      "My job has been triggering a lot of anxiety lately. I'm worried about performance reviews and feel like I'm constantly being judged. Any advice?",
    author: {
      displayName: "WorkStressed",
      isAnonymous: true,
      joinDate: "1 month ago",
    },
    createdAt: "6 hours ago",
    replies: 7,
    likes: 5,
    views: 28,
    isSticky: false,
    tags: ["work", "performance", "advice"],
  },
]

const categoryInfo = {
  anxiety: {
    name: "Anxiety Support",
    description: "Share experiences and coping strategies for anxiety disorders",
    icon: "🌊",
    memberCount: 892,
    guidelines: [
      "Share your experiences openly and honestly",
      "Offer support and encouragement to others",
      "Avoid giving medical advice - share what works for you",
      "Respect different coping strategies and experiences",
    ],
  },
  depression: {
    name: "Depression Support",
    description: "A safe space to discuss depression and mood disorders",
    icon: "🌱",
    memberCount: 1340,
    guidelines: [
      "This is a judgment-free zone for sharing experiences",
      "Support others with empathy and understanding",
      "Share resources and coping strategies that help you",
      "Remember that recovery looks different for everyone",
    ],
  },
  // Add other categories as needed
}

function CategoryContent() {
  const params = useParams()
  const category = params.category as string
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewPost, setShowNewPost] = useState(false)
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    isAnonymous: true,
    tags: "",
  })

  const categoryData = categoryInfo[category as keyof typeof categoryInfo] || categoryInfo.anxiety

  const filteredPosts = mockPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement post submission
    console.log("New post:", newPost)
    setShowNewPost(false)
    setNewPost({ title: "", content: "", isAnonymous: true, tags: "" })
  }

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
            <span>{mockPosts.length} posts</span>
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
                        placeholder="anxiety, coping, work (separate with commas)"
                        value={newPost.tags}
                        onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="anonymous"
                          checked={newPost.isAnonymous}
                          onChange={(e) => setNewPost({ ...newPost, isAnonymous: e.target.checked })}
                          className="rounded"
                        />
                        <label htmlFor="anonymous" className="text-sm">
                          Post anonymously
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <Button type="button" variant="outline" onClick={() => setShowNewPost(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">
                          <Send className="h-4 w-4 mr-2" />
                          Post
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Posts List */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {post.isSticky && (
                            <Badge variant="secondary" className="bg-primary/10 text-primary">
                              Pinned
                            </Badge>
                          )}
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Link href={`/forums/${category}/${post.id}`}>
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
                              {post.author.displayName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-sm">
                            <span className="font-medium">{post.author.displayName}</span>
                            <span className="text-muted-foreground ml-2">{post.createdAt}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.replies}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                {categoryData.guidelines.map((guideline, index) => (
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

export default function CategoryPage() {
  return (
    <ProtectedRoute>
      <CategoryContent />
    </ProtectedRoute>
  )
}
