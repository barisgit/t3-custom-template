import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div className="-mt-24 flex min-h-screen items-center justify-center">
      <h1 className="from-primary-500 to-secondary-500 bg-gradient-to-r bg-clip-text text-6xl font-bold text-transparent">
        {t("home.welcomeMessage")}
      </h1>
    </div>
  );
}
