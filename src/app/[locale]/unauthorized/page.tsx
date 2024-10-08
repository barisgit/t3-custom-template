import { unstable_setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "~/i18n/routing";

export default async function Unauthorized({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("unauthorized");

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
