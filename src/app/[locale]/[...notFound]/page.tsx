import { notFound } from "next/navigation";

export default function CatchAllPage() {
  notFound();
}

export function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "fr" },
    // Add other locales you want to pre-render
  ];
}
