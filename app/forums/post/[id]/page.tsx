"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Heart, MessageCircle, ArrowLeft, Flag, Bookmark, Share2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth/auth-context"
import { UnderDevelopmentModal } from "@/components/ui/under-development-modal"
import { api } from "@/lib/api"

// Context-aware fallback mock data mapping
const mockPostsData: Record<string, any> = {
  "101": {
    id: 101, title: "Rejected after 4 rounds at Google.", content: "I cleared the OA, two technical rounds, and the Googlyness round. Today I got the automated rejection email. I prepared for 6 months. I feel completely empty right now. Should I even bother applying off-campus?", author_name: "Arjun Kulkarni", category: "placements", tags: "rejections, google, interview", likes: 210, views: 2945, created_at: new Date().toISOString()
  },
  "102": {
    id: 102, title: "Is 6 LPA good for a fresher in Bangalore?", content: "I got a PPO from my internship but it's 6 LPA. My friends are holding out for 10+ LPA packages. But the market is so bad I'm scared to reject it.", author_name: "Simran Kaur", category: "placements", tags: "ppo, salary, bangalore", likes: 57, views: 1823, created_at: new Date().toISOString()
  },
  "103": {
    id: 103, title: "My attendance is 62%. Will medical certificates work?", content: "The college says minimum 75% is required or I'll get a backlog. Has anyone survived with 60%? Are HODs actually strict about this?", author_name: "Priyanshi Sharma", category: "academics", tags: "attendance, college, panic", likes: 94, views: 842, created_at: new Date().toISOString()
  },
  "104": {
    id: 104, title: "How to clear backlogs without losing your mind?", content: "I failed Engineering Drawing and M2 in my first year. Now I'm in 3rd year and the ATKT exams are clashing with my regular mid-sems. I'm completely overwhelmed.", author_name: "Kunal Verma", category: "academics", tags: "backlogs, exams, engineering", likes: 42, views: 530, created_at: new Date().toISOString()
  },
  "105": {
    id: 105, title: "Deleted LinkedIn for a month. Best decision ever.", content: "Seeing everyone post 'I am thrilled to announce...' was destroying my self-esteem. I took a 30 day detox. Stop comparing your behind-the-scenes with someone else's highlight reel.", author_name: "Siddharth Menon", category: "wellness", tags: "linkedin, mental-health, advice", likes: 342, views: 1530, created_at: new Date().toISOString()
  },
  "106": {
    id: 106, title: "Is it okay to have no friends in 3rd year?", content: "I lost touch with my first year friend group. Now everyone has their solid cliques. I sit alone in the canteen and library. It feels so isolating.", author_name: "Kavya Singh", category: "wellness", tags: "lonely, friends, college", likes: 145, views: 940, created_at: new Date().toISOString()
  },
  "107": {
    id: 107, title: "My roommate plays Valorant till 3 AM screaming.", content: "Guys I need advice. He screams in the mic. I have morning classes at 8 AM. I've tried talking to him nicely but he just says 'bro adjust karle'.", author_name: "Rahul Dravid", category: "hostel", tags: "hostel, roommates, sleep", likes: 88, views: 612, created_at: new Date().toISOString()
  },
  "108": {
    id: 108, title: "Homesickness is killing me. Miss my mom's food.", content: "It's my first month in the hostel. The mess food is terrible (dal looks like yellow water). I cry almost every night. How do you guys deal with this?", author_name: "Rishi Kumar", category: "hostel", tags: "hostel, homesick, food", likes: 56, views: 432, created_at: new Date().toISOString()
  },
  "109": {
    id: 109, title: "I solved 400 LC questions and still blanked in OA", content: "I've been grinding Leetcode since 2nd year. Yesterday was an OA and I literally blanked out on a simple sliding window problem. Am I just not meant for coding?", author_name: "Aarav Mehta", category: "coding", tags: "leetcode, oa, burnout", likes: 203, views: 2100, created_at: new Date().toISOString()
  },
  "110": {
    id: 110, title: "Is open source actually helpful for jobs?", content: "Everyone on Twitter says 'contribute to open source'. But the codebases are massive and I can't even figure out how to setup the local environment.", author_name: "Omkar Naik", category: "coding", tags: "open-source, jobs, github", likes: 75, views: 850, created_at: new Date().toISOString()
  },
  "111": {
    id: 111, title: "How do you guys manage time for hobbies?", content: "Between 9 to 5 classes, assignments, and preparing for placements, I literally have zero time for playing guitar. Anyone found a balance?", author_name: "Testing User", category: "student-life", tags: "time-management, hobbies", likes: 65, views: 540, created_at: new Date().toISOString()
  },
  "112": {
    id: 112, title: "College festivals are overrated.", content: "Unpopular opinion: College fests are just crowded, noisy, and way too expensive. I'd rather stay in my room and watch Netflix.", author_name: "Diya Kapoor", category: "student-life", tags: "fests, introvert, college", likes: 180, views: 1100, created_at: new Date().toISOString()
  }
}

