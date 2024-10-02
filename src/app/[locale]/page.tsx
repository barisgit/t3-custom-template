import { getTranslations } from "next-intl/server";
import { Link } from "~/i18n/routing";

export default async function Home() {
  const t = await getTranslations();

  return (
    <div className="flex items-center justify-center">
      <h1 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-6xl font-bold text-transparent">
        {t("home.welcomeMessage")}
      </h1>
    </div>
  );
}
