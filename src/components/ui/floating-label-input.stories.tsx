import type { Meta, StoryObj } from "@storybook/react";
import BoxFloatingLabelInput from "./floating-label-input";

const meta: Meta<typeof BoxFloatingLabelInput> = {
  title: "UI/FloatingLabelInput",
  component: BoxFloatingLabelInput,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BoxFloatingLabelInput>;

export const Default: Story = {
  args: {
    id: "default-input",
    label: "Default Input",
    value: "",
    onChange: (e) => console.log(e.target.value),
  },
};

export const Filled: Story = {
  args: {
    id: "filled-input",
    label: "Filled Input",
    value: "Sample text",
    onChange: (e) => console.log(e.target.value),
  },
};

export const Password: Story = {
  args: {
    id: "password-input",
    label: "Password",
    type: "password",
    value: "",
    onChange: (e) => console.log(e.target.value),
  },
};