const mockCommentsData: Record<string, any[]> = {
  "101": [
    { id: 1, content: "I also got rejected after the second technical round last month. It honestly felt terrible for a few days. Ask the recruiter for feedback!", author_name: "Testing User", created_at: new Date().toISOString(), replies: [{ id: 2, content: "Bro same 😂 Well, not Google, but Amazon.", author_name: "Aarav Mehta", created_at: new Date().toISOString() }] },
    { id: 3, content: "Take a few days off. Don't look at Leetcode. You're burnt out and grieving the opportunity.", author_name: "Sneha Iyer", created_at: new Date().toISOString(), replies: [] },
    { id: 4, content: "Which graphs question did they ask in Round 2? Was it DP?", author_name: "Yash Desai", created_at: new Date().toISOString(), replies: [] }
  ],
  "102": [
    { id: 1, content: "Accept it. A bird in the hand is worth two in the bush. Market is brutal right now.", author_name: "Arjun Kulkarni", created_at: new Date().toISOString(), replies: [] },
    { id: 2, content: "6 LPA in BLR? You'll be spending 15k just on a PG in Koramangala or HSR.", author_name: "Harsh Trivedi", created_at: new Date().toISOString(), replies: [{ id: 3, content: "Exactly. The rent is insane.", author_name: "Diya Kapoor", created_at: new Date().toISOString() }] }
  ],
  "103": [
    { id: 1, content: "I had attendance shortage too last semester. Went to the HOD with my parents and a medical certificate. He approved it but shouted a lot.", author_name: "Kunal Verma", created_at: new Date().toISOString(), replies: [] },
    { id: 2, content: "Just proxy bro. Why didn't you ask your roommates?", author_name: "Rahul Dravid", created_at: new Date().toISOString(), replies: [] }
  ],
  "104": [
    { id: 1, content: "M2 is a nightmare. I cleared it after 3 attempts. Just practice previous year papers.", author_name: "Priyanshi Sharma", created_at: new Date().toISOString(), replies: [] },
    { id: 2, content: "Use YouTube. Gajendra Purohit for Math. Literally saved my degree.", author_name: "Aryan Rao", created_at: new Date().toISOString(), replies: [] }
  ],
  "105": [
    { id: 1, content: "This advice actually worked for me. I deactivated my account last week.", author_name: "Kavya Singh", created_at: new Date().toISOString(), replies: [] },
    { id: 2, content: "Bro same 😂 'I am humbled to drink water today...'", author_name: "Dev Patel", created_at: new Date().toISOString(), replies: [] }
  ],
  "106": [
    { id: 1, content: "I am exactly in the same situation. I just put my headphones on and pretend I'm busy. It hurts sometimes.", author_name: "Siddharth Menon", created_at: new Date().toISOString(), replies: [] },
    { id: 2, content: "Join a club! It's the easiest way to meet people with similar interests in 3rd year.", author_name: "Diya Kapoor", created_at: new Date().toISOString(), replies: [] }
  ],
  "107": [
    { id: 1, content: "My roommate is exactly like this. I had to complain to the warden to change my room.", author_name: "Rishi Kumar", created_at: new Date().toISOString(), replies: [] },
    { id: 2, content: "Buy good earplugs. Or disconnect the WiFi router at 1 AM. 😂", author_name: "Ananya Desai", created_at: new Date().toISOString(), replies: [] }
  ],
  "108": [
    { id: 1, content: "The first month is the hardest. You'll get used to the terrible food. Find a good local Maggi spot.", author_name: "Rahul Dravid", created_at: new Date().toISOString(), replies: [] },
    { id: 2, content: "It's completely normal to cry. Allow yourself to feel it. Call your parents every evening.", author_name: "Sneha Iyer", created_at: new Date().toISOString(), replies: [] }
  ],
  "109": [
    { id: 1, content: "It's performance anxiety, not a skill issue. You know the concepts. Doing it under a timer is different.", author_name: "Yash Desai", created_at: new Date().toISOString(), replies: [] },
    { id: 2, content: "Don't beat yourself up. OAs are getting ridiculously hard. Companies are asking CP level questions.", author_name: "Simran Kaur", created_at: new Date().toISOString(), replies: [] }
  ],
  "110": [
    { id: 1, content: "Yes! I got my internship through an open source contribution. Don't start with big repos like React.", author_name: "Krishna Joshi", created_at: new Date().toISOString(), replies: [] },
    { id: 2, content: "The environment setup is the hardest part. Look for 'good first issue' labels.", author_name: "Meera Reddy", created_at: new Date().toISOString(), replies: [] }
  ],
  "111": [
    { id: 1, content: "You don't find time, you make time. Block 30 minutes before sleeping just for guitar.", author_name: "Diya Kapoor", created_at: new Date().toISOString(), replies: [] },
    { id: 2, content: "I usually finish assignments during boring lectures. Frees up my evening.", author_name: "Priya Shah", created_at: new Date().toISOString(), replies: [] }
  ],
  "112": [
    { id: 1, content: "This! 💯 The food stalls overcharge for everything.", author_name: "Ananya Desai", created_at: new Date().toISOString(), replies: [] },
    { id: 2, content: "I only go for the free merchandise at the sponsor booths. 😂", author_name: "Harsh Trivedi", created_at: new Date().toISOString(), replies: [] }
  ]
}

