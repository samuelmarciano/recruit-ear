import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "~/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "monsterpi13-peer monsterpi13-inline-flex monsterpi13-h-6 monsterpi13-w-11 monsterpi13-shrink-0 monsterpi13-cursor-pointer monsterpi13-items-center monsterpi13-rounded-full monsterpi13-border-2 monsterpi13-border-transparent monsterpi13-transition-colors focus-visible:monsterpi13-outline-none focus-visible:monsterpi13-ring-2 focus-visible:monsterpi13-ring-ring focus-visible:monsterpi13-ring-offset-2 focus-visible:monsterpi13-ring-offset-background disabled:monsterpi13-cursor-not-allowed disabled:monsterpi13-opacity-50 data-[state=checked]:monsterpi13-bg-primary data-[state=unchecked]:monsterpi13-bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "monsterpi13-pointer-events-none monsterpi13-block monsterpi13-h-5 monsterpi13-w-5 monsterpi13-rounded-full monsterpi13-bg-background monsterpi13-shadow-lg monsterpi13-ring-0 monsterpi13-transition-transform data-[state=checked]:monsterpi13-translate-x-5 data-[state=unchecked]:monsterpi13-translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
