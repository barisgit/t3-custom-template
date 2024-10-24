import type { Meta, StoryObj } from "@storybook/react";
import { Button, type ButtonProps } from "./button";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
A versatile button component that supports multiple variants, sizes, and colors.

## Features
- 8 different variants (default, destructive, ghost, link, solid, soft, outlined, outlined_simple)
- 4 sizes (default, small, large, icon)
- 8 color schemes (primary, secondary, tertiary, quaternary, warning, success, info, error)
- Support for disabled state
- Support for custom children
- Support for asChild pattern using Radix UI's Slot

## Usage

\`\`\`tsx
import { Button } from "~/components/ui/button"

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="solid">Solid Button</Button>

// With colors
<Button color="success">Success Button</Button>

// With sizes
<Button size="lg">Large Button</Button>
\`\`\`
`,
      },
    },
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "ghost",
        "link",
        "solid",
        "soft",
        "outlined",
        "outlined_simple",
      ],
      description: "The visual style of the button",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      description: "The size of the button",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "tertiary",
        "quaternary",
        "warning",
        "success",
        "info",
        "error",
      ],
      description: "The color scheme of the button",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    asChild: {
      control: "boolean",
      description:
        "Whether to render as a child component using Radix UI's Slot",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

// Base Variants
export const Default: Story = {
  args: {
    children: "Default Button",
    variant: "default",
  },
  parameters: {
    docs: {
      description: {
        story: "The default button style with primary color scheme.",
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid max-w-[800px] grid-cols-4 gap-2">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="solid">Solid</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="outlined_simple">Outlined Simple</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available button variants.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="grid max-w-[800px] grid-cols-4 items-center gap-2">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">🔍</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Available button sizes: small, default, large, and icon.",
      },
    },
  },
};

export const Colors: Story = {
  render: () => (
    <div className="grid max-w-[800px] grid-cols-4 gap-2">
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="tertiary">Tertiary</Button>
      <Button color="quaternary">Quaternary</Button>
      <Button color="warning">Warning</Button>
      <Button color="success">Success</Button>
      <Button color="info">Info</Button>
      <Button color="error">Error</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available color schemes for buttons.",
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="grid max-w-[800px] grid-cols-4 gap-2">
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button className="opacity-70">Hover</Button>
      <Button className="opacity-50">Active</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different button states: normal, disabled, hover, and active.",
      },
    },
  },
};

export const VariantsWithColors: Story = {
  render: () => (
    <div className="grid max-w-[800px] gap-2">
      {["default", "solid", "soft", "outlined", "outlined_simple"].map(
        (variant) => (
          <div key={variant} className="grid grid-cols-4 gap-2">
            <Button variant={variant as ButtonProps["variant"]} color="primary">
              Primary
            </Button>
            <Button
              variant={variant as ButtonProps["variant"]}
              color="secondary"
            >
              Secondary
            </Button>
            <Button variant={variant as ButtonProps["variant"]} color="success">
              Success
            </Button>
            <Button variant={variant as ButtonProps["variant"]} color="error">
              Error
            </Button>
          </div>
        ),
      )}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Combinations of variants with different color schemes.",
      },
    },
  },
};
