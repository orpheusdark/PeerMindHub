"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, ArrowLeft, Flag, Bookmark, Share2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth/auth-context"
import { UnderDevelopmentModal } from "@/components/ui/under-development-modal"

// Fallback Mock Data
const fallbackPost = {
  id: "demo-1",
  title: "Exam Anxiety: Feeling completely frozen when trying to study for finals",
  content: "Is anyone else feeling completely frozen when trying to study for the DBMS final? I just sit there staring at the screen and my heart races. Any advice would be greatly appreciated.",
  author_name: "Sneha Iyer",
  category: "Exams",
  tags: "anxiety,exams",
  is_anonymous: false,
  likes: 42,
  views: 156,
  created_at: "2026-07-20T10:00:00Z"
}

const fallbackComments = [
  {
    id: 1,
    content: "I went through exactly this last semester. What helped me was studying for 25 minutes, then taking a 5-minute break. Don't look at the whole syllabus, just the next topic.",
    author_name: "Rahul Sharma",
    created_at: "2026-07-20T11:30:00Z",
    replies: [
      {
        id: 2,
        content: "I'll try the Pomodoro technique today. Thank you Rahul!",
        author_name: "Sneha Iyer",
        created_at: "2026-07-20T12:00:00Z"
      }
    ]
  },
  {
    id: 3,
    content: "Make sure you are drinking enough water and sleeping at least 6 hours. Sleep deprivation makes anxiety 10x worse.",
    author_name: "Aarav Mehta",
    created_at: "2026-07-20T14:15:00Z",
    replies: []
  }
]

export default function PostPage() {
  const params = useParams()
  const { user } = useAuth()
  const [post, setPost] = useState<any>(fallbackPost)
  const [comments, setComments] = useState<any[]>(fallbackComments)
  const [loading, setLoading] = useState(true)
  const [replyText, setReplyText] = useState("")

  useEffect(() => {
    // Attempt to fetch from real backend
    const fetchData = async () => {
      try {
        const postRes = await fetch(`https://peermindhub.onrender.com/community/${params.id}`)
        if (postRes.ok) {
          const postData = await postRes.json()
          setPost(postData)
        }
        
        const commentsRes = await fetch(`https://peermindhub.onrender.com/community/${params.id}/comments`)
        if (commentsRes.ok) {
          const commentsData = await commentsRes.json()
          // Simple grouping for parent/child replies if using real DB schema
          const parents = commentsData.filter((c: any) => !c.parent_id)
          parents.forEach((p: any) => {
            p.replies = commentsData.filter((c: any) => c.parent_id === p.id)
          })
          setComments(parents)
        }
      } catch (err) {
        console.warn("Backend unavailable, using realistic fallback data for demo.")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [params.id])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading post...</div>
  }

  const handleReplySubmit = () => {
    if (!replyText.trim()) return
    const newComment = {
      id: Date.now(),
      content: replyText,
      author_name: user ? user.name : "Demo User",
      created_at: new Date().toISOString(),
      replies: []
    }
    setComments([...comments, newComment])
    setReplyText("")
  }

  return (
    <div className="min-h-screen bg-muted/30 pb-12">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Link href="/forums/all" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Forums
        </Link>

        <Card className="mb-8 shadow-sm">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <Badge className="mb-3">{post.category}</Badge>
                <CardTitle className="text-2xl mb-2">{post.title}</CardTitle>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>{post.author_name?.charAt(0) || "A"}</AvatarFallback>
                  </Avatar>
                  <span>{post.author_name}</span>
                  <span>•</span>
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              <UnderDevelopmentModal featureName="Report Post">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                  <Flag className="h-4 w-4" />
                </Button>
              </UnderDevelopmentModal>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-base whitespace-pre-wrap leading-relaxed mb-6">
              {post.content}
            </p>
            {post.tags && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.split(",").map((tag: string) => (
                  <Badge key={tag} variant="secondary">#{tag.trim()}</Badge>
                ))}
              </div>
            )}
            <div className="flex items-center space-x-4 border-t pt-4">
              <Button variant="ghost" size="sm" className="hover:text-primary">
                <Heart className="mr-2 h-4 w-4" /> {post.likes}
              </Button>
              <Button variant="ghost" size="sm" className="hover:text-primary">
                <MessageCircle className="mr-2 h-4 w-4" /> {comments.length}
              </Button>
              <UnderDevelopmentModal featureName="Bookmark">
                <Button variant="ghost" size="sm" className="hover:text-primary">
                  <Bookmark className="mr-2 h-4 w-4" /> Bookmark
                </Button>
              </UnderDevelopmentModal>
              <UnderDevelopmentModal featureName="Share">
                <Button variant="ghost" size="sm" className="hover:text-primary">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
              </UnderDevelopmentModal>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <h3 className="text-xl font-semibold mb-6">Comments ({comments.length})</h3>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <Textarea 
              placeholder="Write a supportive reply..." 
              className="mb-4"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <div className="flex justify-end">
              <Button onClick={handleReplySubmit}>Post Reply</Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-background rounded-lg p-5 shadow-sm border border-border">
              <div className="flex items-start space-x-3 mb-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{comment.author_name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm">
                    <Link href={`/profile/${comment.author_name}`} className="hover:underline">
                      {comment.author_name}
                    </Link>
                  </div>
                  <div className="text-xs text-muted-foreground">{new Date(comment.created_at).toLocaleString()}</div>
                </div>
              </div>
              <p className="text-sm pl-11 mb-3">{comment.content}</p>
              
              <div className="pl-11 flex items-center space-x-3 mb-4">
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  <Heart className="mr-1 h-3 w-3" /> Like
                </Button>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  Reply
                </Button>
              </div>

              {/* Nested Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="pl-11 space-y-4 border-l-2 ml-4 mb-2">
                  {comment.replies.map((reply: any) => (
                    <div key={reply.id} className="pl-4">
                      <div className="flex items-start space-x-3 mb-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>{reply.author_name?.charAt(0) || "U"}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-xs">
                            <Link href={`/profile/${reply.author_name}`} className="hover:underline">
                              {reply.author_name}
                            </Link>
                          </div>
                          <div className="text-xs text-muted-foreground">{new Date(reply.created_at).toLocaleString()}</div>
                        </div>
                      </div>
                      <p className="text-sm pl-9">{reply.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
