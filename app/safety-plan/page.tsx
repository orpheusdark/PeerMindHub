"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Shield, Plus, Trash2, Save, Download } from "lucide-react"

export default function SafetyPlanPage() {
  const [warningSignsInput, setWarningSignsInput] = useState("")
  const [warningSigns, setWarningSigns] = useState<string[]>([])
  const [copingStrategies, setCopingStrategies] = useState<string[]>([])
  const [supportContacts, setSupportContacts] = useState<{ name: string; phone: string; relationship: string }[]>([])
  const [professionalContacts, setProfessionalContacts] = useState<{ name: string; phone: string; type: string }[]>([])
  const [safeEnvironment, setSafeEnvironment] = useState("")
  const [reasonsToLive, setReasonsToLive] = useState<string[]>([])

  const addWarningSign = () => {
    if (warningSignsInput.trim()) {
      setWarningSigns([...warningSigns, warningSignsInput.trim()])
      setWarningSignsInput("")
    }
  }

  const addCopingStrategy = (strategy: string) => {
    if (strategy.trim()) {
      setCopingStrategies([...copingStrategies, strategy.trim()])
    }
  }

  const addSupportContact = () => {
    setSupportContacts([...supportContacts, { name: "", phone: "", relationship: "" }])
  }

  const addProfessionalContact = () => {
    setProfessionalContacts([...professionalContacts, { name: "", phone: "", type: "" }])
  }

  const addReasonToLive = (reason: string) => {
    if (reason.trim()) {
      setReasonsToLive([...reasonsToLive, reason.trim()])
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            Personal Safety Plan
          </h1>
          <p className="text-muted-foreground">
            Create a personalized plan to help you stay safe during difficult times. This plan is private and stored
            securely.
          </p>
        </div>

        <div className="space-y-6">
          {/* Step 1: Warning Signs */}
          <Card>
            <CardHeader>
              <CardTitle>Step 1: Recognize Warning Signs</CardTitle>
              <CardDescription>
                Identify thoughts, feelings, or behaviors that indicate you might be entering a crisis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., feeling hopeless, isolating from friends..."
                  value={warningSignsInput}
                  onChange={(e) => setWarningSignsInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addWarningSign()}
                />
                <Button onClick={addWarningSign}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {warningSigns.map((sign, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                    <span>{sign}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setWarningSigns(warningSigns.filter((_, i) => i !== index))}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Coping Strategies */}
          <Card>
            <CardHeader>
              <CardTitle>Step 2: Coping Strategies</CardTitle>
              <CardDescription>Things you can do on your own to help yourself feel better</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Deep breathing exercises",
                  "Listen to calming music",
                  "Take a warm bath",
                  "Go for a walk",
                  "Write in a journal",
                  "Practice meditation",
                  "Watch a favorite movie",
                  "Pet an animal",
                ].map((strategy) => (
                  <Button
                    key={strategy}
                    variant="outline"
                    className="justify-start h-auto p-3 bg-transparent"
                    onClick={() => addCopingStrategy(strategy)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {strategy}
                  </Button>
                ))}
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Your Coping Strategies:</h4>
                {copingStrategies.map((strategy, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded">
                    <span>{strategy}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCopingStrategies(copingStrategies.filter((_, i) => i !== index))}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step 3: Support Contacts */}
          <Card>
            <CardHeader>
              <CardTitle>Step 3: People Who Can Help</CardTitle>
              <CardDescription>Trusted friends and family members you can reach out to</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={addSupportContact} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Support Contact
              </Button>

              {supportContacts.map((contact, index) => (
                <div key={index} className="grid grid-cols-3 gap-2 p-3 border rounded">
                  <Input
                    placeholder="Name"
                    value={contact.name}
                    onChange={(e) => {
                      const updated = [...supportContacts]
                      updated[index].name = e.target.value
                      setSupportContacts(updated)
                    }}
                  />
                  <Input
                    placeholder="Phone"
                    value={contact.phone}
                    onChange={(e) => {
                      const updated = [...supportContacts]
                      updated[index].phone = e.target.value
                      setSupportContacts(updated)
                    }}
                  />
                  <Input
                    placeholder="Relationship"
                    value={contact.relationship}
                    onChange={(e) => {
                      const updated = [...supportContacts]
                      updated[index].relationship = e.target.value
                      setSupportContacts(updated)
                    }}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Step 4: Professional Contacts */}
          <Card>
            <CardHeader>
              <CardTitle>Step 4: Professional Support</CardTitle>
              <CardDescription>Mental health professionals and crisis services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={addProfessionalContact} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Professional Contact
              </Button>

              {professionalContacts.map((contact, index) => (
                <div key={index} className="grid grid-cols-3 gap-2 p-3 border rounded">
                  <Input
                    placeholder="Name/Service"
                    value={contact.name}
                    onChange={(e) => {
                      const updated = [...professionalContacts]
                      updated[index].name = e.target.value
                      setProfessionalContacts(updated)
                    }}
                  />
                  <Input
                    placeholder="Phone"
                    value={contact.phone}
                    onChange={(e) => {
                      const updated = [...professionalContacts]
                      updated[index].phone = e.target.value
                      setProfessionalContacts(updated)
                    }}
                  />
                  <Input
                    placeholder="Type (Therapist, Crisis Line, etc.)"
                    value={contact.type}
                    onChange={(e) => {
                      const updated = [...professionalContacts]
                      updated[index].type = e.target.value
                      setProfessionalContacts(updated)
                    }}
                  />
                </div>
              ))}

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Emergency Contacts (Always Available):</h4>
                <div className="space-y-1 text-sm text-blue-800">
                  <div>National Suicide Prevention: 9152987821</div>
                  <div>AASRA: 9820466726</div>
                  <div>Emergency Services: 112</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 5: Safe Environment */}
          <Card>
            <CardHeader>
              <CardTitle>Step 5: Making Your Environment Safe</CardTitle>
              <CardDescription>Steps to remove or limit access to means of self-harm</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="e.g., Remove harmful objects, ask someone to hold medications, avoid certain places..."
                value={safeEnvironment}
                onChange={(e) => setSafeEnvironment(e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Step 6: Reasons to Live */}
          <Card>
            <CardHeader>
              <CardTitle>Step 6: Reasons for Living</CardTitle>
              <CardDescription>Things that are important to you and give your life meaning</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {[
                  "My family needs me",
                  "My pets depend on me",
                  "Future goals and dreams",
                  "People I want to help",
                  "Experiences I want to have",
                  "My faith/spirituality",
                ].map((reason) => (
                  <Button
                    key={reason}
                    variant="outline"
                    className="justify-start h-auto p-3 bg-transparent"
                    onClick={() => addReasonToLive(reason)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {reason}
                  </Button>
                ))}
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Your Reasons to Live:</h4>
                {reasonsToLive.map((reason, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                    <span>{reason}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setReasonsToLive(reasonsToLive.filter((_, i) => i !== index))}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Save Actions */}
          <div className="flex gap-4">
            <Button className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save Safety Plan
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
