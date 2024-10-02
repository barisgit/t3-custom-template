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
      <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-6xl font-bold text-transparent">
        {t("home.welcomeMessage")}
      </h1>
    </div>
  );
}
