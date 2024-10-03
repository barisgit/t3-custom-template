import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { LatestPost } from "~/app/_components/Post";

export default async function About({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect(`/${locale}/sign-in`); // Redirect unauthenticated users to login page
  }

  const { db } = await import("~/server/db");
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { role: true }, // Only select the role field
  });

  // if (user?.role === "USER") {
  //   redirect(`/${locale}/unauthorized`); // Redirect unauthorized users to a dedicated page
  // }

  unstable_setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <div>
      <h1 className="mb-6 text-center text-4xl font-bold text-primary">
        {t("superAdminDashboard")}
      </h1>
      <LatestPost />
    </div>
  );
}
