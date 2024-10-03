import React from "react";

const ClientNavbar: React.FC<{
  links: { href: string; label: string }[];
  clerkAppearance: any;
}> = ({ links, clerkAppearance }) => {
  return (
    <div className="client-navbar">
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
  );
};

export default ClientNavbar;
