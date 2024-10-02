import Navbar from "~/app/_components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <body>
        <Navbar />
        {children}
      </body>
    </ClerkProvider>
  );
}
