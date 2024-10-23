import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import ServerModal from "~/components/modals/ServerModal";
import { Button } from "~/components/ui/button";

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div className="flex min-h-screen items-center justify-center pt-24">
      <div className="space-y-8 text-center">
        <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-6xl font-bold text-transparent">
          {t("home.welcomeMessage")}
        </h1>

        {/* Basic Modal */}
        <ServerModal trigger={<Button>{t("home.modal.openBasic")}</Button>}>
          <p>{t("home.modal.basicMessage")}</p>
        </ServerModal>

        {/* Complex Modal */}
        <ServerModal
          trigger={
            <Button color="secondary">{t("home.modal.openAdvanced")}</Button>
          }
          size="lg"
          className="max-w-2xl"
        >
          <div className="space-y-6">
            <div className="border-b border-border-default pb-4">
              <h2 className="text-2xl font-bold">{t("home.modal.title")}</h2>
            </div>

            <div className="space-y-4">
              <p>{t("home.modal.welcomeMessage")}</p>
              <p>{t("home.modal.description")}</p>
            </div>

            <div className="flex justify-end gap-2 border-t border-border-default pt-4">
              <Button variant="ghost">{t("home.modal.secondaryButton")}</Button>
              <Button>{t("home.modal.primaryButton")}</Button>
            </div>
          </div>
        </ServerModal>

        {/* Auto-open Modal */}
        <ServerModal defaultOpen={true} size="sm">
          <p className="text-center">{t("home.modal.autoOpenMessage")}</p>
        </ServerModal>
      </div>
    </div>
  );
}
