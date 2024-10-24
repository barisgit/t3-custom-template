"use client";

import { Button } from "~/components/ui/button";
import { useToast } from "~/hooks/use-toast";
import { useTranslations } from "next-intl";

export function ToastDemo() {
  const translations = useTranslations("style");
  const { toast } = useToast();

  return (
    <>
      <Button
        onClick={() =>
          toast({
            title: translations("toast.defaultTitle"),
            description: translations("toast.defaultMessage"),
            duration: 3000, // Will close after 3 seconds
          })
        }
      >
        {translations("toast.showDefault")}
      </Button>

      <Button
        onClick={() =>
          toast({
            variant: "success",
            title: translations("toast.successTitle"),
            description: translations("toast.successMessage"),
            duration: 4000, // Will close after 4 seconds
          })
        }
      >
        {translations("toast.showSuccess")}
      </Button>

      {/* For important warnings, you might want a longer duration */}
      <Button
        onClick={() =>
          toast({
            variant: "warning",
            title: translations("toast.warningTitle"),
            description: translations("toast.warningMessage"),
            duration: 7000, // Will close after 7 seconds
            action: (
              <Button
                variant="outlined"
                size="sm"
                className="border-white text-white hover:bg-white/20 hover:text-white"
              >
                {translations("toast.warningAction")}
              </Button>
            ),
          })
        }
      >
        {translations("toast.showWarning")}
      </Button>

      {/* For errors, you might want them to stay longer */}
      <Button
        variant="destructive"
        onClick={() =>
          toast({
            variant: "destructive",
            title: translations("toast.errorTitle"),
            description: translations("toast.errorMessage"),
            duration: 10000, // Will close after 10 seconds
            action: (
              <Button
                variant="outlined"
                size="sm"
                className="border-white text-white hover:bg-white/20 hover:text-white"
              >
                {translations("toast.errorAction")}
              </Button>
            ),
          })
        }
      >
        {translations("toast.showError")}
      </Button>
    </>
  );
}
