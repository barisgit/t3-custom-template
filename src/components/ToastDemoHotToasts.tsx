"use client";

import { Button } from "~/components/ui/button";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { X } from "lucide-react";

export function ToastDemo() {
  const translations = useTranslations("style.toast");

  const showLoadingToast = async () => {
    const myPromise = new Promise((resolve) => {
      // Simulate async operation
      setTimeout(() => {
        resolve("Success");
      }, 2000);
    });

    await toast.promise(myPromise, {
      loading: translations("loadingMessage"),
      success: translations("loadingCompleteMessage"),
      error: translations("loadingErrorMessage"),
    });
  };

  const showCustomToast = () => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } pointer-events-auto flex w-full max-w-md rounded-lg border border-border-default bg-background-paper shadow-elevation-2 ring-1 ring-border-default/10`}
        >
          <div className="w-0 flex-1 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <div className="h-10 w-10 rounded-full bg-primary-500" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-text-primary">
                  {translations("customToast.title")}
                </p>
                <p className="mt-1 text-sm text-text-secondary">
                  {translations("customToast.message")}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-border-light">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="flex items-center justify-center rounded-r-lg border border-transparent p-4 text-sm font-medium text-primary-500 transition-colors hover:bg-background-level1 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        duration: 4000,
      },
    );
  };

  const showCustomSuccessToast = () => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } dark:bg-success-1000 pointer-events-auto flex w-full max-w-md rounded-lg border border-success-200 bg-success-50 shadow-elevation-2 dark:border-success-700`}
        >
          <div className="w-0 flex-1 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <div className="rounded-full bg-success-500 p-2">
                  <svg
                    className="h-6 w-6 text-success-50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-success-900 dark:text-success-200">
                  {translations("customToast.successTitle")}
                </p>
                <p className="mt-1 text-sm text-success-800 dark:text-success-300">
                  {translations("customToast.successMessage")}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-success-200 dark:border-success-800">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="flex items-center justify-center rounded-r-lg border border-transparent p-4 text-sm font-medium text-success-600 transition-colors hover:bg-success-100 hover:text-success-700 focus:outline-none focus:ring-2 focus:ring-success-500 dark:text-success-400 dark:hover:bg-success-900/40"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        duration: 4000,
      },
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="outlined"
        onClick={() =>
          toast(translations("defaultMessage"), {
            duration: 3000,
          })
        }
      >
        {translations("showDefault")}
      </Button>

      <Button
        variant="solid"
        className="primary"
        onClick={() =>
          toast.success(translations("successMessage"), {
            duration: 4000,
          })
        }
      >
        {translations("showSuccess")}
      </Button>

      <Button
        variant="solid"
        className="warning"
        onClick={() =>
          toast(translations("warningMessage"), {
            duration: 5000,
            icon: "⚠️",
            className: `
            border border-warning-200
            !bg-warning-50
            text-warning-900
            dark:border-warning-800
            dark:!bg-warning-800
            dark:text-warning-200
          `,
          })
        }
      >
        {translations("showWarning")}
      </Button>

      <Button
        variant="destructive"
        onClick={() =>
          toast.error(translations("errorMessage"), {
            duration: 5000,
            position: "bottom-center",
          })
        }
      >
        {translations("showError")}
      </Button>

      <Button variant="solid" className="info" onClick={showLoadingToast}>
        {translations("showLoading")}
      </Button>

      <Button variant="solid" className="primary" onClick={showCustomToast}>
        {translations("showCustom")}
      </Button>

      <Button
        variant="solid"
        className="success"
        onClick={showCustomSuccessToast}
      >
        {translations("showCustomSuccess")}
      </Button>
    </div>
  );
}
