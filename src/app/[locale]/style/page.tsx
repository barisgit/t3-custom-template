import ServerModal from "~/components/modals/ServerModal";
import { Button } from "~/components/ui/button";
import { getServerTranslations, staticParams } from "~/i18n/server";

export const generateStaticParams = () => {
  return staticParams();
};

export default async function StylePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const translations = await getServerTranslations("style", locale);

  return (
    <div className="flex min-h-screen items-center justify-center pt-24">
      <div className="flex flex-row gap-4 text-center">
        {/* Basic Modal */}
        <ServerModal
          trigger={<Button>{translations("modal.openBasic")}</Button>}
        >
          <p>{translations("modal.basicMessage")}</p>
        </ServerModal>

        {/* Complex Modal */}
        <ServerModal
          trigger={
            <Button color="secondary">
              {translations("modal.openAdvanced")}
            </Button>
          }
          size="lg"
          className="max-w-2xl"
        >
          <div className="space-y-6">
            <div className="border-b border-border-default pb-4">
              <h2 className="text-2xl font-bold">
                {translations("modal.title")}
              </h2>
            </div>

            <div className="space-y-4">
              <p>{translations("modal.welcomeMessage")}</p>
              <p>{translations("modal.description")}</p>
            </div>

            <div className="flex justify-end gap-2 border-t border-border-default pt-4">
              <Button variant="ghost">
                {translations("modal.secondaryButton")}
              </Button>
              <Button>{translations("modal.primaryButton")}</Button>
            </div>
          </div>
        </ServerModal>

        {/* Auto-open Modal */}
        <ServerModal defaultOpen={true} size="sm">
          <p className="text-center">{translations("modal.autoOpenMessage")}</p>
        </ServerModal>
      </div>
    </div>
  );
}
