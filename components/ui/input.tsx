import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "flex flex-row w-full gap-2 h-fit px-4 py-3 bg-slate-50 text-slate-900 border-slate-200 border-[1px] rounded-lg placeholder:text-sm placeholder:font-sans placeholder:text-slate-400 focus-visible:border-[#10B981] disabled:bg-slate-100 disabled:border-slate-200 disabled:text-slate-400 disabled:shadow-none focus-visible:shadow-[0_0_1.5px_4px_rgba(16,185,129,0.25)] focus-visible:text-slate-900 focus-visible:placeholder:text-transparent focus-visible:placeholder:duration-200",
        },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <input
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };