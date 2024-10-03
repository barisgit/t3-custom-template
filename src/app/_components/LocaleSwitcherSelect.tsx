"use client";

import React, { useTransition } from "react";
import clsx from "clsx";
import { useParams } from "next/navigation";
import type { ReactNode } from "react";
import { usePathname, useRouter } from "~/i18n/routing";
import type { Locale } from "~/i18n/routing";

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
    <div className="flex w-auto flex-col items-start">
      <ul className="space-y-1">
        {React.Children.map(children, (child) => {
          if (
            React.isValidElement<{
              value: Locale;
              children: React.ReactNode;
            }>(child)
          ) {
            const childValue = child.props.value;
            return (
              <li>
                <button
                  onClick={() => onSelectChange(childValue)}
                  className={clsx(
                    "rounded-md px-3 py-1 text-sm transition-colors",
                    childValue === defaultValue
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