const defaultFallback = {
  id: "demo-default", title: "Feature under development", content: "This post could not be loaded or does not exist.", author_name: "System", category: "general", tags: "system", likes: 0, views: 0, created_at: new Date().toISOString()
}

export default function PostPage() {
  const params = useParams()
  const postId = params.id as string
  const { user } = useAuth()
  const [post, setPost] = useState<any>(null)
  const [comments, setComments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [replyText, setReplyText] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await api.get(`/community/${postId}`)
        setPost(postData)
      } catch (err) {
        setPost(mockPostsData[postId] || defaultFallback)
      }
        
      try {
        const commentsData = await api.get(`/community/${postId}/comments`)
        const parents = commentsData.filter((c: any) => !c.parent_id)
        parents.forEach((p: any) => {
          p.replies = commentsData.filter((c: any) => c.parent_id === p.id)
        })
        setComments(parents)
      } catch (err) {
        setComments(mockCommentsData[postId] || [])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [postId])

  if (loading || !post) {
    return <div className="min-h-screen flex items-center justify-center">Loading post...</div>
  }

  const handleReplySubmit = () => {
    if (!replyText.trim()) return
    const newComment = {
      id: Date.now(),
      content: replyText,
      author_name: user ? user.name : "Testing User",
      created_at: new Date().toISOString(),
      replies: []
    }
    setComments([...comments, newComment])
    setReplyText("")
  }

  return (
    <div className="min-h-screen bg-muted/30 pb-12">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Link href={`/forums/${post.category || 'general'}`} className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {post.category || 'Forums'}
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
              <div className="flex-1" />
              <UnderDevelopmentModal featureName="Bookmark">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </UnderDevelopmentModal>
              <UnderDevelopmentModal featureName="Share">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Share2 className="h-4 w-4" />
                </Button>
              </UnderDevelopmentModal>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold flex items-center">
            <MessageCircle className="mr-2 h-5 w-5" />
            Comments ({comments.length})
          </h3>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <Textarea
                placeholder="Share your thoughts..."
                className="mb-4"
                rows={3}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Posting as {user ? user.name : "Testing User"}
                </span>
                <Button onClick={handleReplySubmit}>Post Comment</Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id} className="shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{comment.author_name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{comment.author_name}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(comment.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/90">{comment.content}</p>
                      <div className="flex items-center space-x-2 pt-2">
                        <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-muted-foreground hover:text-primary">
                          Reply
                        </Button>
                        <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-muted-foreground hover:text-primary">
                          <Heart className="h-3 w-3 mr-1 inline" /> Like
                        </Button>
                      </div>

                      {/* Nested Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-4 space-y-3 pl-4 border-l-2 border-muted">
                          {comment.replies.map((reply: any) => (
                            <div key={reply.id} className="flex items-start space-x-3">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">{reply.author_name?.charAt(0) || "U"}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-xs">{reply.author_name}</span>
                                  <span className="text-[10px] text-muted-foreground">
                                    {new Date(reply.created_at).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-sm text-foreground/90">{reply.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
