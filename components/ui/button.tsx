import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-500 font-bold text-slate-50 flex flex-row gap-2 px-4 py-3 justify-center rounded-lg shadow-lg shadow-primary-900/20 hover:bg-primary-600 active:bg-slate-200 active:text-slate-400",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "flex gap-2 items-center justify-center px-4 py-3 border-slate-200 text-slate-700 font-bold font-sans text-base bg-background rounded-lg shadow-sm hover:bg-slate-50",
        secondary:
          "flex flex-row flex-1 items-center justify-center gap-2 px-[18px] py-3 text-sm font-medium font-sans text-slate-300 border-b-[2px] border-slate-300 hover:border-primary-500 hover:bg-slate-200 hover:text-slate-900 active:bg-transparent active:border-b-[3px]",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: 
          "text-primary-500 underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
