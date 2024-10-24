import type { Meta, StoryObj } from "@storybook/react";
import FloatingLabelSelect from "./floating-label-select";

const meta: Meta<typeof FloatingLabelSelect> = {
  title: "UI/FloatingLabelSelect",
  component: FloatingLabelSelect,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FloatingLabelSelect>;

const sampleOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

export const Default: Story = {
  args: {
    id: "default-select",
    label: "Select Option",
    options: sampleOptions,
    value: "",
    onChange: (e) => console.log(e.target.value),
  },
};

export const WithSelection: Story = {
  args: {
    id: "selected-select",
    label: "Select Option",
    options: sampleOptions,
    value: "option2",
    onChange: (e) => console.log(e.target.value),
  },
};
