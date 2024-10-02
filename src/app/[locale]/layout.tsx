import Navbar from "~/app/_components/Navbar";
import { AuthProvider } from "~/app/_context/clerkProvider";
export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Navbar />
      {children}
    </AuthProvider>
  );
}
