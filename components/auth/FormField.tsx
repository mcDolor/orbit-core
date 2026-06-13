"use client";

import {
  InputHTMLAttributes,
  ReactNode,
  useState,
} from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface FormFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: ReactNode;
  error?: string;
}

export function FormField({
  id,
  label,
  error,
  className,
  ...inputProps
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label
        htmlFor={id}
        className="font-medium text-slate-700 text-sm"
      >
        {label}
      </Label>
      <Input
        id={id}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
        className={[
          "h-11 rounded-lg font-medium text-sm text-slate-800 placeholder:text-slate-400",
          "focus-visible:border-primary-500 focus-visible:ring-primary-500/20",
          className ?? "",
        ].join(" ")}
        {...inputProps}
      />
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="font-medium text-xs text-red-500"
        >
          {error}
        </p>
      )}
    </div>
  );
}

type PasswordFieldProps = Omit<FormFieldProps, "type">;

export function PasswordField({
  id,
  label,
  error,
  ...inputProps
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label
        htmlFor={id}
        className="font-medium text-slate-700 text-sm"
      >
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={visible ? "text" : "password"}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          className="h-11 rounded-lg font-medium text-sm text-slate-800 placeholder:text-slate-400 pr-10 focus-visible:border-primary-500 focus-visible:ring-primary-500/20"
          {...inputProps}
        />
        <button
          type="button"
          aria-label={
            visible ? "Hide password" : "Show password"
          }
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="font-medium text-xs text-red-500"
        >
          {error}
        </p>
      )}
    </div>
  );
}
