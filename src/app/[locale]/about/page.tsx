import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { LatestPost } from "~/app/_components/Post";
import { api, HydrateClient } from "~/trpc/server";

export default async function About({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { userId } = auth();

  if (!userId) {
    // Redirect unauthenticated users to login page with callback URL
    const callbackUrl = encodeURIComponent(`/${locale}/about`);
    redirect(`/${locale}/sign-in?redirect_url=${callbackUrl}`);
  }

  const { db } = await import("~/server/db");
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  unstable_setRequestLocale(locale);
  const t = await getTranslations("about");

  void api.post.getLatest.prefetch();
  return (
    <HydrateClient>
      <div>
        <h1 className="text-primary mb-6 text-center text-4xl font-bold">
          {t("hello", { role: user?.role })}
        </h1>
        <LatestPost />
      </div>
    </HydrateClient>
  );
}
