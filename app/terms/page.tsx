import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, AlertTriangle, BookOpen, Users, Scale } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl space-y-8 animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
          <p className="text-lg text-muted-foreground">
            Please read these terms carefully before using PeerMindHub.
          </p>
          <p className="text-sm text-muted-foreground mt-2">Last updated: July 2026</p>
        </div>

        <Card className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-900 dark:text-red-400">
              <AlertTriangle className="h-6 w-6" />
              1. Medical & Emergency Disclaimer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-red-800 dark:text-red-300">
            <p className="font-semibold">
              PeerMindHub is an educational and supportive tool. It does NOT provide medical diagnoses, psychiatric care, or professional therapy.
            </p>
            <p>
              The AI recommendations, mood tracking, and resources provided are for educational and self-management purposes only. 
              Always seek the advice of your physician or other qualified health providers with any questions you may have regarding a medical condition. 
              <strong> If you are in a crisis, please call your local emergency helpline immediately.</strong>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-6 w-6 text-primary" />
              2. Acceptance of Terms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              By accessing and using PeerMindHub, a student mental wellness platform, you agree to comply with and be bound by these Terms of Service. 
              If you do not agree with any part of these terms, you must not use our services.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              3. Community Guidelines & User-Generated Content
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              PeerMindHub fosters an anonymous community for peer support. You agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Treat all members with respect and empathy.</li>
              <li>Not post hate speech, harassment, or malicious content.</li>
              <li>Not share personally identifiable information (PII) of yourself or others in public forums.</li>
            </ul>
            <p>
              We reserve the right to remove any user-generated content and terminate accounts that violate these community standards.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              4. Service Availability & AI Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Our AI Assistant and sentiment analysis features rely on third-party APIs (such as Google Gemini). 
              While we strive for 100% uptime, we do not guarantee uninterrupted access to these services. 
              Furthermore, AI-generated responses are automated and may occasionally produce inaccurate or unexpected results.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              5. Data Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Your use of PeerMindHub is also governed by our Privacy Policy, which details how we handle your data in compliance with the Indian Digital Personal Data Protection Act (DPDPA).
            </p>
          </CardContent>
        </Card>

        <div className="text-center mt-12 text-muted-foreground">
          <p>For legal inquiries or support, contact our team at:</p>
          <a href="mailto:legal@peermindhub.example.com" className="text-primary hover:underline font-medium">legal@peermindhub.example.com</a>
        </div>
      </div>
    </div>
  )
}
