"use client";

import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { X } from "lucide-react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  backgroundClass?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  className?: string;
  overlayClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
  children,
  onClose,
  backgroundClass = "bg-background-paper",
  size = "md",
  closeOnEscape = true,
  showCloseButton = true,
  className,
  overlayClassName,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        const isSelectComponent = (event.target as Element).closest(
          '[role="listbox"]',
        );
        if (!isSelectComponent) {
          onClose();
        }
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose, closeOnEscape]);

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-[90vw]",
  };

  return typeof window === "undefined"
    ? null
    : createPortal(
        <div
          className={cn(
            "fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm",
            overlayClassName,
          )}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex min-h-screen items-center justify-center">
            <div
              ref={modalRef}
              className={cn(
                "overflow-none relative max-h-[90vh] rounded-lg border border-border-default shadow-elevation-3",
                backgroundClass,
                sizeClasses[size],
                "p-6",
                className,
              )}
            >
              {showCloseButton && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              {children}
            </div>
          </div>
        </div>,
        document.body,
      );
};

export default Modal;
