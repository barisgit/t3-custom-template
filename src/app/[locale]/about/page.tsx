import { getServerTranslations } from "~/i18n/server";
import { LatestPost } from "~/components/Post";
import { api, HydrateClient } from "~/trpc/server";
import { getUserRole } from "~/lib/auth";

export default async function About({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const translations = await getServerTranslations("about", locale);
  const role = await getUserRole();
  void api.post.getLatest.prefetch();
  return (
    <HydrateClient>
      <div>
        <h1 className="mb-6 text-center text-4xl font-bold text-primary">
          {translations("hello", { role })}
        </h1>
        <LatestPost />
      </div>
    </HydrateClient>
  );
}
