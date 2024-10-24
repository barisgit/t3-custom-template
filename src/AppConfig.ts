import type { LocalePrefix } from "node_modules/next-intl/dist/types/src/routing/types";
import type { Role } from "@prisma/client";

const localePrefix: LocalePrefix = "as-needed";

// FIXME: Update this configuration file based on your project information
const AppConfig = {
  name: "t3-custom-template",
  website_name: "T3 Custom Template",
  website_description: "T3 Custom Template",
  locales: ["en", "de"],
  defaultLocale: "en",
  localePrefix,
  ignoredRoutes: [
    "/api/clerk(.*)",
    "/api/stripe/webhooks(.*)",
    "/api/trpc(.*)",
    "/api/get-user-role(.*)",
    "/api/email(.*)",
    "/api/cron(.*)",
    "/api/cron/emails(.*)",
    "/api/create-user(.*)",
  ],
  adminRoles: ["ADMIN", "SUPER_ADMIN"] as Role[],
  navigation: [
    {
      i18nkey: "home", // This should match the key in the messages file pages.{i18nkey}
      href: "/",
    },
    {
      i18nkey: "style",
      href: "/style",
    },
    {
      i18nkey: "about",
      href: "/about",
      protected: true,
    },
    {
      i18nkey: "admin",
      href: "/admin",
      admin: true,
    },
  ],
};

export default AppConfig;
