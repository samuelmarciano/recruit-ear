import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "~/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("monsterpi13-relative monsterpi13-overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="monsterpi13-h-full monsterpi13-w-full monsterpi13-rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "monsterpi13-flex monsterpi13-touch-none monsterpi13-select-none monsterpi13-transition-colors",
      orientation === "vertical" &&
        "monsterpi13-h-full monsterpi13-w-2.5 monsterpi13-border-l monsterpi13-border-l-transparent monsterpi13-p-[1px]",
      orientation === "horizontal" &&
        "monsterpi13-h-2.5 monsterpi13-flex-col monsterpi13-border-t monsterpi13-border-t-transparent monsterpi13-p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="monsterpi13-relative monsterpi13-flex-1 monsterpi13-rounded-full monsterpi13-bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
