import { SignUp } from "@clerk/nextjs";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { useLocale } from "next-intl";
import { getI18nPath } from "~/utils/Helpers";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations({
    locale,
    namespace: "SignUp",
  });

  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }];
}

export default function SignUpPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const currentLocale = useLocale();

  return <SignUp path={getI18nPath("/sign-up", currentLocale)} />;
}
