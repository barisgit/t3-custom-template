import { getServerTranslations } from "~/i18n/server";
import { Link } from "~/i18n/routing";

export default async function Unauthorized({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const translations = await getServerTranslations("unauthorized", locale);

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
