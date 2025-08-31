"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  "aria-label": ariaLabel = "Progress", // Default label
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & { "aria-label"?: string }) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      value={value}
      aria-label={ariaLabel}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all origin-left rtl:origin-right"
        style={{ 
          transform: `scaleX(${(value || 0) / 100})`
        }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
