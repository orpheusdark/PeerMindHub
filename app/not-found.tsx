import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Construction, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="max-w-md w-full text-center shadow-lg border-primary/20">
        <CardHeader className="pb-4">
          <div className="mx-auto bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mb-4">
            <Construction className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Feature Under Development</CardTitle>
          <CardDescription className="text-base mt-2">
            We're actively working on bringing this functionality to PeerMindHub.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-8">
            This feature is expected in an upcoming release. Thank you for your patience as we build a better platform for everyone.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="w-full hover-lift">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Dashboard
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
