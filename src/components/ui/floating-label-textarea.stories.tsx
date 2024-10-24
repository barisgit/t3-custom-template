import type { Meta, StoryObj } from "@storybook/react";
import LabelTextarea from "./floating-label-textarea";

const meta: Meta<typeof LabelTextarea> = {
  title: "UI/LabelTextarea",
  component: LabelTextarea,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LabelTextarea>;

export const Default: Story = {
  args: {
    id: "default-textarea",
    label: "Description",
    value: "",
    onChange: (e) => console.log(e.target.value),
  },
};

export const Filled: Story = {
  args: {
    id: "filled-textarea",
    label: "Description",
    value:
      "This is a sample text in the textarea.\nIt can span multiple lines.",
    onChange: (e) => console.log(e.target.value),
  },
};

export const CustomRows: Story = {
  args: {
    id: "custom-rows-textarea",
    label: "Large Description",
    rows: 8,
    value: "",
    onChange: (e) => console.log(e.target.value),
  },
};
