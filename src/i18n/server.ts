import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import AppConfig from "~/AppConfig";

export const staticParams = () => {
  return AppConfig.locales.map((locale) => ({ locale }));
};

export const getServerTranslations = async (
  i18nkey: string,
  locale?: string,
) => {
  // If locale is provided, use it; otherwise get it from the context
  if (locale) {
    unstable_setRequestLocale(locale);
  }
  const translations = await getTranslations(i18nkey);
  return translations;
};
