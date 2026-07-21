"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, Phone, MessageCircle, Globe, Clock, AlertTriangle, Users } from "lucide-react"
import Link from "next/link"

export default function CrisisHelplinesPage() {
  const emergencyServices = [
    {
      name: "National Emergency",
      number: "112",
      description: "All emergency services",
      available: "24/7",
      type: "emergency",
    },
    {
      name: "Police",
      number: "100",
      description: "Police emergency",
      available: "24/7",
      type: "emergency",
    },
    {
      name: "Medical Emergency",
      number: "108",
      description: "Ambulance services",
      available: "24/7",
      type: "emergency",
    },
  ]

  const mentalHealthHelplines = [
    {
      name: "Vandrevala Foundation",
      number: "9999 666 555",
      description: "24x7 mental health support in multiple languages",
      available: "24/7",
      languages: ["Hindi", "English", "Tamil", "Telugu"],
      type: "mental-health",
    },
    {
      name: "AASRA",
      number: "91-9820466726",
      description: "Suicide prevention and emotional support",
      available: "24/7",
      languages: ["Hindi", "English"],
      type: "mental-health",
    },
    {
      name: "Sneha Foundation",
      number: "044-24640050",
      description: "Emotional support and suicide prevention",
      available: "24/7",
      languages: ["Tamil", "English"],
      type: "mental-health",
    },
    {
      name: "Sumaitri",
      number: "011-23389090",
      description: "Delhi-based emotional support",
      available: "2 PM - 10 PM",
      languages: ["Hindi", "English"],
      type: "mental-health",
    },
    {
      name: "Parivarthan",
      number: "080-25497777",
      description: "Bangalore-based counseling support",
      available: "24/7",
      languages: ["Kannada", "English", "Hindi"],
      type: "mental-health",
    },
    {
      name: "Roshni",
      number: "040-66202000",
      description: "Hyderabad-based emotional support",
      available: "11 AM - 9 PM",
      languages: ["Telugu", "Hindi", "English"],
      type: "mental-health",
    },
  ]

  const onlineResources = [
    {
      name: "YourDOST",
      url: "https://yourdost.com",
      description: "Online counseling and emotional wellness",
      type: "chat",
    },
    {
      name: "BetterHelp India",
      url: "https://betterhelp.com",
      description: "Professional online therapy",
      type: "therapy",
    },
    {
      name: "Manastha",
      url: "https://manastha.com",
      description: "Mental health platform in regional languages",
      type: "platform",
    },
  ]

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
              <Link href="/tools" className="text-muted-foreground hover:text-primary transition-colors">
                Tools
              </Link>
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
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Crisis Support & Helplines</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Immediate support is available. You are not alone - reach out for help when you need it.
          </p>
        </div>

        {/* Emergency Alert */}
        <Alert className="mb-8 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>
              If you are in immediate danger or having thoughts of self-harm, please call emergency services (112) or go
              to your nearest emergency room immediately.
            </strong>
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Emergency Services */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-600">
                  <Phone className="h-5 w-5" />
                  <span>Emergency Services</span>
                </CardTitle>
                <CardDescription>For immediate life-threatening emergencies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {emergencyServices.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50"
                  >
                    <div>
                      <h4 className="font-semibold text-red-800">{service.name}</h4>
                      <p className="text-sm text-red-600">{service.description}</p>
                    </div>
                    <div className="text-right">
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        <Phone className="h-4 w-4 mr-2" />
                        {service.number}
                      </Button>
                      <p className="text-xs text-red-600 mt-1">{service.available}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Online Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <span>Online Support</span>
                </CardTitle>
                <CardDescription>Digital mental health resources</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {onlineResources.map((resource, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                  >
                    <div>
                      <h4 className="font-semibold">{resource.name}</h4>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Visit
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Mental Health Helplines */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Mental Health Helplines</span>
                </CardTitle>
                <CardDescription>Professional emotional support and counseling</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mentalHealthHelplines.map((helpline, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{helpline.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{helpline.description}</p>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{helpline.available}</span>
                        </div>
                      </div>
                      <Button size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        {helpline.number}
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {helpline.languages.map((lang, langIndex) => (
                        <Badge key={langIndex} variant="secondary" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Resources */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Important Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <h4 className="font-medium">When to Call</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Thoughts of self-harm or suicide</li>
                  <li>• Overwhelming anxiety or panic</li>
                  <li>• Severe depression or hopelessness</li>
                  <li>• Substance abuse crisis</li>
                  <li>• Domestic violence situation</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">What to Expect</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Trained counselors available</li>
                  <li>• Confidential and non-judgmental</li>
                  <li>• Multiple language support</li>
                  <li>• Free of charge services</li>
                  <li>• Referrals to local resources</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
