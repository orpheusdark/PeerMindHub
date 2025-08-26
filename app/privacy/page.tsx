import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Shield, Download, Trash2, Eye, Lock, AlertTriangle } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Privacy & Data Controls</h1>
          <p className="text-muted-foreground">
            Manage your privacy settings and control how your data is used on our platform.
          </p>
        </div>

        <div className="space-y-6">
          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Privacy Settings
              </CardTitle>
              <CardDescription>Control your visibility and data sharing preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="profile-visibility">Profile Visibility</Label>
                  <p className="text-sm text-muted-foreground">Allow other users to see your pseudonymous profile</p>
                </div>
                <Switch id="profile-visibility" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="forum-participation">Forum Participation</Label>
                  <p className="text-sm text-muted-foreground">Show your posts and comments in public forums</p>
                </div>
                <Switch id="forum-participation" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="analytics">Anonymous Analytics</Label>
                  <p className="text-sm text-muted-foreground">Help improve our platform with anonymous usage data</p>
                </div>
                <Switch id="analytics" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="crisis-monitoring">Crisis Support Monitoring</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow our system to detect crisis situations and offer immediate help
                  </p>
                </div>
                <Switch id="crisis-monitoring" defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Data Management
              </CardTitle>
              <CardDescription>Export or delete your personal data in compliance with DPDPA 2023</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Download className="h-5 w-5 text-blue-600" />
                  <div>
                    <h3 className="font-medium">Export Your Data</h3>
                    <p className="text-sm text-muted-foreground">
                      Download all your personal data in a portable format
                    </p>
                  </div>
                </div>
                <Button variant="outline">Export Data</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg border-red-200">
                <div className="flex items-center gap-3">
                  <Trash2 className="h-5 w-5 text-red-600" />
                  <div>
                    <h3 className="font-medium text-red-900">Delete Account</h3>
                    <p className="text-sm text-red-700">Permanently delete your account and all associated data</p>
                  </div>
                </div>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>

          {/* Crisis Protocols */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-900">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Crisis Support Protocols
              </CardTitle>
              <CardDescription>How we detect and respond to mental health crises</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-medium text-orange-900 mb-2">Automated Crisis Detection</h3>
                <p className="text-sm text-orange-800 mb-3">
                  Our system monitors for crisis indicators in posts and messages to provide immediate support.
                </p>
                <ul className="text-sm text-orange-800 space-y-1">
                  <li>• Keywords indicating self-harm or suicidal thoughts</li>
                  <li>• Expressions of hopelessness or despair</li>
                  <li>• Requests for immediate help</li>
                </ul>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-900 mb-2">Immediate Response</h3>
                <p className="text-sm text-green-800 mb-3">When crisis indicators are detected, we immediately:</p>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Display crisis helpline numbers</li>
                  <li>• Offer connection to trained counselors</li>
                  <li>• Provide safety planning resources</li>
                  <li>• Alert our moderation team for human review</li>
                </ul>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Emergency Contacts</h3>
                  <p className="text-sm text-muted-foreground">
                    Quick access to crisis helplines and emergency services
                  </p>
                </div>
                <Button variant="outline">View Contacts</Button>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Data Protection Compliance
              </CardTitle>
              <CardDescription>Our commitment to protecting your privacy under Indian law</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm max-w-none">
                <h4 className="font-medium">DPDPA 2023 Compliance</h4>
                <p className="text-muted-foreground">
                  We comply with the Digital Personal Data Protection Act, 2023, ensuring your personal data is:
                </p>
                <ul className="text-muted-foreground">
                  <li>Processed lawfully and transparently</li>
                  <li>Collected for specified, explicit purposes</li>
                  <li>Kept secure with appropriate technical measures</li>
                  <li>Retained only as long as necessary</li>
                </ul>

                <h4 className="font-medium mt-4">Your Rights</h4>
                <p className="text-muted-foreground">Under DPDPA 2023, you have the right to:</p>
                <ul className="text-muted-foreground">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Erase your data</li>
                  <li>Grievance redressal</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
