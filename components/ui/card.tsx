"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glow?: "none" | "green" | "gold";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverEffect = true, glow = "none", children, ...props }, ref) => {
    const glowClasses = {
      none: "",
      green: "glow-green border-emerald-500/15",
      gold: "glow-gold border-gold/15",
    };

    const cardContent = (
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl border border-emerald-500/10 bg-card-bg p-6 backdrop-blur-xl transition-colors duration-500",
          hoverEffect && "hover:border-brand/20",
          glowClasses[glow],
          className
        )}
        {...props}
      >
        {/* Fondo sutil degradado decorativo interno */}
        <div className="absolute -right-20 -top-20 -z-10 h-40 w-40 rounded-full bg-emerald-500/5 blur-3xl transition-opacity duration-500 group-hover:bg-brand/10" />
        {children}
      </div>
    );

    if (hoverEffect) {
      return (
        <motion.div
          ref={ref}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="group relative w-full h-full"
        >
          {cardContent}
        </motion.div>
      );
    }

    return <div ref={ref}>{cardContent}</div>;
  }
);

Card.displayName = "Card";

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 p-0 mb-4", className)} {...props}>{children}</div>;
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-xl font-bold leading-none tracking-tight text-foreground", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground mt-1", className)} {...props}>{children}</p>;
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-0", className)} {...props}>{children}</div>;
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center p-0 mt-6", className)} {...props}>{children}</div>;
}
