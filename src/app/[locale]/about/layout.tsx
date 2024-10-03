import { ReactNode } from "react";

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="-mt-24 flex min-h-screen items-center justify-center">
      <div>{children}</div>
    </div>
  );
}
