import type { Meta, StoryObj } from "@storybook/react";
import { Toast, ToastProvider, ToastViewport } from "./toast";
import { Providers } from "~/context/reduxProvider";
import { NextIntlClientProvider } from "next-intl";

const meta: Meta<typeof Toast> = {
  title: "UI/Toast",
  component: Toast,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Providers>
        <NextIntlClientProvider locale="en" messages={{}}>
          <div className="w-full bg-background-default text-text-primary transition-colors">
            <div className="p-12">
              <ToastProvider>
                <Story />
                <ToastViewport />
              </ToastProvider>
            </div>
          </div>
        </NextIntlClientProvider>
      </Providers>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    children: "This is a default toast message",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "This is a destructive toast message",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "This is a success toast message",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "This is a warning toast message",
  },
};
