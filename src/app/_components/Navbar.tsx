import React from "react";
import { Link } from "~/i18n/routing";
import SettingsDropdown from "~/app/_components/SettingsDropdown";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import ClientNavbar from "~/app/_components/ClientNavbar";

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
    <nav className="bg-background-default dark:bg-dark-background-default shadow-elevation-1 px-4 py-2">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-text-primary text-xl font-bold">
            Logo
          </Link>
        </div>

        {/* Center links (desktop) */}
        <div className="hidden flex-grow justify-center lg:flex">
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

        {/* Right links */}
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="hover:bg-primary-600 bg-primary rounded px-4 py-2 text-white">
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
