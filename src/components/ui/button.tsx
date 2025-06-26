import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "~/lib/utils"

const buttonVariants = cva(
  "monsterpi13-inline-flex monsterpi13-items-center monsterpi13-justify-center monsterpi13-whitespace-nowrap monsterpi13-rounded-md monsterpi13-text-sm monsterpi13-font-medium monsterpi13-ring-offset-background monsterpi13-transition-colors focus-visible:monsterpi13-outline-none focus-visible:monsterpi13-ring-2 focus-visible:monsterpi13-ring-ring focus-visible:monsterpi13-ring-offset-2 disabled:monsterpi13-pointer-events-none disabled:monsterpi13-opacity-50",
  {
    variants: {
      variant: {
        default:
          "monsterpi13-bg-primary monsterpi13-text-primary-foreground hover:monsterpi13-bg-primary/70",
        destructive:
          "monsterpi13-bg-destructive monsterpi13-text-destructive-foreground hover:monsterpi13-bg-destructive/90",
        outline:
          "monsterpi13-border monsterpi13-border-input monsterpi13-bg-background hover:monsterpi13-bg-accent hover:monsterpi13-text-accent-foreground",
        secondary:
          "monsterpi13-bg-secondary monsterpi13-text-secondary-foreground hover:monsterpi13-bg-secondary/80",
        ghost:
          "hover:monsterpi13-bg-accent hover:monsterpi13-text-accent-foreground",
        link: "monsterpi13-text-primary monsterpi13-underline-offset-4 hover:monsterpi13-underline"
      },
      size: {
        default: "monsterpi13-h-10 monsterpi13-px-4 monsterpi13-py-2",
        sm: "monsterpi13-h-9 monsterpi13-rounded-md monsterpi13-px-3",
        lg: "monsterpi13-h-11 monsterpi13-rounded-md monsterpi13-px-8",
        icon: "monsterpi13-h-10 monsterpi13-w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
