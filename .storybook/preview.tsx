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
    backgrounds: {
      disable: true,
    },
    darkMode: {
      current: "light",
      stylePreview: true,
      classTarget: "html",
      dark: { className: "dark" },
      light: { className: "" },
    },
    layout: "fullscreen", // This ensures the story takes full width
  },
  decorators: [
    (Story) => (
      <Providers>
        <NextIntlClientProvider locale="en" messages={{}}>
          <div className="w-full bg-background-default text-text-primary transition-colors">
            <div className="p-4">
              <Story />
            </div>
          </div>
        </NextIntlClientProvider>
      </Providers>
    ),
  ],
};

export default preview;
