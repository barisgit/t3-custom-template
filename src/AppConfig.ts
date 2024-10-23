import type { LocalePrefix } from "node_modules/next-intl/dist/types/src/routing/types";

const localePrefix: LocalePrefix = "as-needed";

// FIXME: Update this configuration file based on your project information
export const AppConfig = {
  name: "t3-custom-template",
  website_name: "T3 Custom Template",
  website_description: "T3 Custom Template",
  locales: ["en", "de"],
  defaultLocale: "en",
  localePrefix,
};
