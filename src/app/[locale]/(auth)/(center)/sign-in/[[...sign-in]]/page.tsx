import { SignIn } from "@clerk/nextjs";
import { getTranslations } from "next-intl/server";
import { useLocale } from "next-intl";
import { getI18nPath } from "~/utils/Helpers";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({
    locale,
    namespace: "SignIn",
  });

  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}

// export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }];
}

export default function SignInPage() {
  const locale = useLocale();

  return <SignIn path={getI18nPath("/sign-in", locale)} />;
}
