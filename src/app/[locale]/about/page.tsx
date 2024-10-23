import { getServerTranslations } from "~/i18n/server";
import { getUserRole, signInIfNotAuthenticated } from "~/lib/auth";
import { LatestPost } from "~/components/Post";
import { api, HydrateClient } from "~/trpc/server";

export default async function About({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const userId = signInIfNotAuthenticated();
  const role = await getUserRole(userId);
  const translations = await getServerTranslations("about", locale);

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
