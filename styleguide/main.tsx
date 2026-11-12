import { StrictMode, useEffect, useState, useSyncExternalStore } from "react";
import { createRoot } from "react-dom/client";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import tokens from "../tokens/tokens.json";
import "../css/fonts.css";
import "../css/tokens.css";
import "../css/components.css";
import "./styleguide.css";
import {
  Button, Card, Checkbox, DataTable, DktMark, Input, Legend, List, ListItem, Nav, Select, Stat, StatRow, Textarea,
  applyTheme, axisProps, barProps, chartColors, chartSeries, gridProps, lineProps, tooltipProps, valueAxisProps,
  type Column, type Density, type Mode, type ThemeName, type Tone,
} from "../src";

const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
const useSystemDark = () =>
  useSyncExternalStore(
    (cb) => { darkQuery.addEventListener("change", cb); return () => darkQuery.removeEventListener("change", cb); },
    () => darkQuery.matches,
  );

/* ---- sample data. All of it is invented. ---- */
type Order = { so: string; buyer: string; item: string; sku: string; qty: number; planned: number; actual: number; ships: string };
const orders: Order[] = [
  { so: "S00108", buyer: "ACM", item: "Scallop side table", sku: "ST3120", qty: 120, planned: 25.0, actual: 14.2, ships: "21 Nov" },
  { so: "S00108", buyer: "ACM", item: "Scallop console", sku: "CN4410", qty: 80, planned: 28.0, actual: 20.5, ships: "21 Nov" },
  { so: "S00112", buyer: "HRL", item: "Sheesham dining table, 84 in", sku: "DT2210", qty: 40, planned: 26.0, actual: 27.4, ships: "02 Dec" },
  { so: "S00114", buyer: "NWD", item: "Marble top coffee table", sku: "CT1408", qty: 60, planned: 30.0, actual: 29.1, ships: "09 Dec" },
  { so: "S00117", buyer: "BXM", item: "Iron frame bookshelf", sku: "BS0932", qty: 150, planned: 24.0, actual: 24.8, ships: "15 Dec" },
];
const pct = (n: number) => `${n.toFixed(1)}%`;
const marginTone = (o: Order): Tone | undefined => (o.actual - o.planned <= -2 ? "danger" : o.actual > o.planned ? "success" : undefined);
const orderColumns: Column<Order>[] = [
  { key: "so", header: "Order", render: (o) => <span className="hq-num">{o.so}</span> },
  { key: "buyer", header: "Buyer" },
  { key: "item", header: "Item", render: (o) => <>{o.item} <span className="hq-num hq-muted">{o.sku}</span></> },
  { key: "qty", header: "Qty", numeric: true },
  { key: "planned", header: "Planned", numeric: true, render: (o) => <span className="hq-muted">{pct(o.planned)}</span> },
  { key: "actual", header: "Actual", numeric: true, render: (o) => pct(o.actual), tone: marginTone },
  { key: "ships", header: "Ships", numeric: true },
];
const cash = [
  { month: "Dec", in: 78, out: 60 }, { month: "Jan", in: 52, out: 66 }, { month: "Feb", in: 90, out: 58 },
  { month: "Mar", in: 64, out: 70 }, { month: "Apr", in: 84, out: 62 }, { month: "May", in: 70, out: 55 },
];
const todo = [
  { text: "Approve vendor RFQ for marble tops", due: "today" },
  { text: "Sign off QC report, S00108", due: "today" },
  { text: "Check past cost on ST3120", due: "13 Nov" },
];
const accounts = [
  { name: "Checking", value: "$8,240" }, { name: "Savings", value: "$31,600" },
  { name: "India account", value: "₹4,12,000" }, { name: "Credit card", value: "−$1,180" },
];

