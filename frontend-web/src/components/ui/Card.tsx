import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border-2 border-black bg-white text-card-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

export { Card };
