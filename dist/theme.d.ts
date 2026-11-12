export type ThemeName = "work" | "personal";
export type Mode = "system" | "light" | "dark";
export type Density = "default" | "compact" | "comfortable";
export type ThemeSettings = {
    theme: ThemeName;
    mode?: Mode;
    density?: Density;
};
/** Attributes to spread onto <html> or any wrapper, for server rendering. */
export declare function themeAttrs({ theme, mode, density }: ThemeSettings): {
    "data-theme": ThemeName;
    "data-mode": "light" | "dark" | undefined;
    "data-density": "compact" | "comfortable" | undefined;
};
/** Sets the attributes on a live element. Defaults to <html>. */
export declare function applyTheme(settings: ThemeSettings, el?: HTMLElement): void;
