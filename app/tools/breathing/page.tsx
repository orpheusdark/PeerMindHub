"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Heart, Wind, Play, Pause, RotateCcw, ArrowLeft, Volume2, VolumeX, Clock } from "lucide-react"
import Link from "next/link"

const breathingExercises = [
  {
    id: "4-7-8",
    name: "4-7-8 Breathing",
    description: "Inhale for 4, hold for 7, exhale for 8. Great for anxiety and sleep.",
    duration: "4 minutes",
    difficulty: "Beginner",
    inhale: 4,
    hold: 7,
    exhale: 8,
    cycles: 4,
  },
  {
    id: "box",
    name: "Box Breathing",
    description: "Equal counts for inhale, hold, exhale, hold. Used by Navy SEALs for focus.",
    duration: "5 minutes",
    difficulty: "Beginner",
    inhale: 4,
    hold: 4,
    exhale: 4,
    holdAfter: 4,
    cycles: 6,
  },
  {
    id: "coherent",
    name: "Coherent Breathing",
    description: "5 seconds in, 5 seconds out. Balances the nervous system.",
    duration: "10 minutes",
    difficulty: "Intermediate",
    inhale: 5,
    hold: 0,
    exhale: 5,
    cycles: 12,
  },
]

function BreathingContent() {
  const [selectedExercise, setSelectedExercise] = useState(breathingExercises[0])
  const [isActive, setIsActive] = useState(false)
  const [currentPhase, setCurrentPhase] = useState<"inhale" | "hold" | "exhale" | "holdAfter">("inhale")
  const [timeLeft, setTimeLeft] = useState(selectedExercise.inhale)
  const [currentCycle, setCurrentCycle] = useState(1)
  const [isComplete, setIsComplete] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && !isComplete) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time > 1) {
            return time - 1
          } else {
            // Move to next phase
            if (currentPhase === "inhale") {
              if (selectedExercise.hold > 0) {
                setCurrentPhase("hold")
                return selectedExercise.hold
              } else {
                setCurrentPhase("exhale")
                return selectedExercise.exhale
              }
            } else if (currentPhase === "hold") {
              setCurrentPhase("exhale")
              return selectedExercise.exhale
            } else if (currentPhase === "exhale") {
              if (selectedExercise.holdAfter && selectedExercise.holdAfter > 0) {
                setCurrentPhase("holdAfter")
                return selectedExercise.holdAfter
              } else {
                // Complete cycle
                if (currentCycle >= selectedExercise.cycles) {
                  setIsComplete(true)
                  setIsActive(false)
                  return 0
                } else {
                  setCurrentCycle(currentCycle + 1)
                  setCurrentPhase("inhale")
                  return selectedExercise.inhale
                }
              }
            } else if (currentPhase === "holdAfter") {
              // Complete cycle
              if (currentCycle >= selectedExercise.cycles) {
                setIsComplete(true)
                setIsActive(false)
                return 0
              } else {
                setCurrentCycle(currentCycle + 1)
                setCurrentPhase("inhale")
                return selectedExercise.inhale
              }
            }
            return time
          }
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, currentPhase, currentCycle, selectedExercise, isComplete])

  const startExercise = () => {
    setIsActive(true)
    setIsComplete(false)
    setCurrentCycle(1)
    setCurrentPhase("inhale")
    setTimeLeft(selectedExercise.inhale)
  }

  const pauseExercise = () => {
    setIsActive(false)
  }

  const resetExercise = () => {
    setIsActive(false)
    setIsComplete(false)
    setCurrentCycle(1)
    setCurrentPhase("inhale")
    setTimeLeft(selectedExercise.inhale)
  }

  const selectExercise = (exercise: (typeof breathingExercises)[0]) => {
    setSelectedExercise(exercise)
    resetExercise()
  }

  const getPhaseText = () => {
    switch (currentPhase) {
      case "inhale":
        return "Breathe In"
      case "hold":
        return "Hold"
      case "exhale":
        return "Breathe Out"
      case "holdAfter":
        return "Hold"
      default:
        return "Ready"
    }
  }

  const getCircleScale = () => {
    if (currentPhase === "inhale") {
      return "scale-110"
    } else if (currentPhase === "exhale") {
      return "scale-90"
    }
    return "scale-100"
  }

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
                <ArrowLeft className="h-4 w-4 mr-1 inline" />
                Back to Tools
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Breathing Exercises</h1>
            <p className="text-lg text-muted-foreground">
              Guided breathing techniques for relaxation, focus, and stress relief
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Exercise */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center space-x-2">
                    <Wind className="h-5 w-5 text-primary" />
                    <span>{selectedExercise.name}</span>
                  </CardTitle>
                  <CardDescription>{selectedExercise.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Breathing Circle */}
                  <div className="flex flex-col items-center space-y-6">
                    <div className="relative">
                      <div
                        className={`w-48 h-48 rounded-full border-4 border-primary/30 flex items-center justify-center transition-transform duration-1000 ease-in-out ${getCircleScale()}`}
                      >
                        <div className="w-40 h-40 rounded-full bg-primary/10 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-4xl font-bold text-primary mb-2">{timeLeft}</div>
                            <div className="text-lg font-medium text-foreground">{getPhaseText()}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="text-center space-y-2">
                      <div className="text-lg font-medium">
                        Cycle {currentCycle} of {selectedExercise.cycles}
                      </div>
                      <div className="w-64 bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(currentCycle / selectedExercise.cycles) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center space-x-4">
                      {!isActive && !isComplete && (
                        <Button size="lg" onClick={startExercise}>
                          <Play className="h-5 w-5 mr-2" />
                          Start
                        </Button>
                      )}
                      {isActive && (
                        <Button size="lg" onClick={pauseExercise}>
                          <Pause className="h-5 w-5 mr-2" />
                          Pause
                        </Button>
                      )}
                      <Button size="lg" variant="outline" onClick={resetExercise} className="bg-transparent">
                        <RotateCcw className="h-5 w-5 mr-2" />
                        Reset
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className="bg-transparent"
                      >
                        {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                      </Button>
                    </div>

                    {/* Completion Message */}
                    {isComplete && (
                      <div className="text-center p-6 bg-primary/5 rounded-lg border border-primary/20">
                        <h3 className="text-lg font-semibold text-primary mb-2">Exercise Complete!</h3>
                        <p className="text-muted-foreground">
                          Great job! You've completed {selectedExercise.cycles} cycles of {selectedExercise.name}.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Exercise Selection */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Choose Exercise</CardTitle>
                  <CardDescription>Select a breathing technique that suits your needs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {breathingExercises.map((exercise) => (
                    <div
                      key={exercise.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedExercise.id === exercise.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-muted/50"
                      }`}
                      onClick={() => selectExercise(exercise)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{exercise.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {exercise.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{exercise.description}</p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{exercise.duration}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Tips */}
              <Card>
                <CardHeader>
                  <CardTitle>Breathing Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Find a comfortable, quiet space</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Sit or lie down with good posture</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Breathe through your nose when possible</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Don't force it - let it flow naturally</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>Practice regularly for best results</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle>Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                        Stress Relief
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                        Better Sleep
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                        Improved Focus
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                        Anxiety Reduction
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BreathingPage() {
  return (
    <ProtectedRoute>
      <BreathingContent />
    </ProtectedRoute>
  )
}
