import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Users,
  Shield,
  Clock,
  MessageCircle,
  BookOpen,
  Brain,
  Phone,
  ChevronRight,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-foreground">MindConnect</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-muted-foreground hover:text-primary transition-colors">
                Features
              </Link>
              <Link href="#resources" className="text-muted-foreground hover:text-primary transition-colors">
                Resources
              </Link>
              <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Button variant="outline" size="sm">
                Sign In
              </Button>
              <Button size="sm">Join Now</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            Breaking Mental Health Barriers
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Your Safe Space for Mental Health Support
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Connect with peers, access verified resources, and find the support you need. Anonymous, accessible, and
            available 24/7 across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              Join Community <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              Explore Resources
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Statistics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">The Mental Health Crisis in India</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Understanding the scale of the challenge we're addressing together
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-primary">150M</CardTitle>
                <CardDescription>People need mental healthcare</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Only 30 million are currently receiving treatment</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-primary">1 in 7</CardTitle>
                <CardDescription>Indians have a mental disorder</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">According to Global Burden of Disease Study 2017</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-primary">0.29</CardTitle>
                <CardDescription>Psychiatrists per 1 lakh population</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Severe shortage of mental health professionals</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Digital Solution</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Breaking down barriers with technology, community, and compassion
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mb-4" />
                <CardTitle>24/7 Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Available anytime, anywhere with internet connection</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Anonymous & Safe</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Pseudonymous profiles reduce stigma and encourage openness</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Peer Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Connect with others who understand your experiences</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Verified Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Centralized hub of professional help and information</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Platform Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need for mental health support in one secure platform
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <MessageCircle className="h-8 w-8 text-primary mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Peer Support Forums</h3>
                  <p className="text-muted-foreground mb-4">
                    Topic-based discussions for anxiety, depression, stress, grief, and LGBTQ+ support with anonymous
                    posting and robust moderation.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Anonymous Posting</Badge>
                    <Badge variant="outline">Moderated</Badge>
                    <Badge variant="outline">Topic-Based</Badge>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <BookOpen className="h-8 w-8 text-primary mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Resource Directory</h3>
                  <p className="text-muted-foreground mb-4">
                    Searchable directory of verified mental health professionals, NGOs, and support groups with location
                    and cost filters.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Verified Professionals</Badge>
                    <Badge variant="outline">Location Filters</Badge>
                    <Badge variant="outline">Cost Options</Badge>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <Brain className="h-8 w-8 text-primary mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Self-Help Tools</h3>
                  <p className="text-muted-foreground mb-4">
                    Mood tracker, private journaling, and guided breathing exercises for immediate relief and
                    self-management.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Mood Tracking</Badge>
                    <Badge variant="outline">Private Journal</Badge>
                    <Badge variant="outline">Breathing Exercises</Badge>
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <Phone className="h-8 w-8 text-primary mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Crisis Support</h3>
                  <p className="text-muted-foreground mb-4">
                    Always-visible emergency contacts and crisis intervention protocols to ensure immediate help when
                    needed.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">24/7 Helplines</Badge>
                    <Badge variant="outline">Crisis Protocols</Badge>
                    <Badge variant="outline">Emergency Contacts</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Privacy & Security */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Privacy & Security First</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your safety and privacy are our top priorities, with full compliance to Indian data protection laws
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center p-6">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">End-to-End Encryption</h3>
              <p className="text-muted-foreground">All data encrypted in transit and at rest</p>
            </Card>
            <Card className="text-center p-6">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Pseudonymous Profiles</h3>
              <p className="text-muted-foreground">No real names required for peer interactions</p>
            </Card>
            <Card className="text-center p-6">
              <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">DPDPA 2023 Compliant</h3>
              <p className="text-muted-foreground">Full compliance with Indian data protection laws</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of others in a supportive community where your mental health matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Create Account
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              Browse Resources
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30 border-t border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">MindConnect</span>
              </div>
              <p className="text-muted-foreground">Breaking barriers to mental health support across India.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Forums
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Self-Help Tools
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Crisis Helplines
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Community Guidelines
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Data Protection
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 MindConnect. All rights reserved. | Compliant with MHCA 2017 & DPDPA 2023</p>
          </div>
        </div>
      </footer>

      {/* Crisis Help Button - Always Visible */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-shadow">
          <Phone className="h-5 w-5 mr-2" />
          Crisis Help
        </Button>
      </div>
    </div>
  )
}
