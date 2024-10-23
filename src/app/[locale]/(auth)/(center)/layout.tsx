export const dynamic = "force-dynamic";

export default function CenteredLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center pt-24">
      {children}
    </div>
  );
}
