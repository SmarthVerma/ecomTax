"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import { cn } from "@/lib/utils"

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = ({ children, ...props }) => (
  <HoverCardPrimitive.Trigger
    // Set delayDuration to a smaller value for quicker opening
    delayDuration={233} // This may not be available; refer to Radix documentation for actual support
    {...props}
  >
    {children}
  </HoverCardPrimitive.Trigger>
)

const HoverCardContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(className)}
    {...props}
  />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }