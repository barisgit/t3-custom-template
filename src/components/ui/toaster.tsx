"use client";

import { useToast } from "~/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "~/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider duration={5000}>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport className="fixed right-0 top-0 z-[100] flex max-h-screen w-full flex-col gap-2 p-4 md:max-w-[420px]" />
    </ToastProvider>
  );
}
