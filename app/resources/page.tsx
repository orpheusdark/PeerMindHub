"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ProtectedRoute } from "@/components/auth/protected-route"
import {
  Heart,
  Search,
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  BookOpen,
  Users,
  Building,
  GraduationCap,
  Clock,
  DollarSign,
  Languages,
  Shield,
  AlertTriangle,
  ExternalLink,
  Verified,
} from "lucide-react"
import Link from "next/link"

// Mock data for mental health professionals
const professionals = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    title: "Clinical Psychologist",
    specializations: ["Anxiety Disorders", "Depression", "Trauma Therapy"],
    location: "Vadodara, Gujarat",
    languages: ["Hindi", "English", "Gujarati"],
    experience: "8 years",
    rating: 4.8,
    reviewCount: 124,
    costRange: "₹800-1200 per session",
    availability: "Available",
    isVerified: true,
    phone: "+91 98765 43210",
    email: "dr.priya@example.com",
    website: "www.drpriyasharma.com",
    description:
      "Specialized in cognitive behavioral therapy with extensive experience in treating anxiety and depression.",
    qualifications: ["M.A. Psychology", "Ph.D. Clinical Psychology", "RCI Licensed"],
  },
  {
    id: "2",
    name: "Dr. Rajesh Patel",
    title: "Psychiatrist",
    specializations: ["Bipolar Disorder", "Schizophrenia", "Medication Management"],
    location: "Ahmedabad, Gujarat",
    languages: ["Hindi", "English", "Gujarati"],
    experience: "12 years",
    rating: 4.9,
    reviewCount: 89,
    costRange: "₹1000-1500 per session",
    availability: "Limited slots",
    isVerified: true,
    phone: "+91 98765 43211",
    email: "dr.rajesh@example.com",
    website: "www.drrajeshpatel.com",
    description: "Board-certified psychiatrist specializing in severe mental health conditions and medication therapy.",
    qualifications: ["MBBS", "MD Psychiatry", "MRCPsych"],
  },
  {
    id: "3",
    name: "Ms. Anjali Desai",
    title: "Licensed Counselor",
    specializations: ["Relationship Counseling", "Family Therapy", "Stress Management"],
    location: "Vadodara, Gujarat",
    languages: ["Hindi", "English", "Gujarati"],
    experience: "5 years",
    rating: 4.6,
    reviewCount: 67,
    costRange: "₹600-900 per session",
    availability: "Available",
    isVerified: true,
    phone: "+91 98765 43212",
    email: "anjali@example.com",
    website: "www.anjalidesai.com",
    description: "Compassionate counselor focusing on relationship dynamics and family mental health.",
    qualifications: ["M.A. Counseling Psychology", "Licensed Professional Counselor"],
  },
]

// Mock data for NGOs and support groups
const organizations = [
  {
    id: "1",
    name: "Mind Matters Gujarat",
    type: "NGO",
    focus: ["Mental Health Awareness", "Community Support", "Crisis Intervention"],
    location: "Vadodara, Gujarat",
    contact: "+91 98765 00001",
    email: "info@mindmattersgujarati.org",
    website: "www.mindmattersgujarati.org",
    description: "Leading mental health NGO providing free counseling and awareness programs across Gujarat.",
    services: ["Free Counseling", "Support Groups", "Awareness Workshops", "Crisis Helpline"],
    isVerified: true,
  },
  {
    id: "2",
    name: "Gujarat Mental Health Support Group",
    type: "Support Group",
    focus: ["Peer Support", "Group Therapy", "Recovery Programs"],
    location: "Ahmedabad, Gujarat",
    contact: "+91 98765 00002",
    email: "support@gmhsg.org",
    website: "www.gmhsg.org",
    description: "Peer-led support groups for individuals dealing with various mental health challenges.",
    services: ["Weekly Support Groups", "Peer Mentoring", "Recovery Programs", "Family Support"],
    isVerified: true,
  },
]

// Mock data for educational resources
const educationalResources = [
  {
    id: "1",
    title: "Understanding Anxiety: A Complete Guide",
    type: "Article",
    category: "Anxiety",
    readTime: "8 min read",
    author: "Dr. Mental Health Team",
    description: "Comprehensive guide to understanding anxiety disorders, symptoms, and coping strategies.",
    url: "/resources/articles/understanding-anxiety",
  },
  {
    id: "2",
    title: "Meditation for Mental Health",
    type: "Video",
    category: "Self-Help",
    readTime: "15 min watch",
    author: "Mindfulness Expert",
    description: "Guided meditation techniques specifically designed for mental health improvement.",
    url: "/resources/videos/meditation-mental-health",
  },
  {
    id: "3",
    title: "Depression: Myths vs Facts",
    type: "FAQ",
    category: "Depression",
    readTime: "5 min read",
    author: "Clinical Team",
    description: "Common misconceptions about depression debunked with scientific facts.",
    url: "/resources/faqs/depression-myths-facts",
  },
]

function ResourcesContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [specializationFilter, setSpecializationFilter] = useState("all")
  const [costFilter, setCostFilter] = useState("all")
  const [languageFilter, setLanguageFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("professionals")

  const filteredProfessionals = professionals.filter((prof) => {
    const matchesSearch =
      prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prof.specializations.some((spec) => spec.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesLocation = locationFilter === "all" || prof.location.includes(locationFilter)
    const matchesSpecialization =
      specializationFilter === "all" || prof.specializations.some((spec) => spec.includes(specializationFilter))
    const matchesLanguage = languageFilter === "all" || prof.languages.includes(languageFilter)

    return matchesSearch && matchesLocation && matchesSpecialization && matchesLanguage
  })

  const filteredOrganizations = organizations.filter((org) => {
    const matchesSearch =
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.focus.some((focus) => focus.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesLocation = locationFilter === "all" || org.location.includes(locationFilter)

    return matchesSearch && matchesLocation
  })

  const filteredEducational = educationalResources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = specializationFilter === "all" || resource.category.includes(specializationFilter)

    return matchesSearch && matchesCategory
  })

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
                Forums
              </Link>
              <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link href="/profile" className="text-muted-foreground hover:text-primary transition-colors">
                Profile
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Mental Health Resources</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find verified mental health professionals, support organizations, and educational resources in your area.
          </p>
        </div>

        {/* Emergency Alert */}
        <Alert className="mb-8 border-destructive/20 bg-destructive/5">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <span>
                <strong>Crisis Support:</strong> If you're in immediate danger, call emergency services (112) or contact
                a crisis helpline immediately.
              </span>
              <Button size="sm" variant="destructive">
                Crisis Helplines
              </Button>
            </div>
          </AlertDescription>
        </Alert>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Search Resources</span>
            </CardTitle>
            <CardDescription>Find the right mental health support for your needs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search professionals, organizations, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Vadodara">Vadodara</SelectItem>
                  <SelectItem value="Ahmedabad">Ahmedabad</SelectItem>
                  <SelectItem value="Surat">Surat</SelectItem>
                  <SelectItem value="Rajkot">Rajkot</SelectItem>
                </SelectContent>
              </Select>
              <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specializations</SelectItem>
                  <SelectItem value="Anxiety">Anxiety Disorders</SelectItem>
                  <SelectItem value="Depression">Depression</SelectItem>
                  <SelectItem value="Trauma">Trauma Therapy</SelectItem>
                  <SelectItem value="Relationship">Relationship Counseling</SelectItem>
                  <SelectItem value="Family">Family Therapy</SelectItem>
                </SelectContent>
              </Select>
              <Select value={languageFilter} onValueChange={setLanguageFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Gujarati">Gujarati</SelectItem>
                </SelectContent>
              </Select>
              <Select value={costFilter} onValueChange={setCostFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Cost Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ranges</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="low">₹500-800</SelectItem>
                  <SelectItem value="medium">₹800-1200</SelectItem>
                  <SelectItem value="high">₹1200+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Resource Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="professionals">Professionals</TabsTrigger>
            <TabsTrigger value="organizations">Organizations</TabsTrigger>
            <TabsTrigger value="educational">Educational</TabsTrigger>
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
          </TabsList>

          {/* Mental Health Professionals */}
          <TabsContent value="professionals" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">Mental Health Professionals</h2>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {filteredProfessionals.length} verified professionals
              </Badge>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProfessionals.map((professional) => (
                <Card key={professional.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <CardTitle className="text-lg">{professional.name}</CardTitle>
                          {professional.isVerified && (
                            <Badge variant="secondary" className="bg-primary/10 text-primary">
                              <Verified className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="text-sm">{professional.title}</CardDescription>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{professional.rating}</span>
                          <span className="text-sm text-muted-foreground">({professional.reviewCount} reviews)</span>
                        </div>
                      </div>
                      <Badge
                        variant={professional.availability === "Available" ? "secondary" : "outline"}
                        className={
                          professional.availability === "Available" ? "bg-primary/10 text-primary" : "text-orange-600"
                        }
                      >
                        {professional.availability}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{professional.description}</p>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {professional.specializations.map((spec) => (
                          <Badge key={spec} variant="outline" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{professional.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>{professional.costRange}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <GraduationCap className="h-4 w-4 text-muted-foreground" />
                          <span>{professional.experience}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Languages className="h-4 w-4 text-muted-foreground" />
                          <span>{professional.languages.join(", ")}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        <Phone className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Globe className="h-4 w-4 mr-2" />
                        Website
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        View Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Organizations */}
          <TabsContent value="organizations" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">NGOs & Support Groups</h2>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {filteredOrganizations.length} verified organizations
              </Badge>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredOrganizations.map((org) => (
                <Card key={org.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <CardTitle className="text-lg">{org.name}</CardTitle>
                          {org.isVerified && (
                            <Badge variant="secondary" className="bg-primary/10 text-primary">
                              <Verified className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {org.type}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{org.description}</p>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {org.focus.map((focus) => (
                          <Badge key={focus} variant="outline" className="text-xs">
                            {focus}
                          </Badge>
                        ))}
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{org.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{org.contact}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{org.email}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-medium text-sm">Services:</h4>
                        <div className="flex flex-wrap gap-1">
                          {org.services.map((service) => (
                            <Badge key={service} variant="secondary" className="text-xs bg-muted">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        <Phone className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Globe className="h-4 w-4 mr-2" />
                        Website
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Educational Resources */}
          <TabsContent value="educational" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">Educational Resources</h2>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {filteredEducational.length} resources
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEducational.map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Badge variant="outline" className="text-xs mb-2">
                          {resource.type}
                        </Badge>
                        <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                        <CardDescription className="text-sm mt-2">{resource.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{resource.readTime}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs bg-muted">
                        {resource.category}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">By {resource.author}</div>
                    <Button size="sm" className="w-full">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Read More
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Emergency Resources */}
          <TabsContent value="emergency" className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-foreground mb-2">Emergency Mental Health Resources</h2>
              <p className="text-muted-foreground">Immediate help when you need it most</p>
            </div>

            <Alert className="border-destructive/20 bg-destructive/5">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-medium">If you are in immediate danger or having thoughts of self-harm:</p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>
                      • Call emergency services: <strong>112</strong> (India Emergency Number)
                    </li>
                    <li>• Go to your nearest emergency room</li>
                    <li>• Contact a trusted friend, family member, or mental health professional</li>
                  </ul>
                </div>
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-destructive" />
                    <span>Crisis Helplines</span>
                  </CardTitle>
                  <CardDescription>24/7 support for mental health crises</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">AASRA</p>
                        <p className="text-sm text-muted-foreground">24/7 Crisis Helpline</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono font-medium">022-27546669</p>
                        <Button size="sm" className="mt-1">
                          Call Now
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Vandrevala Foundation</p>
                        <p className="text-sm text-muted-foreground">Mental Health Helpline</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono font-medium">9999 666 555</p>
                        <Button size="sm" className="mt-1">
                          Call Now
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Sneha Foundation</p>
                        <p className="text-sm text-muted-foreground">Suicide Prevention</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono font-medium">044-24640050</p>
                        <Button size="sm" className="mt-1">
                          Call Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5 text-primary" />
                    <span>Emergency Services</span>
                  </CardTitle>
                  <CardDescription>Immediate professional help</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Emergency Services</p>
                        <p className="text-sm text-muted-foreground">Police, Fire, Medical</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono font-medium text-destructive">112</p>
                        <Button size="sm" variant="destructive" className="mt-1">
                          Call Now
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Mental Health Helpline</p>
                        <p className="text-sm text-muted-foreground">Government Helpline</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono font-medium">08046110007</p>
                        <Button size="sm" className="mt-1">
                          Call Now
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Nearest Hospital</p>
                        <p className="text-sm text-muted-foreground">Emergency psychiatric care</p>
                      </div>
                      <div className="text-right">
                        <Button size="sm" variant="outline" className="bg-transparent">
                          Find Nearby
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>What to Expect When You Call</CardTitle>
                <CardDescription>Information about crisis helpline support</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h4 className="font-medium mb-1">Confidential</h4>
                    <p className="text-sm text-muted-foreground">Your call is private and confidential</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h4 className="font-medium mb-1">Trained Support</h4>
                    <p className="text-sm text-muted-foreground">Speak with trained crisis counselors</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h4 className="font-medium mb-1">24/7 Available</h4>
                    <p className="text-sm text-muted-foreground">Help is available anytime, day or night</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function ResourcesPage() {
  return (
    <ProtectedRoute>
      <ResourcesContent />
    </ProtectedRoute>
  )
}
