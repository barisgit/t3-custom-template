import React from "react";
import { Link } from "~/i18n/routing";
import ThemeSwitch from "~/app/_components/ThemeSwitch";
import LocaleSwitcher from "~/app/_components/LocaleSwitcher";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const clerkAppearance = {
  elements: {
    formButtonPrimary: "btn btn-primary",
    card: "bg-base-100 shadow-xl p-4",
    headerTitle: "text-2xl font-bold text-base-content",
    headerSubtitle: "text-base-content/70",
    socialButtonsBlockButton: "btn btn-outline gap-2 mb-2",
    formFieldLabel: "text-base-content/70",
    formFieldInput: "input input-bordered w-full",
    footerActionLink: "link link-primary",
    identityPreviewEditButton: "btn btn-ghost btn-xs",
    avatarBox: "w-10 h-10",
    userButtonPopoverCard: "bg-base-200 shadow-xl mt-2",
    userButtonPopoverActions: "p-2",
    userButtonPopoverActionButton: "btn btn-ghost justify-start w-full",
    userPreviewMainIdentifier: "text-base-content font-semibold",
    userPreviewSecondaryIdentifier: "text-base-content/70",
  },
};

const Navbar: React.FC = () => {
  return (
    <nav className="navbar bg-base-100">
      {/* Logo */}
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl">
          <span className="font-bold">daisyUI</span>
        </Link>
      </div>

      {/* Center links */}
      <div className="navbar-center hidden flex-grow justify-center lg:flex">
        <ul className="menu menu-horizontal">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="px-3">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right links */}
      <div className="navbar-end">
        <SignedOut>
          <SignInButton appearance={clerkAppearance} />
        </SignedOut>
        <SignedIn>
          <UserButton appearance={clerkAppearance} />
        </SignedIn>

        {/* Settings Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div
            tabIndex={0}
            className="w-35 menu dropdown-content menu-sm z-[1] mt-3 flex flex-col rounded-box bg-base-100 p-2 shadow"
          >
            <ThemeSwitch size={28} />
            <LocaleSwitcher />
          </div>
        </div>
        <div className="flex-none lg:hidden">
          <div className="flex items-center gap-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-circle btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
              >
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
