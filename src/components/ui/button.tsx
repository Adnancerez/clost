import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-label-mono uppercase tracking-widest transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none";

    const variantStyles = {
      primary:
        "bg-primary text-on-primary border border-primary hover:bg-surface-variant hover:text-primary active:bg-surface-dim",
      secondary:
        "bg-surface-variant text-primary border border-primary hover:bg-primary hover:text-on-primary",
      outline:
        "bg-transparent text-primary border border-primary hover:bg-surface-variant",
      ghost:
        "bg-transparent text-primary hover:bg-surface-variant border border-transparent",
    };

    const sizeStyles = {
      sm: "h-10 px-4 text-xs",
      md: "h-14 px-8 text-sm",
      lg: "h-16 px-10 text-base",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={twMerge(
          clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)
        )}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block h-4 w-4 animate-spin border-2 border-current border-t-transparent mr-2" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
