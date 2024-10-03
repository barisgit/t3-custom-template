"use client";

import React, { useState } from "react";
import { Link } from "~/i18n/routing";
import {
  SignInButton,
  SignedIn,
  SignOutButton,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import ThemeSwitch from "~/app/_components/ThemeSwitch";
import LocaleSwitcher from "~/app/_components/LocaleSwitcher";
import type { Appearance } from "~/types/global";

interface ClientNavbarProps {
  links: { href: string; label: string }[];
  clerkAppearance: Appearance;
}

const ClientNavbar: React.FC<ClientNavbarProps> = ({
  links,
  clerkAppearance,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const t = useTranslations("navbar");
  const { user } = useUser();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="text-text-primary hover:bg-background-level1 rounded-full p-2 sm:hidden"
        onClick={toggleSidebar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
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
      </button>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleSidebar}
          ></div>

          {/* Sidebar */}
          <div className="bg-background-paper fixed inset-y-0 right-0 w-64 shadow-lg transition-transform duration-300 ease-in-out">
            <div className="flex h-full flex-col justify-between">
              <div className="px-4 py-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="bg-background-level1 text-text-secondary grid h-10 w-32 place-content-center rounded-lg text-xs">
                    Logo
                  </span>
                  <button
                    onClick={toggleSidebar}
                    className="text-text-primary hover:text-primary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Move SignIn button and User profile here */}
                <div className="mb-6">
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="text-text-secondary hover:bg-background-level1 hover:text-text-primary w-full rounded-lg px-4 py-2 text-sm font-medium">
                        {t("signIn")}
                      </button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <div className="bg-background-paper hover:bg-background-level1 flex items-center gap-2 rounded-lg p-4">
                      <UserButton appearance={clerkAppearance} />
                      <div>
                        <p className="text-xs">
                          <strong className="block font-medium">
                            {user?.firstName} {user?.lastName}
                          </strong>
                          <span>{user?.primaryEmailAddress?.emailAddress}</span>
                        </p>
                      </div>
                    </div>
                    <SignOutButton>
                      <button className="text-text-secondary hover:bg-background-level1 hover:text-text-primary mt-2 w-full rounded-lg px-4 py-2 text-sm font-medium">
                        Logout
                      </button>
                    </SignOutButton>
                  </SignedIn>
                </div>

                <ul className="mt-6 space-y-1">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href as "/"}
                        className="text-text-secondary hover:bg-background-level1 hover:text-text-primary block rounded-lg px-4 py-2 text-sm font-medium"
                        onClick={toggleSidebar}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <ThemeSwitch size={28} />
                  <LocaleSwitcher />
                </div>
              </div>

              {/* Remove the sticky bottom section */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClientNavbar;
