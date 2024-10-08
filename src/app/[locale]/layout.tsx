import "~/styles/globals.css";
import "~/styles/themes.css";

import Navbar from "~/app/_components/Navbar";
import { AuthProvider } from "~/app/_context/clerkProvider";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { AppConfig } from "~/utils/AppConfig";
import { Providers } from "~/app/_context/reduxProvider";
import { TRPCReactProvider } from "~/trpc/react";
import { ThemeInitializer } from "~/app/_components/ThemeInitializer";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
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
