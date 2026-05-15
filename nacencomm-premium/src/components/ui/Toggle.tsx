"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ToggleProps {
  labelLeft: string;
  labelRight: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export function Toggle({ labelLeft, labelRight, checked, onChange, className }: ToggleProps) {
  return (
    <div className={cn("flex items-center gap-4 justify-center", className)}>
      <span className={cn("text-sm font-semibold transition-colors", !checked ? "text-brand-blue" : "text-gray-500")}>
        {labelLeft}
      </span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
          "bg-brand-blue"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
            checked ? "translate-x-6" : "translate-x-0"
          )}
        />
      </button>
      <span className={cn("text-sm font-semibold transition-colors", checked ? "text-brand-blue" : "text-gray-500")}>
        {labelRight}
      </span>
    </div>
  );
}
