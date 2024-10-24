import type { Meta, StoryObj } from "@storybook/react";
import ClientNavbar from "./ClientNavbar";
import { Providers } from "~/context/reduxProvider";
import { NextIntlClientProvider } from "next-intl";
import { ClerkProvider } from "@clerk/nextjs";
import { useState } from "react";

// Mock translations
const mockTranslations = {
  navbar: {
    signIn: "Sign In",
    signOut: "Sign Out",
  },
  pages: {
    home: "Home",
    style: "Style",
    about: "About",
    admin: "Admin",
  },
};

// Mock links for stories
const mockLinks = [
  { href: "/", label: "Home" },
  { href: "/style", label: "Style" },
  { href: "/about", label: "About" },
  { href: "/admin", label: "Admin" },
];

const mockClerkAppearance = {
  elements: {
    formButtonPrimary:
      "bg-primary text-white px-4 py-2 rounded hover:bg-primary-600",
    card: "bg-background-paper shadow-elevation-2 p-4 rounded",
    headerTitle: "text-2xl font-bold text-text-primary",
    headerSubtitle: "text-text-secondary",
    socialButtonsBlockButton:
      "border border-border-default px-4 py-2 rounded mb-2 flex items-center justify-center gap-2",
    formFieldLabel: "text-text-secondary",
    formFieldInput: "w-full border border-border-default rounded px-3 py-2",
    footerActionLink: "text-primary hover:underline",
    identityPreviewEditButton: "text-sm text-primary hover:underline",
    avatarBox: "w-10 h-10",
    userButtonPopoverCard:
      "bg-background-paper shadow-elevation-2 mt-2 rounded",
    userButtonPopoverActions: "p-2",
    userButtonPopoverActionButton:
      "w-full text-left px-4 py-2 hover:bg-background-level1",
    userPreviewMainIdentifier: "font-semibold text-text-primary",
    userPreviewSecondaryIdentifier: "text-text-secondary",
  },
};

const meta = {
  title: "Navigation",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <ClerkProvider
        publishableKey={
          process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "pk_test"
        }
        appearance={mockClerkAppearance}
      >
        <Providers>
          <NextIntlClientProvider locale="en" messages={mockTranslations}>
            <div className="w-full bg-background-default text-text-primary">
              <Story />
            </div>
          </NextIntlClientProvider>
        </Providers>
      </ClerkProvider>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof ClientNavbar>;

// Create a simplified version of ClientNavbar without Clerk dependencies
const SimplifiedNavbar = ({ links }: { links: typeof mockLinks }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-40 w-full bg-background-default px-4 py-2 shadow-elevation-1">
      <div className="container mx-auto flex items-center">
        <div className="flex-1">
          <a href="/" className="text-xl font-bold text-text-primary">
            Logo
          </a>
        </div>

        <div className="hidden flex-1 justify-center sm:flex">
          <ul className="flex space-x-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-text-primary hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <button className="rounded bg-primary px-4 py-2 text-white hover:bg-primary-600">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

// Mobile Navigation Story
export const MobileNavigation: Story = {
  render: () => (
    <ClientNavbar links={mockLinks} clerkAppearance={mockClerkAppearance} />
  ),
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: "Mobile navigation component with hamburger menu and sidebar.",
      },
    },
  },
};

// Desktop Navigation Story (Using simplified version)
export const DesktopNavigation: Story = {
  render: () => <SimplifiedNavbar links={mockLinks} />,
  parameters: {
    docs: {
      description: {
        story: "Desktop navigation with full menu visible.",
      },
    },
  },
};

// Navigation with User Logged In
export const LoggedInNavigation: Story = {
  render: () => (
    <ClientNavbar links={mockLinks} clerkAppearance={mockClerkAppearance} />
  ),
  parameters: {
    docs: {
      description: {
        story: "Navigation bar when user is logged in.",
      },
    },
  },
};
