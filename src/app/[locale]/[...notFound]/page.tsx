import { getTranslations } from "next-intl/server";
import { Link } from "~/i18n/routing";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({
    locale,
    namespace: "notFound",
  });

  return {
    title: t("title"),
    description: t("message"),
  };
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }];
}

export default async function NotFound({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({
    locale,
    namespace: "notFound",
  });

  return (
    <div className="-mt-24 flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold">{t("title")}</h2>
        <p className="mb-4">{t("message")}</p>
        <Link href="/" className="text-blue-500 hover:underline">
          {t("returnHome")}
        </Link>
      </div>
    </div>
  );
}
