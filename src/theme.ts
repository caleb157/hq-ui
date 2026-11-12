// Theme switching is three data attributes. This helper only sets them.
//   data-theme   = "work" | "personal"
//   data-mode    = "light" | "dark"        (absent means follow the system)
//   data-density = "compact" | "comfortable" (absent means the theme's default)

export type ThemeName = "work" | "personal";
export type Mode = "system" | "light" | "dark";
export type Density = "default" | "compact" | "comfortable";

export type ThemeSettings = { theme: ThemeName; mode?: Mode; density?: Density };

/** Attributes to spread onto <html> or any wrapper, for server rendering. */
export function themeAttrs({ theme, mode = "system", density = "default" }: ThemeSettings) {
  return {
    "data-theme": theme,
    "data-mode": mode === "system" ? undefined : mode,
    "data-density": density === "default" ? undefined : density,
  };
}

/** Sets the attributes on a live element. Defaults to <html>. */
export function applyTheme(settings: ThemeSettings, el: HTMLElement = document.documentElement) {
  for (const [name, value] of Object.entries(themeAttrs(settings))) {
    if (value === undefined) el.removeAttribute(name);
    else el.setAttribute(name, value);
  }
}
