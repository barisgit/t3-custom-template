"use client";

import React from "react";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { ChangeEvent, ReactNode, useTransition } from "react";
import { Locale, usePathname, useRouter } from "~/i18n/routing";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(nextLocale: Locale) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      );
    });
    router.refresh();
  }

  return (
    <div className="flex flex-col items-start">
      <span
        className={clsx("mb-2 text-sm font-medium", isPending && "opacity-50")}
      >
        {label}
      </span>
      <ul className="space-y-1">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return (
              <li>
                <button
                  onClick={() => onSelectChange(child.props.value as Locale)}
                  className={clsx(
                    "rounded-md px-3 py-1 text-sm transition-colors",
                    child.props.value === defaultValue
                      ? "bg-primary text-primary-content"
                      : "bg-base-200 hover:bg-base-300",
                  )}
                  disabled={isPending}
                >
                  {child.props.children}
                </button>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
}
