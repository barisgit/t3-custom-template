import type { Meta, StoryObj } from "@storybook/react";
import Modal from "./modal";

const meta: Meta<typeof Modal> = {
  title: "UI/Modal",
  component: Modal,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Small: Story = {
  args: {
    size: "sm",
    onClose: () => console.log("Modal closed"),
    children: <div className="p-4">Small Modal Content</div>,
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    onClose: () => console.log("Modal closed"),
    children: <div className="p-4">Medium Modal Content</div>,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    onClose: () => console.log("Modal closed"),
    children: <div className="p-4">Large Modal Content</div>,
  },
};

export const NoCloseButton: Story = {
  args: {
    showCloseButton: false,
    onClose: () => console.log("Modal closed"),
    children: <div className="p-4">Modal without close button</div>,
  },
};
