import { type Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";

export default {
  content: ["./src/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        error: {
          "50": "color-mix(in srgb, var(--color-error-50) calc(<alpha-value> * 100%), transparent)",
          "100":
            "color-mix(in srgb, var(--color-error-100) calc(<alpha-value> * 100%), transparent)",
          "200":
            "color-mix(in srgb, var(--color-error-200) calc(<alpha-value> * 100%), transparent)",
          "300":
            "color-mix(in srgb, var(--color-error-300) calc(<alpha-value> * 100%), transparent)",
          "400":
            "color-mix(in srgb, var(--color-error-400) calc(<alpha-value> * 100%), transparent)",
          "500":
            "color-mix(in srgb, var(--color-error-500) calc(<alpha-value> * 100%), transparent)",
          "600":
            "color-mix(in srgb, var(--color-error-600) calc(<alpha-value> * 100%), transparent)",
          "700":
            "color-mix(in srgb, var(--color-error-700) calc(<alpha-value> * 100%), transparent)",
          "800":
            "color-mix(in srgb, var(--color-error-800) calc(<alpha-value> * 100%), transparent)",
          "900":
            "color-mix(in srgb, var(--color-error-900) calc(<alpha-value> * 100%), transparent)",
          "1000":
            "color-mix(in srgb, var(--color-error-1000) calc(<alpha-value> * 100%), transparent)",
          "1100":
            "color-mix(in srgb, var(--color-error-1100) calc(<alpha-value> * 100%), transparent)",
          "1200":
            "color-mix(in srgb, var(--color-error-1200) calc(<alpha-value> * 100%), transparent)",
          DEFAULT:
            "color-mix(in srgb, var(--color-error-500) calc(<alpha-value> * 100%), transparent)",
          foreground:
            "color-mix(in srgb, var(--color-error-foreground) calc(<alpha-value> * 100%), transparent)",
        },
        warning: {
          "50": "color-mix(in srgb, var(--color-warning-50) calc(<alpha-value> * 100%), transparent)",
          "100":
            "color-mix(in srgb, var(--color-warning-100) calc(<alpha-value> * 100%), transparent)",
          "200":
            "color-mix(in srgb, var(--color-warning-200) calc(<alpha-value> * 100%), transparent)",
          "300":
            "color-mix(in srgb, var(--color-warning-300) calc(<alpha-value> * 100%), transparent)",
          "400":
            "color-mix(in srgb, var(--color-warning-400) calc(<alpha-value> * 100%), transparent)",
          "500":
            "color-mix(in srgb, var(--color-warning-500) calc(<alpha-value> * 100%), transparent)",
          "600":
            "color-mix(in srgb, var(--color-warning-600) calc(<alpha-value> * 100%), transparent)",
          "700":
            "color-mix(in srgb, var(--color-warning-700) calc(<alpha-value> * 100%), transparent)",
          "800":
            "color-mix(in srgb, var(--color-warning-800) calc(<alpha-value> * 100%), transparent)",
          "900":
            "color-mix(in srgb, var(--color-warning-900) calc(<alpha-value> * 100%), transparent)",
          "1000":
            "color-mix(in srgb, var(--color-warning-1000) calc(<alpha-value> * 100%), transparent)",
          "1100":
            "color-mix(in srgb, var(--color-warning-1100) calc(<alpha-value> * 100%), transparent)",
          "1200":
            "color-mix(in srgb, var(--color-warning-1200) calc(<alpha-value> * 100%), transparent)",
          DEFAULT:
            "color-mix(in srgb, var(--color-warning-500) calc(<alpha-value> * 100%), transparent)",
          foreground:
            "color-mix(in srgb, var(--color-warning-foreground) calc(<alpha-value> * 100%), transparent)",
        },
        success: {
          "50": "color-mix(in srgb, var(--color-success-50) calc(<alpha-value> * 100%), transparent)",
          "100":
            "color-mix(in srgb, var(--color-success-100) calc(<alpha-value> * 100%), transparent)",
          "200":
            "color-mix(in srgb, var(--color-success-200) calc(<alpha-value> * 100%), transparent)",
          "300":
            "color-mix(in srgb, var(--color-success-300) calc(<alpha-value> * 100%), transparent)",
          "400":
            "color-mix(in srgb, var(--color-success-400) calc(<alpha-value> * 100%), transparent)",
          "500":
            "color-mix(in srgb, var(--color-success-500) calc(<alpha-value> * 100%), transparent)",
          "600":
            "color-mix(in srgb, var(--color-success-600) calc(<alpha-value> * 100%), transparent)",
          "700":
            "color-mix(in srgb, var(--color-success-700) calc(<alpha-value> * 100%), transparent)",
          "800":
            "color-mix(in srgb, var(--color-success-800) calc(<alpha-value> * 100%), transparent)",
          "900":
            "color-mix(in srgb, var(--color-success-900) calc(<alpha-value> * 100%), transparent)",
          "1000":
            "color-mix(in srgb, var(--color-success-1000) calc(<alpha-value> * 100%), transparent)",
          "1100":
            "color-mix(in srgb, var(--color-success-1100) calc(<alpha-value> * 100%), transparent)",
          "1200":
            "color-mix(in srgb, var(--color-success-1200) calc(<alpha-value> * 100%), transparent)",
          DEFAULT:
            "color-mix(in srgb, var(--color-success-500) calc(<alpha-value> * 100%), transparent)",
          foreground:
            "color-mix(in srgb, var(--color-success-foreground) calc(<alpha-value> * 100%), transparent)",
        },
        info: {
          "50": "color-mix(in srgb, var(--color-info-50) calc(<alpha-value> * 100%), transparent)",
          "100":
            "color-mix(in srgb, var(--color-info-100) calc(<alpha-value> * 100%), transparent)",
          "200":
            "color-mix(in srgb, var(--color-info-200) calc(<alpha-value> * 100%), transparent)",
          "300":
            "color-mix(in srgb, var(--color-info-300) calc(<alpha-value> * 100%), transparent)",
          "400":
            "color-mix(in srgb, var(--color-info-400) calc(<alpha-value> * 100%), transparent)",
          "500":
            "color-mix(in srgb, var(--color-info-500) calc(<alpha-value> * 100%), transparent)",
          "600":
            "color-mix(in srgb, var(--color-info-600) calc(<alpha-value> * 100%), transparent)",
          "700":
            "color-mix(in srgb, var(--color-info-700) calc(<alpha-value> * 100%), transparent)",
          "800":
            "color-mix(in srgb, var(--color-info-800) calc(<alpha-value> * 100%), transparent)",
          "900":
            "color-mix(in srgb, var(--color-info-900) calc(<alpha-value> * 100%), transparent)",
          "1000":
            "color-mix(in srgb, var(--color-info-1000) calc(<alpha-value> * 100%), transparent)",
          "1100":
            "color-mix(in srgb, var(--color-info-1100) calc(<alpha-value> * 100%), transparent)",
          "1200":
            "color-mix(in srgb, var(--color-info-1200) calc(<alpha-value> * 100%), transparent)",
          DEFAULT:
            "color-mix(in srgb, var(--color-info-500) calc(<alpha-value> * 100%), transparent)",
          foreground:
            "color-mix(in srgb, var(--color-info-foreground) calc(<alpha-value> * 100%), transparent)",
        },
        primary: {
          "50": "color-mix(in srgb, var(--color-primary-50) calc(<alpha-value> * 100%), transparent)",
          "100":
            "color-mix(in srgb, var(--color-primary-100) calc(<alpha-value> * 100%), transparent)",
          "200":
            "color-mix(in srgb, var(--color-primary-200) calc(<alpha-value> * 100%), transparent)",
          "300":
            "color-mix(in srgb, var(--color-primary-300) calc(<alpha-value> * 100%), transparent)",
          "400":
            "color-mix(in srgb, var(--color-primary-400) calc(<alpha-value> * 100%), transparent)",
          "500":
            "color-mix(in srgb, var(--color-primary-500) calc(<alpha-value> * 100%), transparent)",
          "600":
            "color-mix(in srgb, var(--color-primary-600) calc(<alpha-value> * 100%), transparent)",
          "700":
            "color-mix(in srgb, var(--color-primary-700) calc(<alpha-value> * 100%), transparent)",
          "800":
            "color-mix(in srgb, var(--color-primary-800) calc(<alpha-value> * 100%), transparent)",
          "900":
            "color-mix(in srgb, var(--color-primary-900) calc(<alpha-value> * 100%), transparent)",
          DEFAULT:
            "color-mix(in srgb, var(--color-primary-500) calc(<alpha-value> * 100%), transparent)",
          foreground:
            "color-mix(in srgb, var(--color-primary-foreground) calc(<alpha-value> * 100%), transparent)",
        },
        secondary: {
          "50": "color-mix(in srgb, var(--color-secondary-50) calc(<alpha-value> * 100%), transparent)",
          "100":
            "color-mix(in srgb, var(--color-secondary-100) calc(<alpha-value> * 100%), transparent)",
          "200":
            "color-mix(in srgb, var(--color-secondary-200) calc(<alpha-value> * 100%), transparent)",
          "300":
            "color-mix(in srgb, var(--color-secondary-300) calc(<alpha-value> * 100%), transparent)",
          "400":
            "color-mix(in srgb, var(--color-secondary-400) calc(<alpha-value> * 100%), transparent)",
          "500":
            "color-mix(in srgb, var(--color-secondary-500) calc(<alpha-value> * 100%), transparent)",
          "600":
            "color-mix(in srgb, var(--color-secondary-600) calc(<alpha-value> * 100%), transparent)",
          "700":
            "color-mix(in srgb, var(--color-secondary-700) calc(<alpha-value> * 100%), transparent)",
          "800":
            "color-mix(in srgb, var(--color-secondary-800) calc(<alpha-value> * 100%), transparent)",
          "900":
            "color-mix(in srgb, var(--color-secondary-900) calc(<alpha-value> * 100%), transparent)",
          DEFAULT:
            "color-mix(in srgb, var(--color-secondary-500) calc(<alpha-value> * 100%), transparent)",
          foreground:
            "color-mix(in srgb, var(--color-secondary-foreground) calc(<alpha-value> * 100%), transparent)",
        },
        tertiary: {
          "50": "color-mix(in srgb, var(--color-tertiary-50) calc(<alpha-value> * 100%), transparent)",
          "100":
            "color-mix(in srgb, var(--color-tertiary-100) calc(<alpha-value> * 100%), transparent)",
          "200":
            "color-mix(in srgb, var(--color-tertiary-200) calc(<alpha-value> * 100%), transparent)",
          "300":
            "color-mix(in srgb, var(--color-tertiary-300) calc(<alpha-value> * 100%), transparent)",
          "400":
            "color-mix(in srgb, var(--color-tertiary-400) calc(<alpha-value> * 100%), transparent)",
          "500":
            "color-mix(in srgb, var(--color-tertiary-500) calc(<alpha-value> * 100%), transparent)",
          "600":
            "color-mix(in srgb, var(--color-tertiary-600) calc(<alpha-value> * 100%), transparent)",
          "700":
            "color-mix(in srgb, var(--color-tertiary-700) calc(<alpha-value> * 100%), transparent)",
          "800":
            "color-mix(in srgb, var(--color-tertiary-800) calc(<alpha-value> * 100%), transparent)",
          "900":
            "color-mix(in srgb, var(--color-tertiary-900) calc(<alpha-value> * 100%), transparent)",
          DEFAULT:
            "color-mix(in srgb, var(--color-tertiary-500) calc(<alpha-value> * 100%), transparent)",
          foreground:
            "color-mix(in srgb, var(--color-tertiary-foreground) calc(<alpha-value> * 100%), transparent)",
        },
        quaternary: {
          "50": "color-mix(in srgb, var(--color-quaternary-50) calc(<alpha-value> * 100%), transparent)",
          "100":
            "color-mix(in srgb, var(--color-quaternary-100) calc(<alpha-value> * 100%), transparent)",
          "200":
            "color-mix(in srgb, var(--color-quaternary-200) calc(<alpha-value> * 100%), transparent)",
          "300":
            "color-mix(in srgb, var(--color-quaternary-300) calc(<alpha-value> * 100%), transparent)",
          "400":
            "color-mix(in srgb, var(--color-quaternary-400) calc(<alpha-value> * 100%), transparent)",
          "500":
            "color-mix(in srgb, var(--color-quaternary-500) calc(<alpha-value> * 100%), transparent)",
          "600":
            "color-mix(in srgb, var(--color-quaternary-600) calc(<alpha-value> * 100%), transparent)",
          "700":
            "color-mix(in srgb, var(--color-quaternary-700) calc(<alpha-value> * 100%), transparent)",
          "800":
            "color-mix(in srgb, var(--color-quaternary-800) calc(<alpha-value> * 100%), transparent)",
          "900":
            "color-mix(in srgb, var(--color-quaternary-900) calc(<alpha-value> * 100%), transparent)",
          DEFAULT:
            "color-mix(in srgb, var(--color-quaternary-500) calc(<alpha-value> * 100%), transparent)",
          foreground:
            "color-mix(in srgb, var(--color-quaternary-foreground) calc(<alpha-value> * 100%), transparent)",
        },
        background: {
          default:
            "color-mix(in srgb, var(--color-background-default) calc(<alpha-value> * 100%), transparent)",
          paper:
            "color-mix(in srgb, var(--color-background-paper) calc(<alpha-value> * 100%), transparent)",
          level1:
            "color-mix(in srgb, var(--color-background-level1) calc(<alpha-value> * 100%), transparent)",
          level2:
            "color-mix(in srgb, var(--color-background-level2) calc(<alpha-value> * 100%), transparent)",
          level3:
            "color-mix(in srgb, var(--color-background-level3) calc(<alpha-value> * 100%), transparent)",
          light:
            "color-mix(in srgb, var(--color-background-light) calc(<alpha-value> * 100%), transparent)",
          dark: "color-mix(in srgb, var(--color-background-dark) calc(<alpha-value> * 100%), transparent)",
        },
        text: {
          primary:
            "color-mix(in srgb, var(--color-text-primary) calc(<alpha-value> * 100%), transparent)",
          secondary:
            "color-mix(in srgb, var(--color-text-secondary) calc(<alpha-value> * 100%), transparent)",
          accent:
            "color-mix(in srgb, var(--color-text-accent) calc(<alpha-value> * 100%), transparent)",
        },
        border: {
          default:
            "color-mix(in srgb, var(--color-border-default) calc(<alpha-value> * 100%), transparent)",
          light:
            "color-mix(in srgb, var(--color-border-light) calc(<alpha-value> * 100%), transparent)",
          dark: "color-mix(in srgb, var(--color-border-dark) calc(<alpha-value> * 100%), transparent)",
          accent:
            "color-mix(in srgb, var(--color-border-accent) calc(<alpha-value> * 100%), transparent)",
        },
        light: {
          background: {
            default:
              "color-mix(in srgb, var(--color-light-background-default) calc(<alpha-value> * 100%), transparent)",
            paper:
              "color-mix(in srgb, var(--color-light-background-paper) calc(<alpha-value> * 100%), transparent)",
            level1:
              "color-mix(in srgb, var(--color-light-background-level1) calc(<alpha-value> * 100%), transparent)",
            level2:
              "color-mix(in srgb, var(--color-light-background-level2) calc(<alpha-value> * 100%), transparent)",
            level3:
              "color-mix(in srgb, var(--color-light-background-level3) calc(<alpha-value> * 100%), transparent)",
            light:
              "color-mix(in srgb, var(--color-light-background-light) calc(<alpha-value> * 100%), transparent)",
            dark: "color-mix(in srgb, var(--color-light-background-dark) calc(<alpha-value> * 100%), transparent)",
          },
          text: {
            primary:
              "color-mix(in srgb, var(--color-light-text-primary) calc(<alpha-value> * 100%), transparent)",
            secondary:
              "color-mix(in srgb, var(--color-light-text-secondary) calc(<alpha-value> * 100%), transparent)",
            accent:
              "color-mix(in srgb, var(--color-light-text-accent) calc(<alpha-value> * 100%), transparent)",
          },
          border: {
            default:
              "color-mix(in srgb, var(--color-light-border-default) calc(<alpha-value> * 100%), transparent)",
            light:
              "color-mix(in srgb, var(--color-light-border-light) calc(<alpha-value> * 100%), transparent)",
            dark: "color-mix(in srgb, var(--color-light-border-dark) calc(<alpha-value> * 100%), transparent)",
            accent:
              "color-mix(in srgb, var(--color-light-border-accent) calc(<alpha-value> * 100%), transparent)",
          },
        },
        dark: {
          background: {
            default:
              "color-mix(in srgb, var(--color-dark-background-default) calc(<alpha-value> * 100%), transparent)",
            paper:
              "color-mix(in srgb, var(--color-dark-background-paper) calc(<alpha-value> * 100%), transparent)",
            level1:
              "color-mix(in srgb, var(--color-dark-background-level1) calc(<alpha-value> * 100%), transparent)",
            level2:
              "color-mix(in srgb, var(--color-dark-background-level2) calc(<alpha-value> * 100%), transparent)",
            level3:
              "color-mix(in srgb, var(--color-dark-background-level3) calc(<alpha-value> * 100%), transparent)",
            light:
              "color-mix(in srgb, var(--color-dark-background-light) calc(<alpha-value> * 100%), transparent)",
            dark: "color-mix(in srgb, var(--color-dark-background-dark) calc(<alpha-value> * 100%), transparent)",
          },
          text: {
            primary:
              "color-mix(in srgb, var(--color-dark-text-primary) calc(<alpha-value> * 100%), transparent)",
            secondary:
              "color-mix(in srgb, var(--color-dark-text-secondary) calc(<alpha-value> * 100%), transparent)",
            accent:
              "color-mix(in srgb, var(--color-dark-text-accent) calc(<alpha-value> * 100%), transparent)",
          },
          border: {
            default:
              "color-mix(in srgb, var(--color-dark-border-default) calc(<alpha-value> * 100%), transparent)",
            light:
              "color-mix(in srgb, var(--color-dark-border-light) calc(<alpha-value> * 100%), transparent)",
            dark: "color-mix(in srgb, var(--color-dark-border-dark) calc(<alpha-value> * 100%), transparent)",
            accent:
              "color-mix(in srgb, var(--color-dark-border-accent) calc(<alpha-value> * 100%), transparent)",
          },
        },
      },
      spacing: {
        "128": "32rem",
        "144": "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      boxShadow: {
        "elevation-0": "none",
        "elevation-1": "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        "elevation-2": "0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)",
        "elevation-3":
          "0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)",
        "elevation-4":
          "0 15px 25px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.05)",
        "elevation-5": "0 20px 40px rgba(0,0,0,0.2)",
      },
      keyframes: {
        enter: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(0.9)", opacity: "0" },
        },
      },
      animation: {
        enter: "enter 200ms ease-out",
        leave: "leave 150ms ease-in forwards",
      },
    },
  },
  plugins: [animatePlugin],
} satisfies Config;
