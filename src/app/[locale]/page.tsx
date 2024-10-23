import { getServerTranslations } from "~/i18n/server";

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const translations = await getServerTranslations("home", locale);

  return (
    <div className="-mb-24 flex min-h-screen items-center justify-center">
      <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-6xl font-bold text-transparent">
        {translations("welcomeMessage")}
      </h1>
    </div>
  );
}
