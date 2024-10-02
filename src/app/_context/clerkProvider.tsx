"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { enUS, deDE } from "@clerk/localizations";
import { dark } from "@clerk/themes";
import { useLocale } from "next-intl";
import { useSelector } from "react-redux";
import type { RootState } from "~/redux/store";

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
  const lightAppearance = {
    baseTheme: undefined,
  };

  const darkAppearance = {
    baseTheme: dark,
  };

  const appearance = theme === "dark" ? darkAppearance : lightAppearance;

  return (
    <ClerkProvider localization={clerkLocale} appearance={appearance}>
      {children}
    </ClerkProvider>
  );
}
