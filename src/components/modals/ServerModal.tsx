"use client";

import React, { useState, type ReactNode } from "react";
import Modal from "~/components/ui/modal";
import { Button } from "~/components/ui/button";

interface ServerModalProps {
  children: ReactNode;
  trigger?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
  className?: string;
  defaultOpen?: boolean;
  closeOnClickOutside?: boolean;
}

export default function ServerModal({
  children,
  trigger,
  size = "md",
  showCloseButton = true,
  className,
  defaultOpen = false,
  closeOnClickOutside = true,
}: ServerModalProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <>
      {trigger ? (
        typeof trigger === "string" ? (
          <Button onClick={() => setIsOpen(true)}>{trigger}</Button>
        ) : (
          trigger &&
          React.cloneElement(trigger as React.ReactElement, {
            onClick: () => setIsOpen(true),
          })
        )
      ) : null}

      {isOpen && (
        <Modal
          onClose={() => setIsOpen(false)}
          size={size}
          showCloseButton={showCloseButton}
          className={className}
          closeOnEscape={closeOnClickOutside}
        >
          {children}
        </Modal>
      )}
    </>
  );
}
