"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Phone, MessageCircle, Heart, ExternalLink } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface CrisisInterventionProps {
  triggerWords?: string[]
  userMessage?: string
}

export function CrisisIntervention({ triggerWords = [], userMessage = "" }: CrisisInterventionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [severity, setSeverity] = useState<"low" | "medium" | "high">("medium")

  // Crisis detection keywords
  const crisisKeywords = {
    high: ["suicide", "kill myself", "end it all", "not worth living", "want to die"],
    medium: ["hopeless", "can't go on", "give up", "no point", "hurt myself"],
    low: ["depressed", "anxious", "overwhelmed", "struggling", "help me"],
  }

  useEffect(() => {
    if (userMessage) {
      const message = userMessage.toLowerCase()

      // Check for high-severity keywords
      if (crisisKeywords.high.some((keyword) => message.includes(keyword))) {
        setSeverity("high")
        setIsVisible(true)
      }
      // Check for medium-severity keywords
      else if (crisisKeywords.medium.some((keyword) => message.includes(keyword))) {
        setSeverity("medium")
        setIsVisible(true)
      }
      // Check for low-severity keywords
      else if (crisisKeywords.low.some((keyword) => message.includes(keyword))) {
        setSeverity("low")
        setIsVisible(true)
      }
    }
  }, [userMessage])

  if (!isVisible) return null

  const emergencyContacts = [
    {
      name: "National Suicide Prevention Helpline",
      number: "9152987821",
      available: "24/7",
      type: "call",
    },
    {
      name: "AASRA Suicide Prevention",
      number: "9820466726",
      available: "24/7",
      type: "call",
    },
    {
      name: "Vandrevala Foundation",
      number: "9999666555",
      available: "24/7",
      type: "call",
    },
    {
      name: "iCall Psychosocial Helpline",
      number: "9152987821",
      available: "Mon-Sat, 8AM-10PM",
      type: "call",
    },
  ]

  const getAlertVariant = () => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "default"
      default:
        return "default"
    }
  }

  const getAlertMessage = () => {
    switch (severity) {
      case "high":
        return "We're concerned about your safety. Please reach out for immediate help."
      case "medium":
        return "It sounds like you're going through a difficult time. Support is available."
      case "low":
        return "We notice you might be struggling. Here are some resources that might help."
      default:
        return "Support is available when you need it."
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <div className={`p-3 rounded-full ${severity === "high" ? "bg-red-100" : "bg-orange-100"}`}>
              <AlertTriangle className={`h-8 w-8 ${severity === "high" ? "text-red-600" : "text-orange-600"}`} />
            </div>
          </div>
          <CardTitle className="text-xl">You're Not Alone</CardTitle>
          <CardDescription>{getAlertMessage()}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {severity === "high" && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>
                  If you're in immediate danger, please call emergency services (112) or go to your nearest emergency
                  room.
                </strong>
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Crisis Helplines (India)
            </h3>

            <div className="grid gap-3">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{contact.name}</h4>
                    <p className="text-sm text-muted-foreground">{contact.available}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => window.open(`tel:${contact.number}`)}>
                    <Phone className="h-4 w-4 mr-2" />
                    {contact.number}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Immediate Support Options
            </h3>

            <div className="grid gap-3">
              <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
                <Heart className="h-5 w-5 mr-3 text-red-500" />
                <div className="text-left">
                  <div className="font-medium">Connect with a Counselor</div>
                  <div className="text-sm text-muted-foreground">Chat with a trained mental health professional</div>
                </div>
              </Button>

              <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
                <ExternalLink className="h-5 w-5 mr-3 text-blue-500" />
                <div className="text-left">
                  <div className="font-medium">Safety Planning Tool</div>
                  <div className="text-sm text-muted-foreground">Create a personalized crisis response plan</div>
                </div>
              </Button>

              <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
                <MessageCircle className="h-5 w-5 mr-3 text-green-500" />
                <div className="text-left">
                  <div className="font-medium">Join Support Group</div>
                  <div className="text-sm text-muted-foreground">Connect with others who understand</div>
                </div>
              </Button>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Remember:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Your feelings are valid and temporary</li>
              <li>• Professional help is available and effective</li>
              <li>• Many people have felt this way and recovered</li>
              <li>• You deserve support and care</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button onClick={() => setIsVisible(false)} variant="outline" className="flex-1">
              I'm Safe Now
            </Button>
            <Button onClick={() => (window.location.href = "/safety-plan")} variant="outline" className="flex-1">
              Create Safety Plan
            </Button>
            <Button onClick={() => window.open("tel:9152987821")} className="flex-1">
              Call Helpline
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
