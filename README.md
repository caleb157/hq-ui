# hq-ui

Design tokens and a small React component library for internal tools. Two themes, Work and Personal, on one foundation. See SPEC.md for the decisions behind it.

## Install

```bash
npm install github:caleb157/hq-ui
```

The built files in `dist/` are committed, so the install needs no build step.

## Use

```css
/* app stylesheet */
@import "tailwindcss";            /* if the app uses Tailwind 4 */
@import "hq-ui/fonts.css";        /* optional */
@import "hq-ui/tokens.css";
@import "hq-ui/components.css";
@import "hq-ui/tailwind.css";     /* optional: bg-hq-bg, text-hq-muted, rounded-hq-card */
@import "hq-ui/shadcn.css";       /* optional: reskins existing shadcn components */
```

```html
<html data-theme="work">  <!-- or "personal" -->
```

```tsx
import { Card, DataTable, Stat, StatRow, Button, applyTheme } from "hq-ui";

applyTheme({ theme: "work", mode: "system", density: "default" });

<StatRow>
  <Stat label="Average margin" value="24.6%" note="2.4 pts under plan" tone="danger" />
</StatRow>
```

Charts use Recharts with the helpers in `hq-ui`:

```tsx
<div className="hq-chart">
  <BarChart data={rows}>
    <CartesianGrid {...gridProps} />
    <XAxis dataKey="month" {...axisProps} />
    <Bar dataKey="in" fill={chartSeries[0]} {...barProps} />
  </BarChart>
</div>
```

The raw values are in `hq-ui/tokens.json` for anything that is not CSS.

## Style guide

```bash
npm install
npm run dev
```

Opens at http://localhost:5199 with switches for theme, mode and density.
