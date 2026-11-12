import { useId } from "react";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

// These components are thin wrappers over the hq-* classes in css/components.css.
// They hold no state and use no effects, so they render in server components too.

export const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(" ");

export type Tone = "neutral" | "success" | "warning" | "danger";
const toneClass = (tone?: Tone) => (tone && tone !== "neutral" ? `hq-tone-${tone}` : undefined);

/* ---- Card ---- */
export type CardProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  title?: ReactNode;
  /** Short text on the right of the heading: a source, a date, a count. */
  aside?: ReactNode;
  /** "section" is unboxed (ruled in Work, open in Personal). "raised" draws a box. */
  variant?: "section" | "raised";
};
export function Card({ title, aside, variant = "section", className, children, ...rest }: CardProps) {
  return (
    <section className={cx("hq-card", variant === "raised" && "hq-card--raised", className)} {...rest}>
      {(title || aside) && (
        <div className="hq-card__head">
          {title && <h2 className="hq-heading">{title}</h2>}
          {aside && <span className="hq-card__aside">{aside}</span>}
        </div>
      )}
      {children}
    </section>
  );
}

/* ---- Stat tile ---- */
export type StatProps = HTMLAttributes<HTMLDivElement> & {
  label: ReactNode;
  value: ReactNode;
  note?: ReactNode;
  tone?: Tone;
};
export function Stat({ label, value, note, tone, className, ...rest }: StatProps) {
  return (
    <div className={cx("hq-stat", className)} {...rest}>
      <div className="hq-stat__label">{label}</div>
      <div className="hq-stat__value">{value}</div>
      {note && <div className={cx("hq-stat__note", toneClass(tone) ?? "hq-muted")}>{note}</div>}
    </div>
  );
}
export function StatRow({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("hq-stat-row", className)} {...rest} />;
}

