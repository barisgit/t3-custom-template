import "../src/styles/globals.css";
import "../src/styles/themes.css";
import { Providers } from "../src/context/reduxProvider";
import { NextIntlClientProvider } from "next-intl";
import type { Preview } from "@storybook/react";
import React from "react";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <Providers>
        <NextIntlClientProvider locale="en" messages={{}}>
          <div className="min-h-screen bg-background-default p-4">
            <Story />
          </div>
        </NextIntlClientProvider>
      </Providers>
    ),
  ],
};

export default preview;
