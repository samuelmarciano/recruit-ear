import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "~/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "monsterpi13-flex monsterpi13-h-10 monsterpi13-w-full monsterpi13-items-center monsterpi13-justify-between monsterpi13-rounded-md monsterpi13-border monsterpi13-border-input monsterpi13-bg-background monsterpi13-px-3 monsterpi13-py-2 monsterpi13-text-sm monsterpi13-ring-offset-background placeholder:monsterpi13-text-muted-foreground focus:monsterpi13-outline-none focus:monsterpi13-ring-2 focus:monsterpi13-ring-ring focus:monsterpi13-ring-offset-2 disabled:monsterpi13-cursor-not-allowed disabled:monsterpi13-opacity-50 [&>span]:monsterpi13-line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="monsterpi13-h-4 monsterpi13-w-4 monsterpi13-opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "monsterpi13-flex monsterpi13-cursor-default monsterpi13-items-center monsterpi13-justify-center monsterpi13-py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="monsterpi13-h-4 monsterpi13-w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "monsterpi13-flex monsterpi13-cursor-default monsterpi13-items-center monsterpi13-justify-center monsterpi13-py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="monsterpi13-h-4 monsterpi13-w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "monsterpi13-relative monsterpi13-z-50 monsterpi13-max-h-96 monsterpi13-min-w-[8rem] monsterpi13-overflow-hidden monsterpi13-rounded-md monsterpi13-border monsterpi13-bg-popover monsterpi13-text-popover-foreground monsterpi13-shadow-md data-[state=open]:monsterpi13-animate-in data-[state=closed]:monsterpi13-animate-out data-[state=closed]:monsterpi13-fade-out-0 data-[state=open]:monsterpi13-fade-in-0 data-[state=closed]:monsterpi13-zoom-out-95 data-[state=open]:monsterpi13-zoom-in-95 data-[side=bottom]:monsterpi13-slide-in-from-top-2 data-[side=left]:monsterpi13-slide-in-from-right-2 data-[side=right]:monsterpi13-slide-in-from-left-2 data-[side=top]:monsterpi13-slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:monsterpi13-translate-y-1 data-[side=left]:monsterpi13--translate-x-1 data-[side=right]:monsterpi13-translate-x-1 data-[side=top]:monsterpi13--translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "monsterpi13-p-1",
          position === "popper" &&
            "monsterpi13-h-[var(--radix-select-trigger-height)] monsterpi13-w-full monsterpi13-min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("monsterpi13-py-1.5 monsterpi13-pl-8 monsterpi13-pr-2 monsterpi13-text-sm monsterpi13-font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "monsterpi13-relative monsterpi13-flex monsterpi13-w-full monsterpi13-cursor-default monsterpi13-select-none monsterpi13-items-center monsterpi13-rounded-sm monsterpi13-py-1.5 monsterpi13-pl-8 monsterpi13-pr-2 monsterpi13-text-sm monsterpi13-outline-none focus:monsterpi13-bg-accent focus:monsterpi13-text-accent-foreground data-[disabled]:monsterpi13-pointer-events-none data-[disabled]:monsterpi13-opacity-50",
      className
    )}
    {...props}
  >
    <span className="monsterpi13-absolute monsterpi13-left-2 monsterpi13-flex monsterpi13-h-3.5 monsterpi13-w-3.5 monsterpi13-items-center monsterpi13-justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="monsterpi13-h-4 monsterpi13-w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("monsterpi13--mx-1 monsterpi13-my-1 monsterpi13-h-px monsterpi13-bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
