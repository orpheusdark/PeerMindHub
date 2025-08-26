"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Eye, EyeOff, Shield, AlertTriangle, Info, Loader2 } from "lucide-react"
import Link from "next/link"

export default function SignUpPage() {
  const router = useRouter()
  const { signUp, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
    bio: "",
    agreeToTerms: false,
    agreeToPrivacy: false,
    consentToDataUse: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    if (!formData.agreeToTerms || !formData.agreeToPrivacy || !formData.consentToDataUse) {
      setError("Please agree to all terms and conditions")
      return
    }

    try {
      await signUp({
        email: formData.email,
        password: formData.password,
        displayName: formData.displayName,
        bio: formData.bio,
      })

      // Redirect to dashboard after successful signup
      router.push("/dashboard")
    } catch (err) {
      setError("Failed to create account. Please try again.")
      console.error("Signup error:", err)
    }
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Heart className="h-8 w-8 text-primary" />
            <span className="font-bold text-2xl text-foreground">MindConnect</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Create Your Account</h1>
          <p className="text-muted-foreground mt-2">Join our supportive community with complete privacy protection</p>
        </div>

        {/* Demo Login Notice */}
        <Alert className="border-blue-200 bg-blue-50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription>
            <strong>Demo Testing:</strong> For quick testing, you can use these demo accounts or create a new one:
            <div className="mt-2 space-y-1 text-sm">
              <div>
                <strong>Patient:</strong> patient@demo.com / password123
              </div>
              <div>
                <strong>Counselor:</strong> counselor@demo.com / password123
              </div>
              <div>
                <strong>Admin:</strong> admin@demo.com / password123
              </div>
            </div>
            <Link href="/auth/signin" className="inline-block mt-2 text-blue-600 hover:underline font-medium">
              → Go to Sign In for quick demo access
            </Link>
          </AlertDescription>
        </Alert>

        {/* Privacy Notice */}
        <Alert className="border-primary/20 bg-primary/5">
          <Shield className="h-4 w-4 text-primary" />
          <AlertDescription>
            <strong>Demo Platform:</strong> This is a demonstration platform. Your data is stored locally and no real
            services are provided.
          </AlertDescription>
        </Alert>

        {/* Error Alert */}
        {error && (
          <Alert className="border-destructive/20 bg-destructive/5">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Sign Up Form */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Create your secure, anonymous account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Account Info */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={isLoading}
                  />
                  <p className="text-xs text-muted-foreground">
                    Used only for account recovery and important notifications
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Pseudonymous Profile */}
              <div className="space-y-4 border-t pt-6">
                <div className="flex items-center space-x-2">
                  <Info className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">Pseudonymous Profile (Optional)</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Create a display name and bio for community interactions. Real names are never required.
                </p>

                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name (Optional)</Label>
                  <Input
                    id="displayName"
                    type="text"
                    placeholder="Choose a pseudonym (e.g., SupportSeeker, MindfulJourney)"
                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    disabled={isLoading}
                  />
                  <p className="text-xs text-muted-foreground">
                    This will be visible to other community members. You can change this anytime.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio (Optional)</Label>
                  <Textarea
                    id="bio"
                    placeholder="Share what you're comfortable with about your journey or interests..."
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={3}
                    disabled={isLoading}
                  />
                  <p className="text-xs text-muted-foreground">
                    Keep it general - avoid personal identifying information
                  </p>
                </div>
              </div>

              {/* Consent and Terms */}
              <div className="space-y-4 border-t pt-6">
                <h3 className="font-medium">Consent and Agreement</h3>

                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                      required
                      disabled={isLoading}
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed">
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/community-guidelines" className="text-primary hover:underline">
                        Community Guidelines
                      </Link>
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="privacy"
                      checked={formData.agreeToPrivacy}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreeToPrivacy: checked as boolean })}
                      required
                      disabled={isLoading}
                    />
                    <Label htmlFor="privacy" className="text-sm leading-relaxed">
                      I have read and agree to the{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>{" "}
                      (Demo platform - no real data collection)
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="consent"
                      checked={formData.consentToDataUse}
                      onCheckedChange={(checked) => setFormData({ ...formData, consentToDataUse: checked as boolean })}
                      required
                      disabled={isLoading}
                    />
                    <Label htmlFor="consent" className="text-sm leading-relaxed">
                      I understand this is a demo platform and consent to local data storage for demonstration purposes
                    </Label>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Important Disclaimers */}
        <Alert className="border-destructive/20 bg-destructive/5">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <AlertDescription>
            <strong>Medical Disclaimer:</strong> This platform provides peer support and educational resources only. It
            is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of
            qualified health providers with questions about medical conditions.
          </AlertDescription>
        </Alert>

        <Alert className="border-primary/20 bg-primary/5">
          <Shield className="h-4 w-4 text-primary" />
          <AlertDescription>
            <strong>Crisis Support:</strong> If you are experiencing a mental health crisis or having thoughts of
            self-harm, please contact emergency services immediately or call a crisis helpline. This platform is not
            equipped for crisis intervention.
          </AlertDescription>
        </Alert>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-primary hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
