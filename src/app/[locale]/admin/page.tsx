import { redirect } from "~/i18n/routing";
import { staticParams } from "~/i18n/server";
import { getServerTranslations } from "~/i18n/server";

export function generateStaticParams() {
  return staticParams();
}

export default async function AdminPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  await getServerTranslations("admin", locale);

  redirect("/admin/mail");
}