function CashChart() {
  return (
    <>
      <Legend items={[{ label: "In", color: chartSeries[0] }, { label: "Out", color: chartSeries[2] }]} />
      <div className="hq-chart" role="img" aria-label="Bar chart of cash in and out, December to May">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={cash} margin={{ top: 8, right: 0, bottom: 0, left: 0 }}>
            <CartesianGrid {...gridProps} />
            <XAxis dataKey="month" {...axisProps} />
            <YAxis {...valueAxisProps} />
            <Tooltip {...tooltipProps} />
            <Bar dataKey="in" name="In" fill={chartSeries[0]} {...barProps} />
            <Bar dataKey="out" name="Out" fill={chartSeries[2]} {...barProps} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

function Swatches({ colors, names }: { colors: Record<string, string>; names: string[] }) {
  return (
    <div className="sg-swatches">
      {names.map((n) => (
        <div key={n}>
          <div className="sg-swatch__chip" style={{ background: `var(--hq-${n})` }} />
          <div className="sg-swatch__name">--hq-{n}</div>
          <div className="hq-num hq-muted">{colors[n]}</div>
        </div>
      ))}
    </div>
  );
}

function Motion() {
  const [on, setOn] = useState(false);
  return (
    <div className="hq-stack">
      {Object.entries(tokens.foundation.duration).map(([name, value]) => (
        <div key={name}>
          <span>--hq-duration-{name} </span><span className="hq-num hq-muted">{value}</span>
          <div className="sg-track"><div className="sg-dot" data-on={on} style={{ transitionDuration: `var(--hq-duration-${name})` }} /></div>
        </div>
      ))}
      <div><Button variant="secondary" onClick={() => setOn(!on)}>Run the three durations</Button></div>
    </div>
  );
}

function WorkScreen() {
  return (
    <>
      <Nav
        brand={<><DktMark /> PDHQ</>}
        items={[{ label: "Overview", href: "#overview", current: true }, { label: "Inquiries", href: "#inquiries" }, { label: "Costing", href: "#costing" }, { label: "Orders", href: "#orders" }, { label: "Cash flow", href: "#cash" }]}
        end={<span className="hq-muted">Theme: Work</span>}
      />
      <div className="hq-page">
        <div className="hq-cluster" style={{ justifyContent: "space-between" }}>
          <h3 className="hq-title">Week of 9 November</h3>
          <Button>Start a quote</Button>
        </div>
        <StatRow>
          <Stat label="Open inquiries" value="14" note="5 quotes due this week" />
          <Stat label="Booked in November" value="$182,400" note="+8.2% on October" tone="success" />
          <Stat label="Average margin" value="24.6%" note="2.4 pts under plan" tone="danger" />
          <Stat label="Cash on hand" value="₹1.42 Cr" note="11 weeks of cover" />
        </StatRow>
        <div className="hq-split">
          <Card className="hq-split__main" title="Open orders, planned against actual margin">
            <DataTable columns={orderColumns} rows={orders} rowKey={(o) => o.sku} caption="Open orders" />
          </Card>
          <div className="hq-split__side hq-stack">
            <Card title="Cash flow, next 6 months"><CashChart /></Card>
            <Card title="Waiting on you">
              <List>{todo.map((t) => <ListItem key={t.text} href="#" meta={t.due} metaNumeric>{t.text}</ListItem>)}</List>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

function PersonalScreen() {
  return (
    <div className="hq-page">
      <Nav style={{ padding: 0 }} items={[{ label: "Today", href: "#today", current: true }, { label: "Money", href: "#money" }, { label: "Mail", href: "#mail" }, { label: "Games", href: "#games" }]} />
      <h3 className="hq-title">Thursday 12 November</h3>
      <div className="hq-split">
        <div className="hq-split__main hq-stack" style={{ gap: "var(--hq-section-gap)" }}>
          <Card title="To do">
            <div className="hq-stack sg-big" style={{ gap: 0 }}>
              <Checkbox label="Pay the electricity bill" />
              <Checkbox label="Reply to Sam about Saturday" />
              <Checkbox label="Order printer ink" />
            </div>
          </Card>
          <Card title="Money">
            <StatRow>{accounts.map((a) => <Stat key={a.name} label={a.name} value={a.value} />)}</StatRow>
            <p className="sg-body">Groceries are <span className="hq-tone-danger">$112 over</span> for November. Everything else is inside its budget.</p>
          </Card>
        </div>
        <div className="hq-split__side hq-stack" style={{ gap: "var(--hq-section-gap)" }}>
          <Card title="Jodhpur">
            <div className="sg-temp">27°</div>
            <div className="hq-muted">Clear. High 30°, low 14°.</div>
          </Card>
          <Card title="Last night">
            <List>
              <ListItem meta="112–104, won" metaNumeric>Lakers</ListItem>
              <ListItem meta="98–107, lost" metaNumeric>Mavericks</ListItem>
            </List>
          </Card>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState<ThemeName>("work");
  const [mode, setMode] = useState<Mode>("system");
  const [density, setDensity] = useState<Density>("default");
  const systemDark = useSystemDark();
  useEffect(() => applyTheme({ theme, mode, density }), [theme, mode, density]);

  const t = tokens.themes[theme];
  const resolved = mode === "system" ? (systemDark ? "dark" : "light") : mode;
  const colors = t[resolved] as Record<string, string>;
  const densityName = density === "default" ? t.defaultDensity : density;

  return (
    <div className="hq-page sg-page">
      <header>
        <h1 className="hq-title">hq-ui style guide</h1>
        <p className="sg-lede">
          Two themes on one foundation. Work is the Worksheet direction, built from the DKT brand brief. Personal is the Paper direction.
          Both read the same spacing, type sizes, radii and motion. This page renders the real components from the real tokens, version {tokens.meta.version}.
        </p>
      </header>

      <div className="sg-controls">
        <Select label="Theme" value={theme} onChange={(e) => setTheme(e.target.value as ThemeName)}>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
        </Select>
        <Select label="Mode" value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
          <option value="system">Follow system</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </Select>
        <Select label="Density" value={density} onChange={(e) => setDensity(e.target.value as Density)} hint={`Showing ${densityName}`}>
          <option value="default">Theme default</option>
          <option value="compact">Compact</option>
          <option value="comfortable">Comfortable</option>
        </Select>
      </div>

      <Card title={`Colour: ${t.label}, ${resolved}`}>
        <h3 className="hq-muted sg-group">Surfaces and lines</h3>
        <Swatches colors={colors} names={["bg", "surface", "line", "line-strong"]} />
        <h3 className="hq-muted sg-group">Text and accent</h3>
        <Swatches colors={colors} names={["text", "text-muted", "accent", "accent-hover", "accent-press", "accent-wash", "on-accent"]} />
        <h3 className="hq-muted sg-group">Status, text colour then fill colour</h3>
        <Swatches colors={colors} names={["success", "success-fill", "warning", "warning-fill", "danger", "danger-fill"]} />
        <h3 className="hq-muted sg-group">Chart series</h3>
        <Swatches colors={colors} names={["chart-1", "chart-2", "chart-3", "chart-4", "chart-5", "chart-grid", "chart-axis"]} />
      </Card>

      <div className="sg-grid">
        <Card title="Type">
          <div className="hq-stack">
            <div><div className="hq-title">Week of 9 November</div><span className="hq-muted">.hq-title</span></div>
            <div><div className="hq-heading">Open orders</div><span className="hq-muted">.hq-heading</span></div>
            <div><p className="sg-body">Sheesham, kiln-dried to 8 to 10 percent. FOB Mundra, 45 days from PO.</p><span className="hq-muted">body</span></div>
            <div><div className="hq-label">Planned margin</div><span className="hq-muted">.hq-label</span></div>
            <div><div className="hq-num">S00108 · 120 pcs · 25.0%</div><span className="hq-muted">.hq-num, for anything measurable</span></div>
          </div>
        </Card>
        <Card title="Space">
          <div className="hq-stack" style={{ gap: "var(--hq-space-2)" }}>
            {Object.entries(tokens.foundation.space).map(([k, v]) => (
              <div key={k} className="hq-cluster">
                <span className="hq-num" style={{ width: 96 }}>space-{k} {v}</span>
                <div className="sg-bar" style={{ width: v }} />
              </div>
            ))}
          </div>
        </Card>
        <Card title="Radius">
          <div className="sg-row">
            {(["control", "card", "panel"] as const).map((r) => (
              <div key={r}>
                <div className="sg-radius" style={{ borderRadius: `var(--hq-radius-${r})` }} />
                <div className="sg-swatch__name">{r}</div>
                <div className="hq-num hq-muted">{(t.style as Record<string, string>)[`radius-${r}`]}</div>
              </div>
            ))}
          </div>
          <p className="hq-muted">Shared scale: {Object.values(tokens.foundation.radius).join(", ")}. Each theme picks three steps from it.</p>
        </Card>
        <Card title="Motion"><Motion /></Card>
      </div>

      <Card title="Stat tiles">
        <StatRow>
          <Stat label="Open inquiries" value="14" note="5 quotes due this week" />
          <Stat label="Average margin" value="24.6%" note="2.4 pts under plan" tone="danger" />
          <Stat label="Booked in November" value="$182,400" note="+8.2% on October" tone="success" />
        </StatRow>
      </Card>

      <Card title="Table" aside="Sample data">
        <DataTable columns={orderColumns} rows={orders} rowKey={(o) => o.sku} selected={(o) => o.sku === "DT2210"} caption="Sample orders" />
      </Card>

      <div className="sg-grid">
        <Card title="List">
          <List>{todo.map((x) => <ListItem key={x.text} href="#" meta={x.due} metaNumeric>{x.text}</ListItem>)}</List>
        </Card>
        <Card title="Card, raised variant" variant="raised">
          <p className="sg-body">The default card is an open section. Use the raised variant only when a group has to read as one object, such as a form or a dialog body.</p>
        </Card>
        <Card title="Buttons">
          <div className="hq-cluster">
            <Button>Start a quote</Button>
            <Button variant="secondary">Export the sheet</Button>
            <Button variant="ghost">Clear filters</Button>
            <Button disabled>Send to vendor</Button>
          </div>
        </Card>
        <Card title="Nav">
          <Nav style={{ padding: 0 }} brand={<><DktMark /> PDHQ</>} items={[{ label: "Overview", href: "#a", current: true }, { label: "Orders", href: "#b" }, { label: "Vendors", href: "#c" }]} />
        </Card>
      </div>

      <Card title="Form controls">
        <div className="sg-form">
          <Input label="Buyer" placeholder="ACM" />
          <Input label="Target price" numeric defaultValue="142.50" hint="USD per piece, FOB Mundra" />
          <Input label="Quantity" numeric defaultValue="0" error="Enter a quantity above zero" />
          <Select label="Finish" defaultValue="natural">
            <option value="natural">Natural</option>
            <option value="walnut">Walnut stain</option>
            <option value="black">Black iron</option>
          </Select>
          <Textarea label="Notes for the floor" placeholder="Edge profile, packing, anything unusual" />
          <Checkbox label="Repeat order" defaultChecked />
        </div>
      </Card>

      <div className="sg-grid">
        <Card title="Chart, bars" aside="Sample data"><CashChart /></Card>
        <Card title="Chart, lines" aside="Sample data">
          <Legend items={[{ label: "Planned margin", color: chartSeries[0] }, { label: "Actual margin", color: chartSeries[1] }]} />
          <div className="hq-chart" role="img" aria-label="Line chart of planned and actual margin for five orders">
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={orders} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid {...gridProps} />
                <XAxis dataKey="sku" {...axisProps} />
                <YAxis {...valueAxisProps} domain={[0, 40]} />
                <Tooltip {...tooltipProps} cursor={{ stroke: chartColors.grid }} />
                <Line dataKey="planned" name="Planned" stroke={chartSeries[0]} {...lineProps} />
                <Line dataKey="actual" name="Actual" stroke={chartSeries[1]} {...lineProps} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card title={`Sample screen: ${t.label}`} aside="Sample data">
        <div style={{ border: "var(--hq-border-width) solid var(--hq-line)" }}>
          {theme === "work" ? <WorkScreen /> : <PersonalScreen />}
        </div>
      </Card>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
