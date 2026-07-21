import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Construction } from "lucide-react"

interface UnderDevelopmentModalProps {
  children: React.ReactNode
  featureName?: string
}

export function UnderDevelopmentModal({ children, featureName = "This feature" }: UnderDevelopmentModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md text-center border-primary/20">
        <DialogHeader>
          <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 mt-2">
            <Construction className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-xl font-bold text-center">Feature Under Development</DialogTitle>
          <DialogDescription className="text-center pt-2">
            We're actively working on bringing <strong>{featureName}</strong> to PeerMindHub in an upcoming release.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
