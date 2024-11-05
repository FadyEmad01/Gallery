import { cn } from "@/lib/utils";
import React from "react";
interface BentoProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

export const BentoCard = (Props: BentoProps) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-xl",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
        Props.className
      )}
    >
      {Props.children}
    </div>
  );
};
