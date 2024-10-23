"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface FloatingLabelSelectProps {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  backgroundClass?: string;
}

export default function FloatingLabelSelect({
  id,
  label,
  options,
  value,
  onChange,
  onClick,
  backgroundClass = "bg-background-default",
}: FloatingLabelSelectProps) {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div className={`relative ${backgroundClass}`} onClick={onClick}>
      <Select
        value={value}
        onValueChange={(newValue) =>
          onChange({
            target: { id, value: newValue },
          } as React.ChangeEvent<HTMLSelectElement>)
        }
        onOpenChange={(open) => setIsFocused(open)}
      >
        <SelectTrigger
          id={id}
          className={`peer h-10 w-full rounded border-2 border-border-default ${backgroundClass} px-2 pb-2 pt-5 text-text-primary placeholder-transparent focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary`}
        >
          <SelectValue placeholder=" " />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <label
        htmlFor={id}
        className={`absolute left-2 transition-all duration-200 ${
          isFocused || value
            ? `-top-2.5 px-1 text-sm text-primary ${backgroundClass}`
            : `top-2.5 text-base text-text-secondary ${backgroundClass}`
        } pointer-events-none peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-text-secondary peer-focus:-top-2.5 peer-focus:${backgroundClass} peer-focus:px-1 peer-focus:text-sm peer-focus:text-primary`}
      >
        {label}
      </label>
    </div>
  );
}
