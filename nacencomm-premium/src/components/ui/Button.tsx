"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "red" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const variants = {
      primary: "bg-brand-blue text-white hover:opacity-90",
      secondary: "bg-brand-slate text-brand-blue hover:bg-gray-200",
      red: "bg-brand-red text-white hover:bg-brand-red-dark shadow-md",
      ghost: "bg-transparent hover:bg-gray-100 text-gray-600",
      outline: "bg-transparent border border-gray-200 hover:border-brand-blue text-gray-700",
    };

    const sizes = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-2.5 text-sm",
      lg: "px-10 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-semibold transition-all active:scale-95 disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
