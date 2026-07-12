import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Shield, Eye, Lock, Database, UserCheck, AlertTriangle } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl space-y-8 animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground">
            How PeerMindHub protects your data and ensures your privacy.
          </p>
          <p className="text-sm text-muted-foreground mt-2">Last updated: July 2026</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              1. Our Commitment to Your Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              At <strong>PeerMindHub</strong>, an AI-powered student mental wellness platform, your privacy is our highest priority. We understand the sensitive nature of mental health data. This policy outlines how we collect, use, and protect your information, inspired by GDPR principles and in strict compliance with the Indian Digital Personal Data Protection Act (DPDPA).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-6 w-6 text-primary" />
              2. Data We Collect & Storage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>We securely store the following data in our encrypted databases:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Account Information:</strong> Email, username, and profile details you provide.</li>
              <li><strong>Journal Privacy:</strong> Journal entries are private by default. They are processed securely for AI sentiment analysis but are never shared.</li>
              <li><strong>Mood Tracking:</strong> Historical mood logs to help you visualize wellness trends.</li>
              <li><strong>User-Generated Content:</strong> Anonymous community posts and comments.</li>
              <li><strong>Cookies:</strong> Essential cookies are used to maintain your logged-in session.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-6 w-6 text-primary" />
              3. AI Recommendations & Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              PeerMindHub uses artificial intelligence to provide personalized wellness recommendations and sentiment analysis. 
              Your data is processed anonymously by our AI models to suggest coping mechanisms, breathing exercises, or relevant resources. 
              <strong> We do not use your private journal entries to train our public AI models.</strong>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-6 w-6 text-primary" />
              4. Your Rights & Account Deletion
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>You have full control over your data. Under the DPDPA, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access, update, or correct your personal information at any time.</li>
              <li>Request a complete export of your data.</li>
              <li><strong>Account Deletion:</strong> You can permanently delete your account and all associated data from our servers. Once deleted, this action cannot be undone.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-900">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
              5. Emergency Disclaimer & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-orange-800">
            <p>
              While we use industry-standard security (bcrypt hashing, JWT authentication, and SSL/TLS encryption) to protect your data, 
              <strong> PeerMindHub is not a substitute for professional medical help.</strong> 
              In case of a medical emergency or severe distress, please immediately contact local emergency services or a crisis helpline.
            </p>
          </CardContent>
        </Card>

        <div className="text-center mt-12 text-muted-foreground">
          <p>If you have any questions about this Privacy Policy, please contact our Data Protection Officer at:</p>
          <a href="mailto:privacy@peermindhub.example.com" className="text-primary hover:underline font-medium">privacy@peermindhub.example.com</a>
        </div>
      </div>
    </div>
  )
}
