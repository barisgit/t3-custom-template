import React from "react";
import { Link } from "~/i18n/routing";
import ThemeSwitch from "~/app/_components/ThemeSwitch";
import Image from "next/image";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

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
        <div className="flex-none">
          <ThemeSwitch />
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
                className="menu dropdown-content menu-sm rounded-box bg-base-100 z-[1] mt-3 w-52 p-2 shadow"
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

        {/* <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="avatar btn btn-circle btn-ghost"
          >
            <div className="w-10 rounded-full">
              {session?.user.image ? (
                <Image
                  alt="Tailwind CSS Navbar component"
                  src={session.user.image}
                  width={100}
                  height={100}
                />
              ) : session ? (
                <Image
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  width={100}
                  height={100}
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-10 w-10"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </div>
          {session ? (
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm rounded-box bg-base-100 z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <Link href="/settings">Settings</Link>
              </li>
              <li>
                <SignOutButton className="w-full text-left">
                  Logout
                </SignOutButton>
              </li>
            </ul>
          ) : (
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm rounded-box bg-base-100 z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/auth/signin">Login</Link>
              </li>
              <li>
                <Link href="/auth/new-user">Register</Link>
              </li>
            </ul>
          )}
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
