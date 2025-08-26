"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Shield, Users, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Heart className="h-8 w-8 text-primary" />
            <span className="font-bold text-2xl text-foreground">PeerMindHub</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Terms of Service</h1>
          <p className="text-muted-foreground mt-2">Demo Platform - Last updated: January 2025</p>
        </div>

        {/* Demo Notice */}
        <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-800 dark:text-amber-200">Demo Platform Notice</h3>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  This is a demonstration platform created for educational and showcase purposes only. No real user data
                  is collected or stored permanently.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Terms Sections */}
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>1. Acceptance of Terms</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                By accessing and using PeerMindHub (demo platform), you accept and agree to be bound by these Terms of
                Service. This platform is provided for demonstration purposes only.
              </p>
              <p className="text-muted-foreground">
                If you do not agree to these terms, please do not use this platform.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>2. Demo Platform Limitations</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">This is a demonstration platform with the following limitations:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>No real mental health services are provided</li>
                <li>User data is stored locally and may be cleared</li>
                <li>Features are for demonstration purposes only</li>
                <li>No actual peer support or professional services</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. User Conduct</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Even in a demo environment, users agree to:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Use the platform respectfully</li>
                <li>Not share personal identifying information</li>
                <li>Understand this is not a real support platform</li>
                <li>Not rely on this platform for actual mental health needs</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Privacy and Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">For this demo platform:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Data is stored locally in your browser</li>
                <li>No data is transmitted to external servers</li>
                <li>Demo data may be cleared at any time</li>
                <li>No real personal information should be entered</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Medical Disclaimer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground font-semibold">
                IMPORTANT: This is a demo platform and provides no real medical or mental health services.
              </p>
              <p className="text-muted-foreground">
                If you need actual mental health support, please contact qualified healthcare professionals or crisis
                helplines in your area.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                This demo platform is provided "as is" without warranties. The creators are not liable for any issues
                arising from use of this demonstration.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Back to Sign Up */}
        <div className="text-center pt-6">
          <Link href="/auth/signup" className="text-primary hover:underline font-medium">
            ← Back to Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
