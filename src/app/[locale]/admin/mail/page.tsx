import { getServerTranslations, staticParams } from "~/i18n/server";
import MailForm from "./MailForm";

export function generateStaticParams() {
  return staticParams();
}

export default async function MailPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const translations = await getServerTranslations("admin", locale);

  return (
    <div className="container mx-auto mt-24 max-w-2xl p-4">
      <h1 className="mb-8 text-3xl font-bold">{translations("mail.title")}</h1>
      <MailForm />
    </div>
  );
}
