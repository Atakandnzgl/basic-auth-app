import React, { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const baseClasses =
  "inline-flex items-center justify-center text-sm font-medium rounded-md px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-slate-900",
  secondary:
    "bg-slate-700 text-slate-100 hover:bg-slate-600 focus:ring-slate-400 focus:ring-offset-slate-900",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 focus:ring-offset-slate-900",
  ghost:
    "bg-transparent text-slate-100 hover:bg-slate-800 focus:ring-slate-500 focus:ring-offset-slate-900",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = "primary", fullWidth, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          baseClasses,
          variantClasses[variant],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
