"use client";

import React, { useState } from "react";

interface LabelTextareaProps {
  id: string;
  label: string;
  rows?: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  backgroundClass?: string;
}

export default function LabelTextarea({
  id,
  label,
  rows = 4,
  value,
  onChange,
  backgroundClass = "bg-background-default",
}: LabelTextareaProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className={`relative ${backgroundClass}`}>
      <textarea
        id={id}
        rows={rows}
        className={`peer w-full resize-none rounded border-2 border-border-default ${backgroundClass} px-2 pb-2 pt-5 text-text-primary placeholder-transparent focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary`}
        placeholder={label}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        value={value}
      />
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
