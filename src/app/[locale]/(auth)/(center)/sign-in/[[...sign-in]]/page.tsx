import { SignIn } from "@clerk/nextjs";
import { getTranslations } from "next-intl/server";
import { useLocale } from "next-intl";
import { getI18nPath } from "~/utils/Helpers";

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: "SignIn",
  });

  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}

const SignInPage = (props: { params: { locale: string } }) => {
  const locale = useLocale();

  return <SignIn path={getI18nPath("/sign-in", locale)} />;
};

export default SignInPage;
