// Generates css/tokens.css from tokens/tokens.json. No dependencies.
// Also checks text contrast so a palette edit cannot quietly drop below 4.5:1.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const tokens = JSON.parse(readFileSync(join(root, "tokens/tokens.json"), "utf8"));
const p = tokens.meta.prefix;

const decl = (name, value) => `  --${p}-${name}: ${value};`;
const block = (selector, lines, indent = "") =>
  `${indent}${selector} {\n${lines.map((l) => indent + l).join("\n")}\n${indent}}`;

// foundation: { space: {1: "4px"} } becomes --hq-space-1
const foundation = [];
for (const [group, value] of Object.entries(tokens.foundation)) {
  if (typeof value === "string") foundation.push(decl(group, value));
  else for (const [k, v] of Object.entries(value)) foundation.push(decl(`${group}-${k}`, v));
}

const out = [
  `/* Generated from tokens/tokens.json by scripts/build-tokens.mjs. Do not edit by hand. */`,
  `/* hq-ui ${tokens.meta.version} */`,
  "",
  block(":root", foundation),
];

for (const [name, theme] of Object.entries(tokens.themes)) {
  const sel = `[data-theme="${name}"]`;
  const style = Object.entries(theme.style).map(([k, v]) => decl(k, v));
  const density = Object.entries(tokens.density[theme.defaultDensity]).map(([k, v]) => decl(k, v));
  const light = Object.entries(theme.light).map(([k, v]) => decl(k, v));
  const dark = Object.entries(theme.dark).map(([k, v]) => decl(k, v));

  out.push(
    "",
    `/* ${theme.label}: ${theme.direction} */`,
    block(sel, [...style, ...density, ...light, "  color-scheme: light;"]),
    // dark follows the system unless data-mode="light" pins it
    `@media (prefers-color-scheme: dark) {\n${block(`${sel}:not([data-mode="light"])`, [...dark, "  color-scheme: dark;"], "  ")}\n}`,
    block(`${sel}[data-mode="dark"]`, [...dark, "  color-scheme: dark;"]),
  );
}

// density overrides come last so they win over a theme's default
for (const [name, values] of Object.entries(tokens.density)) {
  out.push("", block(`[data-density="${name}"]`, Object.entries(values).map(([k, v]) => decl(k, v))));
}

out.push(
  "",
  `@media (prefers-reduced-motion: reduce) {\n${block(":root", [decl("duration-fast", "0ms"), decl("duration-base", "0ms"), decl("duration-slow", "0ms")], "  ")}\n}`,
  "",
);

mkdirSync(join(root, "css"), { recursive: true });
writeFileSync(join(root, "css/tokens.css"), out.join("\n"));

// ---- contrast check (WCAG 2 relative luminance) ----
const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
const textRoles = ["text", "text-muted", "accent", "success", "warning", "danger"];
let failures = 0;
for (const [name, theme] of Object.entries(tokens.themes)) {
  for (const mode of ["light", "dark"]) {
    const c = theme[mode];
    const pairs = [
      ...textRoles.flatMap((role) => [[role, "bg"], [role, "surface"]]),
      ["on-accent", "accent"],
    ];
    for (const [fg, bg] of pairs) {
      const r = ratio(c[fg], c[bg]);
      if (r < 4.5) {
        failures++;
        console.error(`CONTRAST ${name}/${mode}: ${fg} ${c[fg]} on ${bg} ${c[bg]} is ${r.toFixed(2)}:1 (needs 4.5)`);
      }
    }
  }
}
console.log(`tokens.css written. Contrast failures: ${failures}`);
if (failures && process.argv.includes("--strict")) process.exit(1);
