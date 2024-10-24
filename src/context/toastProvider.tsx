"use client";

import { Toaster } from "react-hot-toast";
import { useAppSelector } from "~/redux/hooks";

export function ToastProvider() {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <Toaster
      position="bottom-right"
      gutter={10}
      reverseOrder={false}
      toastOptions={{
        className: `
          border border-border-default 
          dark:bg-background-default
          text-text-primary
          dark:text-text-primary
          shadow-elevation-2
        `,
        success: {
          duration: 3000,
          className: `
            border border-success-200
            !bg-success-50
            text-success-900
            dark:border-success-800
            dark:!bg-success-1000
            dark:text-success-100
          `,
        },
        error: {
          duration: 4000,
          className: `
            border border-error-200
            !bg-error-50
            text-error-900
            dark:border-error-800
            dark:!bg-error-1000
            dark:text-error-100
          `,
        },
        loading: {
          className: `
            border border-info-200
            !bg-info-50
            text-info-900
            dark:border-info-800
            dark:!bg-info-1000
            dark:text-info-100
          `,
        },
      }}
    />
  );
}
