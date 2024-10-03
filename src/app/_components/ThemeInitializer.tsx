"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { setTheme } from "~/redux/themeSlice";

export function ThemeInitializer() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      dispatch(setTheme(storedTheme as "light" | "dark"));
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      dispatch(setTheme("dark"));
    }
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return null;
}
