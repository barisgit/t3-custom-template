import { SignUp } from "@clerk/nextjs";
import { getTranslations } from "next-intl/server";
import { useLocale } from "next-intl";
import { getI18nPath } from "~/utils/Helpers";

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: "SignUp",
  });

  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}

const SignUpPage = (props: { params: { locale: string } }) => {
  const locale = useLocale();

  return <SignUp path={getI18nPath("/sign-up", locale)} />;
};

export default SignUpPage;