/* ---- Table ---- */
export type Column<Row> = {
  key: string;
  header: ReactNode;
  /** Right-aligned and set in the data face. Use for anything measurable. */
  numeric?: boolean;
  render?: (row: Row) => ReactNode;
  tone?: (row: Row) => Tone | undefined;
};
export type DataTableProps<Row> = {
  columns: Column<Row>[];
  rows: Row[];
  rowKey: (row: Row, index: number) => string | number;
  selected?: (row: Row) => boolean;
  caption?: string;
  /** Below this width the table scrolls sideways inside its own box. */
  minWidth?: number;
  className?: string;
};
export function DataTable<Row>({ columns, rows, rowKey, selected, caption, minWidth = 560, className }: DataTableProps<Row>) {
  return (
    <div className="hq-table-wrap">
      <table className={cx("hq-table", className)} style={{ minWidth }}>
        {caption && <caption style={{ position: "absolute", left: -9999 }}>{caption}</caption>}
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col" style={c.numeric ? { textAlign: "right" } : undefined}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={rowKey(row, i)} aria-selected={selected?.(row) || undefined}>
              {columns.map((c) => (
                <td key={c.key} className={cx(c.numeric && "hq-table__num", toneClass(c.tone?.(row)))}>
                  {c.render ? c.render(row) : ((row as Record<string, ReactNode>)[c.key] ?? null)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---- List ---- */
export function List({ className, ...rest }: HTMLAttributes<HTMLUListElement>) {
  return <ul className={cx("hq-list", className)} {...rest} />;
}
export type ListItemProps = Omit<HTMLAttributes<HTMLLIElement>, "children"> & {
  children: ReactNode;
  /** Right-hand detail: a date, an amount, a count. */
  meta?: ReactNode;
  /** Sets the meta in the data face. Use when meta is a number or date. */
  metaNumeric?: boolean;
  href?: string;
};
export function ListItem({ children, meta, metaNumeric, href, className, ...rest }: ListItemProps) {
  return (
    <li className={cx("hq-list__item", className)} {...rest}>
      {href ? <a href={href}>{children}</a> : <span>{children}</span>}
      {meta != null && <span className={cx("hq-list__meta", metaNumeric && "hq-num")}>{meta}</span>}
    </li>
  );
}

/* ---- Nav ---- */
export type NavItem = { label: ReactNode; href: string; current?: boolean };
export type NavProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
  items: NavItem[];
  brand?: ReactNode;
  /** Content pushed to the far end: a theme switch, a user menu. */
  end?: ReactNode;
  orientation?: "top" | "side";
  label?: string;
  /** Swap in a router link. Defaults to a plain anchor. */
  renderLink?: (props: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => ReactNode;
};
export function Nav({ items, brand, end, orientation = "top", label = "Main", renderLink, className, ...rest }: NavProps) {
  return (
    <nav aria-label={label} className={cx("hq-nav", orientation === "side" && "hq-nav--side", className)} {...rest}>
      {brand && <div className="hq-nav__brand">{brand}</div>}
      {items.map((item) => {
        const props = {
          href: item.href,
          className: "hq-nav__link",
          "aria-current": item.current ? ("page" as const) : undefined,
          children: item.label,
        };
        return renderLink ? <span key={item.href} style={{ display: "contents" }}>{renderLink(props)}</span> : <a key={item.href} {...props} />;
      })}
      {end && (
        <>
          <span className="hq-nav__spacer" />
          {end}
        </>
      )}
    </nav>
  );
}

/** The DKT arch on a plinth. The arch takes the text colour. The plinth is always walnut. */
export function DktMark({ size = 20 }: { size?: number }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64" width={size} height={size}>
      <path d="M13 55 V30 A19 19 0 0 1 51 30 V55" fill="none" stroke="currentColor" strokeWidth="6.5" />
      <rect x="6" y="56" width="52" height="6" fill="#8A4A26" />
    </svg>
  );
}

/* ---- Button ---- */
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** One primary per view. */
  variant?: "primary" | "secondary" | "ghost";
};
export function Button({ variant = "primary", className, type = "button", ...rest }: ButtonProps) {
  return <button type={type} className={cx("hq-btn", variant !== "primary" && `hq-btn--${variant}`, className)} {...rest} />;
}

/* ---- Form controls ---- */
type FieldShell = { label: ReactNode; hint?: ReactNode; error?: ReactNode };

function Shell({ id, label, hint, error, children }: FieldShell & { id: string; children: ReactNode }) {
  return (
    <div className="hq-field">
      <label className="hq-field__label" htmlFor={id}>{label}</label>
      {children}
      {hint && !error && <span className="hq-field__hint" id={`${id}-hint`}>{hint}</span>}
      {error && <span className="hq-field__error" id={`${id}-error`}>{error}</span>}
    </div>
  );
}
const describedBy = (id: string, hint?: ReactNode, error?: ReactNode) => (error ? `${id}-error` : hint ? `${id}-hint` : undefined);

export type InputProps = InputHTMLAttributes<HTMLInputElement> & FieldShell & {
  /** Right-aligned in the data face, for prices, quantities and dimensions. */
  numeric?: boolean;
};
export function Input({ label, hint, error, numeric, id, className, ...rest }: InputProps) {
  const auto = useId();
  const fid = id ?? auto;
  return (
    <Shell id={fid} label={label} hint={hint} error={error}>
      <input
        id={fid}
        className={cx("hq-input", numeric && "hq-input--num", className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(fid, hint, error)}
        {...rest}
      />
    </Shell>
  );
}

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & FieldShell;
export function Select({ label, hint, error, id, className, children, ...rest }: SelectProps) {
  const auto = useId();
  const fid = id ?? auto;
  return (
    <Shell id={fid} label={label} hint={hint} error={error}>
      <select
        id={fid}
        className={cx("hq-select", className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(fid, hint, error)}
        {...rest}
      >
        {children}
      </select>
    </Shell>
  );
}

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & FieldShell;
export function Textarea({ label, hint, error, id, className, ...rest }: TextareaProps) {
  const auto = useId();
  const fid = id ?? auto;
  return (
    <Shell id={fid} label={label} hint={hint} error={error}>
      <textarea
        id={fid}
        className={cx("hq-textarea", className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(fid, hint, error)}
        {...rest}
      />
    </Shell>
  );
}

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { label: ReactNode };
export function Checkbox({ label, className, ...rest }: CheckboxProps) {
  return (
    <label className={cx("hq-check", className)}>
      <input type="checkbox" {...rest} />
      <span>{label}</span>
    </label>
  );
}

/* ---- Chart legend (charts themselves come from Recharts, styled by chart.ts) ---- */
export type LegendItem = { label: ReactNode; color: string };
export function Legend({ items, className }: { items: LegendItem[]; className?: string }) {
  return (
    <div className={cx("hq-legend", className)}>
      {items.map((item, i) => (
        <span key={i} className="hq-legend__item">
          <span aria-hidden="true" className="hq-legend__swatch" style={{ background: item.color }} />
          {item.label}
        </span>
      ))}
    </div>
  );
}
