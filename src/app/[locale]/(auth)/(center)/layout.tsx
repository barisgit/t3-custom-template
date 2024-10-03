import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function CenteredLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="-mt-8 flex min-h-screen items-center justify-center sm:-mt-24">
      {children}
    </div>
  );
}
