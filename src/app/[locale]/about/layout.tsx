import type { ReactNode } from "react";

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center pt-24">
      <div>{children}</div>
    </div>
  );
}
