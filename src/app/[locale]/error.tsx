"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("error");

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="-mt-24 flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold">{t("title")}</h2>
        <p className="mb-4">{t("message")}</p>
        <button
          onClick={() => reset()}
          className="text-blue-500 hover:underline"
        >
          {t("tryAgain")}
        </button>
      </div>
    </div>
  );
}
