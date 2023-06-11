import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef } from "react"

import { cn } from "../../lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:text-foreground [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "text-destructive border-destructive/50 dark:border-destructive [&>svg]:text-destructive text-destructive",
        warning:
          "text-warning border-warning/50 dark:border-warning [&>svg]:text-warning text-warning",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(function Alert({ className, variant, ...props }, ref) {
  return (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
})

const AlertTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(function AlertTitle({ className, ...props }, ref) {
  return (
    <h5
      ref={ref}
      className={cn("mb-1 text-lg font-medium leading-none tracking-tight", className)}
      {...props}
    />
  )
})

const AlertDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(function AlertDescription({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("text-sm [&_p]:leading-relaxed text-foreground", className)}
      {...props}
    />
  )
})

export { Alert, AlertTitle, AlertDescription }
