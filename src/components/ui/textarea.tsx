import * as React from "react"

import { cn } from "~/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "monsterpi13-flex monsterpi13-min-h-[80px] monsterpi13-w-full monsterpi13-rounded-md monsterpi13-border monsterpi13-border-input monsterpi13-bg-background monsterpi13-px-3 monsterpi13-py-2 monsterpi13-text-sm monsterpi13-ring-offset-background placeholder:monsterpi13-text-muted-foreground focus-visible:monsterpi13-outline-none focus-visible:monsterpi13-ring-2 focus-visible:monsterpi13-ring-ring focus-visible:monsterpi13-ring-offset-2 disabled:monsterpi13-cursor-not-allowed disabled:monsterpi13-opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
