import * as React from "react";
import { cn } from "@/lib/utils";

interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  description?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function AccessibleButton({
  label,
  description,
  icon,
  iconPosition = "left",
  variant = "primary",
  size = "md",
  className,
  ...props
}: AccessibleButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#14F195] to-[#9945FF] text-black hover:opacity-90",
    secondary: "bg-[#1e2035] text-[#14F195] border border-[#14F195]/50 hover:bg-[#2a2c47]",
    outline: "bg-transparent border border-[#9945FF] text-white hover:bg-[#1e2035]/50",
    ghost: "bg-transparent text-white hover:bg-[#1e2035]/50"
  };

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-11 px-6 text-lg"
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      aria-label={label}
      aria-description={description}
      role="button"
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className="flex-shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{label}</span>
      {icon && iconPosition === "right" && (
        <span className="flex-shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
    </button>
  );
} 