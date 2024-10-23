import { getServerTranslations, staticParams } from "~/i18n/server";
import { Link } from "~/i18n/routing";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const translations = await getServerTranslations("notFound", locale);

  return {
    title: translations("title"),
    description: translations("message"),
  };
}

export function generateStaticParams() {
  return staticParams();
}

export default async function NotFound({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const translations = await getServerTranslations("notFound", locale);

  return (
    <div className="-mt-24 flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold">{translations("title")}</h2>
        <p className="mb-4">{translations("message")}</p>
        <Link href="/" className="text-blue-500 hover:underline">
          {translations("returnHome")}
        </Link>
      </div>
    </div>
  );
}
