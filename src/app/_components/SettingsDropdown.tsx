"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Settings, Globe } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuSub,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import ThemeSwitch from "./ThemeSwitch";
import { routing } from "~/i18n/routing";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";
import { useLocale } from "next-intl";

export default function SettingsDropdown() {
  const t = useTranslations("SettingsDropdown");
  const locale = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t("settings")}>
          <Settings className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t("settings")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <ThemeSwitch />
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Globe className="mr-2 h-4 w-4" />
              <span>{t("language")}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <LocaleSwitcherSelect defaultValue={locale} label={t("label")}>
                  {routing.locales.map((cur) => (
                    <option key={cur} value={cur}>
                      {t("locale", { locale: cur })}
                    </option>
                  ))}
                </LocaleSwitcherSelect>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
