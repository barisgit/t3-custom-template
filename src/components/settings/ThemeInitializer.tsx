"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "~/redux/hooks";
import { setTheme } from "~/redux/slices/themeSlice";

export const ThemeInitializer = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initialize theme based on system preference if not set
    if (!theme) {
      console.log("No theme found, setting system theme");
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      dispatch(setTheme(systemTheme));
    }
  }, [theme, dispatch]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return null;
};
