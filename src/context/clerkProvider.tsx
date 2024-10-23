"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { enUS, deDE } from "@clerk/localizations";
import { useLocale } from "next-intl";
import { useSelector } from "react-redux";
import type { RootState } from "~/redux/store";
import type { Appearance } from "~/types/global";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const theme = useSelector((state: RootState) => state.theme.theme);

  const locale = useLocale();
  let clerkLocale;
  switch (locale) {
    case "en":
      clerkLocale = enUS;
      break;
    case "de":
      clerkLocale = deDE;
      break;
    default:
      clerkLocale = enUS;
  }

  const baseAppearance: Appearance = {
    baseTheme: undefined,
    variables: {
      // Theme-independent colors
      colorPrimary: getComputedStyle(document.documentElement)
        .getPropertyValue("--color-secondary-500")
        .trim(),
      colorDanger: getComputedStyle(document.documentElement)
        .getPropertyValue("--color-error-500")
        .trim(),
      colorSuccess: getComputedStyle(document.documentElement)
        .getPropertyValue("--color-success-500")
        .trim(),
      colorWarning: getComputedStyle(document.documentElement)
        .getPropertyValue("--color-warning-500")
        .trim(),
      // Non-color related properties
      fontFamily: "'Inter', sans-serif",
      fontFamilyButtons: "'Inter', sans-serif",
      fontSize: "0.875rem",
      fontWeight: { normal: 400, medium: 500, semibold: 600, bold: 700 },
      borderRadius: "0.375rem",
      spacingUnit: "1rem",
    } as Appearance["variables"],
  };

  const lightAppearance: Appearance = {
    ...baseAppearance,
    variables: {
      ...baseAppearance.variables,
      colorText: getComputedStyle(document.documentElement)
        .getPropertyValue("--color-light-text-primary")
        .trim(),
      colorTextOnPrimaryBackground: getComputedStyle(document.documentElement)
        .getPropertyValue("--color-light-text-primary")
        .trim(),
      colorTextSecondary: getComputedStyle(document.documentElement)
        .getPropertyValue("--color-light-text-secondary")
        .trim(),
      colorBackground: getComputedStyle(document.documentElement)
        .getPropertyValue("--color-light-background-default")
        .trim(),
      colorInputText: getComputedStyle(document.documentElement)
        .getPropertyValue("--color-light-text-primary")
        .trim(),
      colorInputBackground: getComputedStyle(document.documentElement)
        .getPropertyValue("--color-light-background-default")
        .trim(),
      colorShimmer: getComputedStyle(document.documentElement)
        .getPropertyValue("--color-light-background-level1")
        .trim(),
      colorNeutral: getComputedStyle(document.documentElement)
        .getPropertyValue("--color-tertiary-800")
        .trim(),
    } as Appearance["variables"],
  };

  const darkAppearance: Appearance = {
    ...baseAppearance,
    variables: {
      ...baseAppearance.variables,
      colorText: getComputedStyle(document.documentElement)
        .getPropertyValue("--color-dark-text-primary")
        .trim(),
      colorTextOnPrimaryBackground: getComputedStyle(document.documentElement)
        .getPropertyValue("--color-dark-text-primary")
        .trim(),
      colorTextSecondary: getComputedStyle(document.documentElement)
        .getPropertyValue("--color-dark-text-secondary")
        .trim(),
      colorBackground: getComputedStyle(document.documentElement)
        .getPropertyValue("--color-dark-background-default")
        .trim(),
      colorInputText: getComputedStyle(document.documentElement)
        .getPropertyValue("--color-dark-text-primary")
        .trim(),
      colorInputBackground: getComputedStyle(document.documentElement)
        .getPropertyValue("--color-dark-background-default")
        .trim(),
      colorShimmer: getComputedStyle(document.documentElement)
        .getPropertyValue("--color-dark-background-level1")
        .trim(),
      colorNeutral: getComputedStyle(document.documentElement)
        .getPropertyValue("--color-dark-text-secondary")
        .trim(),
    } as Appearance["variables"],
  };

  const appearance: Appearance =
    theme === "dark" ? darkAppearance : lightAppearance;

  return (
    <ClerkProvider localization={clerkLocale} appearance={appearance}>
      {children}
    </ClerkProvider>
  );
}
