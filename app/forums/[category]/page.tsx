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

const mockPosts = [
  {
    id: "1",
    title: "How do you cope with morning anxiety?",
    content:
      "I've been struggling with intense anxiety every morning for the past few months. It makes it hard to start my day. Has anyone found techniques that help? मुझे सुबह बहुत चिंता होती है।",
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
    title: "Breathing exercises that actually work - प्राणायाम techniques",
    content:
      "I wanted to share some breathing techniques that have really helped me manage my anxiety attacks. The 4-7-8 technique has been a game changer, and combining it with traditional pranayama has been amazing...",
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
    tags: ["breathing", "techniques", "helpful", "pranayama"],
  },
  {
    id: "3",
    title: "Anxiety at work - need advice for IT job stress",
    content:
      "My job at a tech company has been triggering a lot of anxiety lately. I'm worried about performance reviews and feel like I'm constantly being judged. The work culture is very demanding. Any advice from fellow IT professionals?",
    author: {
      displayName: "TechStressed",
      isAnonymous: true,
      joinDate: "1 month ago",
    },
    createdAt: "6 hours ago",
    replies: 18,
    likes: 15,
    views: 89,
    isSticky: false,
    tags: ["work", "performance", "advice", "tech"],
  },
  {
    id: "4",
    title: "Dealing with family pressure about marriage - need support",
    content:
      "I'm 28 and my family is constantly pressuring me about getting married. It's causing me severe anxiety and depression. How do I handle this cultural pressure while taking care of my mental health?",
    author: {
      displayName: "FamilyStruggles",
      isAnonymous: true,
      joinDate: "3 weeks ago",
    },
    createdAt: "1 day ago",
    replies: 31,
    likes: 42,
    views: 203,
    isSticky: false,
    tags: ["family", "marriage", "pressure", "cultural"],
  },
  {
    id: "5",
    title: "JEE/NEET preparation anxiety - students please help",
    content:
      "I'm preparing for JEE and the pressure is overwhelming. My parents have high expectations and I'm scared of disappointing them. The competition is so intense. How do other students cope with this stress?",
    author: {
      displayName: "StudyStressed",
      isAnonymous: true,
      joinDate: "2 weeks ago",
    },
    createdAt: "1 day ago",
    replies: 27,
    likes: 38,
    views: 167,
    isSticky: false,
    tags: ["students", "jee", "neet", "pressure", "competition"],
  },
  {
    id: "6",
    title: "Mumbai therapists - affordable options?",
    content:
      "Can anyone recommend good and affordable therapists in Mumbai? I've been looking but most are quite expensive. Are there any government or NGO options that provide quality mental health services?",
    author: {
      displayName: "MumbaiSeeker",
      isAnonymous: true,
      joinDate: "1 week ago",
    },
    createdAt: "2 days ago",
    replies: 19,
    likes: 25,
    views: 134,
    isSticky: false,
    tags: ["mumbai", "therapy", "affordable", "resources"],
  },
  {
    id: "7",
    title: "Working from home depression - post-COVID struggles",
    content:
      "Since COVID, I've been working from home and it's really affecting my mental health. I feel isolated and unmotivated. The boundaries between work and personal life have completely blurred. Anyone else experiencing this?",
    author: {
      displayName: "WFHBlues",
      isAnonymous: true,
      joinDate: "5 months ago",
    },
    createdAt: "3 days ago",
    replies: 44,
    likes: 67,
    views: 298,
    isSticky: true,
    tags: ["wfh", "covid", "isolation", "depression"],
  },
  {
    id: "8",
    title: "Meditation apps in Hindi - recommendations?",
    content:
      "I want to start meditating but most apps are in English. Can anyone recommend good meditation apps or resources in Hindi? I find it easier to relax when guided in my native language.",
    author: {
      displayName: "HindiMeditation",
      isAnonymous: true,
      joinDate: "4 days ago",
    },
    createdAt: "4 days ago",
    replies: 16,
    likes: 22,
    views: 87,
    isSticky: false,
    tags: ["meditation", "hindi", "apps", "language"],
  },
]

