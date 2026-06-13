import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex w-full transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "flex flex-row w-full gap-2 h-fit px-4 py-3 bg-white border-slate-200 border-[1px] rounded-lg text-slate-400 placeholder:text-sm placeholder:font-sans placeholder:text-slate-400 focus-visible:ring-[2px] focus-visible:ring-[#10B981] focus-visible:border-transparent  disabled:bg-slate-100 disabled:border-slate-200 disabled:text-slate-400 disabled:shadow-none focus-visible:shadow-[0_0_1.5px_4px_rgba(16,185,129,0.25)] focus-visible:text-slate-900 focus-visible:placeholder:text-transparent focus-visible:placeholder:duration-200",
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