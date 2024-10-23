import "~/styles/globals.css";
import "~/styles/themes.css";

import Navbar from "~/components/navigation/Navbar";
import { AuthProvider } from "~/context/clerkProvider";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { AppConfig } from "~/AppConfig";
import { Providers } from "~/context/reduxProvider";
import { TRPCReactProvider } from "~/trpc/react";
import { ThemeInitializer } from "~/components/settings/ThemeInitializer";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: AppConfig.website_name,
  description: AppConfig.website_description,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export function generateStaticParams() {
  return AppConfig.locales.map((locale) => ({ locale }));
}

export default function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(props.params.locale);

  // Using internationalization in Client Components
  const messages = useMessages();

  return (
    <html
      lang={props.params.locale}
      className="bg-background-default text-text-primary"
    >
      <body>
        <Providers>
          <TRPCReactProvider>
            <AuthProvider>
              <NextIntlClientProvider
                locale={props.params.locale}
                messages={messages}
              >
                <ThemeInitializer />
                <Navbar />
                {props.children}
              </NextIntlClientProvider>
            </AuthProvider>
          </TRPCReactProvider>
        </Providers>
      </body>
    </html>
  );
}
