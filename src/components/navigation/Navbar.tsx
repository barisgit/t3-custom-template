import React from "react";
import { Link } from "~/i18n/routing";
import SettingsDropdown from "~/components/settings/SettingsDropdown";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import ClientNavbar from "~/components/navigation/ClientNavbar";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const clerkAppearance = {
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

const Navbar: React.FC = () => {
  return (
    <nav className="bg-background-default px-4 py-2 shadow-elevation-1 dark:bg-dark-background-default">
      <div className="container mx-auto flex items-center">
        {/* Logo (Left column) */}
        <div className="flex-1">
          <Link href="/" className="text-xl font-bold text-text-primary">
            Logo
          </Link>
        </div>

        {/* Center links (desktop) */}
        <div className="hidden flex-1 justify-center sm:flex">
          <ul className="flex space-x-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href as "/"}
                  className="text-text-primary hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden sm:flex">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="rounded bg-primary px-4 py-2 text-white hover:bg-primary-600">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton appearance={clerkAppearance} />
            </SignedIn>

            {/* Settings Dropdown */}
            <SettingsDropdown />
          </div>

          {/* Client-side mobile menu */}
          <ClientNavbar links={links} clerkAppearance={clerkAppearance} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
