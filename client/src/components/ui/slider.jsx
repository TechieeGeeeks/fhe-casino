"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";

import * as React from "react";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef(
  ({ className, value, ...props }, ref) => (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-5 w-full grow overflow-hidden rounded-full border-2 border-black shadow-base dark:border-darkBorder bg-white dark:bg-darkBg">
        <SliderPrimitive.Range className="absolute h-full bg-main" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="h-5 w-5 rounded-full border-2 border-black dark:border-darkBorder bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex items-center justify-center p-3">
        {value}
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  )
);
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
