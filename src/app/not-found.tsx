import { useTranslations } from "next-intl";
import { Link } from "~/i18n/routing";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div>
      <h2>{t("title")}</h2>
      <p>{t("message")}</p>
      <Link href="/">{t("returnHome")}</Link>
    </div>
  );
}
