import type { Meta, StoryObj } from "@storybook/react";
import SettingsDropdown from "./SettingsDropdown";
import ThemeSwitch from "./ThemeSwitch";
import LocaleSwitcher from "./LocaleSwitcher";
import { Provider } from "react-redux";
import { store } from "~/redux/store";

const meta = {
  title: "Settings",
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
  parameters: {
    layout: "centered",
  },
} satisfies Meta;

export default meta;

export const SettingsMenu: StoryObj = {
  render: () => <SettingsDropdown />,
  parameters: {
    docs: {
      description: {
        story: "Settings dropdown menu with theme and language options.",
      },
    },
  },
};

export const ThemeSwitcher: StoryObj = {
  render: () => <ThemeSwitch />,
  parameters: {
    docs: {
      description: {
        story:
          "Theme switch component for toggling between light and dark modes.",
      },
    },
  },
};

export const LanguageSwitcher: StoryObj = {
  render: () => <LocaleSwitcher />,
  parameters: {
    docs: {
      description: {
        story:
          "Language switcher component for changing the application locale.",
      },
    },
  },
};
