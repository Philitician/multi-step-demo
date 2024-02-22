"use client";
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";

export const AccordionRadioTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex justify-start">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 w-full items-center py-4 font-medium transition-all hover:underline [&[data-state=open]>div:first-child>div>svg]:accent-ring [&[data-state=closed]>div:first-child>div>svg]:fill-none",
        className
      )}
      {...props}
    >
      <div className="aspect-square h-4 w-4 m-2 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
        <div className="flex items-center justify-center h-full w-full">
          <Circle className="h-2.5 w-2.5 fill-current text-current stroke-none" />
        </div>
      </div>
      {children}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionRadioTrigger.displayName = AccordionPrimitive.Trigger.displayName;
