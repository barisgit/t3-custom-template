import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import AppConfig from "~/AppConfig";

// Convert navigation array to pathnames object with locale mappings
const pathnames = AppConfig.navigation.reduce<
  Record<string, Record<string, string>>
>((acc, route) => {
  acc[route.href] = AppConfig.locales.reduce<Record<string, string>>(
    (localeAcc, locale) => {
      localeAcc[locale] = route.href;
      return localeAcc;
    },
    {},
  );
  return acc;
}, {});

export const routing = defineRouting({
  locales: AppConfig.locales,
  defaultLocale: AppConfig.defaultLocale,
  pathnames,
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation(routing);
