import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary-500 text-primary-50 hover:bg-primary-600 hover:text-primary-50 active:bg-primary-700 active:text-primary-50",
        destructive:
          "bg-error-500 text-error-50 hover:bg-error-600 hover:text-error-50 active:bg-error-700",
        ghost: "hover:text-primary-500 active:text-primary-700",
        link: "text-primary-500 underline-offset-4 hover:underline",
        solid:
          "bg-primary-500 text-primary-50 border border-primary-500 hover:bg-primary-600 hover:border-primary-600 hover:text-primary-50 active:bg-primary-700 active:border-primary-700 active:text-primary-50",
        soft: "bg-primary-500/15 text-primary-500 border border-transparent hover:bg-primary-600/25 hover:text-primary-600 active:bg-primary-700/30 active:text-primary-700",
        outlined_simple:
          "border border-border-default hover:border-primary-500 hover:text-primary-500 active:saturate-50 disabled:opacity-50",
        outlined:
          "bg-transparent text-primary-500 border border-primary-500 hover:bg-primary-500/15 hover:border-primary-600 hover:text-primary-600 active:bg-primary-500/20 active:border-primary-700 active:text-primary-700",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      color: {
        accent:
          "text-accent border-accent hover:text-accent/90 hover:border-accent/90",
        primary: "", // Default styling
        secondary:
          "[&]:!bg-secondary-500 [&]:!text-secondary-50 [&]:!border-secondary-500 hover:[&]:!bg-secondary-600 hover:[&]:!border-secondary-600 active:[&]:!bg-secondary-700 active:[&]:!border-secondary-700",
        tertiary:
          "[&]:!bg-tertiary-500 [&]:!text-tertiary-50 [&]:!border-tertiary-500 hover:[&]:!bg-tertiary-600 hover:[&]:!border-tertiary-600 active:[&]:!bg-tertiary-700 active:[&]:!border-tertiary-700",
        quaternary:
          "[&]:!bg-quaternary-500 [&]:!text-quaternary-50 [&]:!border-quaternary-500 hover:[&]:!bg-quaternary-600 hover:[&]:!border-quaternary-600 active:[&]:!bg-quaternary-700 active:[&]:!border-quaternary-700",
        warning:
          "[&]:!bg-warning-500 [&]:!text-warning-50 [&]:!border-warning-500 hover:[&]:!bg-warning-600 hover:[&]:!border-warning-600 active:[&]:!bg-warning-700 active:[&]:!border-warning-700",
        success:
          "[&]:!bg-success-500 [&]:!text-success-50 [&]:!border-success-500 hover:[&]:!bg-success-600 hover:[&]:!border-success-600 active:[&]:!bg-success-700 active:[&]:!border-success-700",
        info: "[&]:!bg-info-500 [&]:!text-info-50 [&]:!border-info-500 hover:[&]:!bg-info-600 hover:[&]:!border-info-600 active:[&]:!bg-info-700 active:[&]:!border-info-700",
        error:
          "[&]:!bg-error-500 [&]:!text-error-50 [&]:!border-error-500 hover:[&]:!bg-error-600 hover:[&]:!border-error-600 active:[&]:!bg-error-700 active:[&]:!border-error-700",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      color: "primary",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  color?:
    | "info"
    | "error"
    | "success"
    | "secondary"
    | "primary"
    | "tertiary"
    | "quaternary"
    | "warning"
    | undefined;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, color, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, color, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