const categoryInfo = {
  anxiety: {
    name: "चिंता सहायता (Anxiety Support)",
    description: "चिंता विकारों के लिए अनुभव और सामना करने की रणनीतियां साझा करें",
    icon: "🌊",
    memberCount: 1892,
    guidelines: [
      "Share your experiences openly and honestly",
      "Offer support and encouragement to others",
      "Avoid giving medical advice - share what works for you",
      "Respect different coping strategies and experiences",
      "Use trigger warnings when discussing sensitive topics",
    ],
  },
  depression: {
    name: "अवसाद सहायता (Depression Support)",
    description: "अवसाद और मूड विकारों पर चर्चा के लिए एक सुरक्षित स्थान",
    icon: "🌱",
    memberCount: 2340,
    guidelines: [
      "This is a judgment-free zone for sharing experiences",
      "Support others with empathy and understanding",
      "Share resources and coping strategies that help you",
      "Remember that recovery looks different for everyone",
      "Celebrate small victories and progress",
    ],
  },
  stress: {
    name: "तनाव प्रबंधन (Stress Management)",
    description: "दैनिक तनाव को संभालने की तकनीकें और सहायता",
    icon: "🧘",
    memberCount: 1567,
    guidelines: [
      "Share practical stress management techniques",
      "Discuss work-life balance strategies",
      "Support others in finding healthy coping mechanisms",
      "Share resources for relaxation and mindfulness",
    ],
  },
  family: {
    name: "पारिवारिक समस्याएं (Family Issues)",
    description: "पारिवारिक रिश्तों और घरेलू समस्याओं के लिए सहायता",
    icon: "👨‍👩‍👧‍👦",
    memberCount: 1234,
    guidelines: [
      "Respect cultural differences in family dynamics",
      "Share experiences with family-related stress",
      "Offer support for relationship challenges",
      "Maintain confidentiality and respect privacy",
    ],
  },
  "work-stress": {
    name: "कार्यक्षेत्र तनाव (Workplace Stress)",
    description: "नौकरी और करियर संबंधी तनाव की चर्चा",
    icon: "💼",
    memberCount: 1789,
    guidelines: [
      "Share workplace mental health strategies",
      "Discuss career-related anxiety and stress",
      "Support others in work-life balance",
      "Share resources for professional development",
    ],
  },
  students: {
    name: "छात्र सहायता (Student Support)",
    description: "शैक्षणिक दबाव और करियर चिंताओं के लिए सहायता",
    icon: "📚",
    memberCount: 2567,
    guidelines: [
      "Support fellow students with academic stress",
      "Share study techniques and coping strategies",
      "Discuss exam anxiety and performance pressure",
      "Celebrate academic achievements and progress",
    ],
  },
  women: {
    name: "महिला स्वास्थ्य (Women's Mental Health)",
    description: "महिलाओं के मानसिक स्वास्थ्य के मुद्दों पर चर्चा",
    icon: "👩",
    memberCount: 1456,
    guidelines: [
      "Create a safe space for women's experiences",
      "Discuss gender-specific mental health challenges",
      "Support each other through life transitions",
      "Share resources for women's mental wellness",
    ],
  },
  general: {
    name: "सामान्य चर्चा (General Discussion)",
    description: "मानसिक स्वास्थ्य और कल्याण पर खुली चर्चा",
    icon: "💬",
    memberCount: 3190,
    guidelines: [
      "Welcome all mental health discussions",
      "Share general wellness tips and resources",
      "Support community building and connection",
      "Maintain respectful and inclusive dialogue",
    ],
  },
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

  const categoryData = categoryInfo[category as keyof typeof categoryInfo] || categoryInfo.general

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
            <span>{filteredPosts.length} posts</span>
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

export default function CategoryPage() {
  return (
    <ProtectedRoute>
      <CategoryContent />
    </ProtectedRoute>
  )
}
