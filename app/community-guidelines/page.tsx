import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Heart, Shield, Users, MessageCircle, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

export default function CommunityGuidelinesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
              <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Community Guidelines</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our guidelines ensure a safe, supportive, and respectful environment for everyone seeking mental health
              support.
            </p>
          </div>

          {/* Core Principles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-primary" />
                <span>Our Core Principles</span>
              </CardTitle>
              <CardDescription>The foundation of our supportive community</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3 p-4 border rounded-lg">
                  <Shield className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Safety First</h3>
                    <p className="text-sm text-muted-foreground">
                      We prioritize the emotional and psychological safety of all community members.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 border rounded-lg">
                  <Users className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Mutual Support</h3>
                    <p className="text-sm text-muted-foreground">
                      We support each other through shared experiences and understanding.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 border rounded-lg">
                  <MessageCircle className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Respectful Communication</h3>
                    <p className="text-sm text-muted-foreground">
                      All interactions should be kind, respectful, and non-judgmental.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 border rounded-lg">
                  <CheckCircle className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Peer Support Only</h3>
                    <p className="text-sm text-muted-foreground">
                      We share experiences, not professional medical advice.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What's Encouraged */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-6 w-6 text-primary" />
                <span>What We Encourage</span>
              </CardTitle>
              <CardDescription>Behaviors that strengthen our community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">Sharing & Support</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Share your personal experiences and journey</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Offer emotional support and encouragement</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Share coping strategies that work for you</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Ask questions and seek support when needed</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">Community Building</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Welcome new members warmly</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Celebrate others' progress and milestones</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Use content warnings for sensitive topics</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Respect different perspectives and experiences</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What's Not Allowed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <XCircle className="h-6 w-6 text-destructive" />
                <span>What's Not Allowed</span>
              </CardTitle>
              <CardDescription>Behaviors that can harm our community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-destructive">Harmful Content</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span>Detailed descriptions of self-harm methods</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span>Pro-eating disorder or pro-self-harm content</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span>Graphic descriptions of trauma or violence</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span>Suicide methods or encouragement</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-destructive">Inappropriate Behavior</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span>Providing medical advice or diagnoses</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span>Harassment, bullying, or personal attacks</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span>Sharing personal identifying information</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span>Spam, advertising, or promotional content</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Crisis Situations */}
          <Alert className="border-destructive/20 bg-destructive/5">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertDescription>
              <div className="space-y-3">
                <h3 className="font-semibold">Crisis Situations</h3>
                <p className="text-sm">
                  If you or someone else is in immediate danger or having thoughts of self-harm, please:
                </p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Contact emergency services (911) immediately</li>
                  <li>• Call a crisis helpline for immediate support</li>
                  <li>• Reach out to a trusted friend, family member, or mental health professional</li>
                </ul>
                <p className="text-sm font-medium">
                  Our community forums are not equipped for crisis intervention and should not be used as a substitute
                  for professional help.
                </p>
              </div>
            </AlertDescription>
          </Alert>

          {/* Moderation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-primary" />
                <span>Moderation & Enforcement</span>
              </CardTitle>
              <CardDescription>How we maintain a safe community</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <Badge variant="secondary" className="bg-primary/10 text-primary mb-2">
                    24/7 Monitoring
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Our moderation team reviews all posts and comments around the clock.
                  </p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Badge variant="secondary" className="bg-primary/10 text-primary mb-2">
                    Community Reports
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Members can report content that violates our guidelines for quick review.
                  </p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Badge variant="secondary" className="bg-primary/10 text-primary mb-2">
                    Fair Process
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    All moderation actions follow a fair and transparent process with appeals.
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">Consequences for Violations</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="text-xs">
                      1st Warning
                    </Badge>
                    <span>Educational message and content removal</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="text-xs">
                      2nd Warning
                    </Badge>
                    <span>Temporary posting restrictions (24-48 hours)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="text-xs">
                      3rd Warning
                    </Badge>
                    <span>Extended suspension (1-7 days)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="destructive" className="text-xs">
                      Severe Violations
                    </Badge>
                    <span>Immediate permanent ban for harmful content</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Questions or Concerns?</CardTitle>
              <CardDescription>We're here to help maintain a safe community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="flex-1 bg-transparent">
                  Report Content
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Contact Moderators
                </Button>
                <Button className="flex-1">Appeal Decision</Button>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground">
            <p>By participating in our community, you agree to follow these guidelines. Last updated: January 2024</p>
          </div>
        </div>
      </div>
    </div>
  )
}
