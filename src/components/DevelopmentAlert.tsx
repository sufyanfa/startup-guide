import { Alert, AlertDescription } from "@/components/ui/alert"

export function DevelopmentAlert() {
  return (
    <Alert variant="warning" className="mb-6 mx-4 md:mx-6">
      <AlertDescription className="text-center">
        🚧 الموقع قيد التطوير والتحديث حالياً
      </AlertDescription>
    </Alert>
  )
}