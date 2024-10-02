import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import type { Locale } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as Locale)) notFound();

  const messages = (await import(`../../messages/${locale}.json`)) as {
    default: Record<string, string>;
  };

  return {
    messages: messages.default,
  };
});
