import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useId } from "react";
// These components are thin wrappers over the hq-* classes in css/components.css.
// They hold no state and use no effects, so they render in server components too.
export const cx = (...parts) => parts.filter(Boolean).join(" ");
const toneClass = (tone) => (tone && tone !== "neutral" ? `hq-tone-${tone}` : undefined);
export function Card({ title, aside, variant = "section", className, children, ...rest }) {
    return (_jsxs("section", { className: cx("hq-card", variant === "raised" && "hq-card--raised", className), ...rest, children: [(title || aside) && (_jsxs("div", { className: "hq-card__head", children: [title && _jsx("h2", { className: "hq-heading", children: title }), aside && _jsx("span", { className: "hq-card__aside", children: aside })] })), children] }));
}
export function Stat({ label, value, note, tone, className, ...rest }) {
    return (_jsxs("div", { className: cx("hq-stat", className), ...rest, children: [_jsx("div", { className: "hq-stat__label", children: label }), _jsx("div", { className: "hq-stat__value", children: value }), note && _jsx("div", { className: cx("hq-stat__note", toneClass(tone) ?? "hq-muted"), children: note })] }));
}
export function StatRow({ className, ...rest }) {
    return _jsx("div", { className: cx("hq-stat-row", className), ...rest });
}
export function DataTable({ columns, rows, rowKey, selected, caption, minWidth = 560, className }) {
    return (_jsx("div", { className: "hq-table-wrap", children: _jsxs("table", { className: cx("hq-table", className), style: { minWidth }, children: [caption && _jsx("caption", { style: { position: "absolute", left: -9999 }, children: caption }), _jsx("thead", { children: _jsx("tr", { children: columns.map((c) => (_jsx("th", { scope: "col", style: c.numeric ? { textAlign: "right" } : undefined, children: c.header }, c.key))) }) }), _jsx("tbody", { children: rows.map((row, i) => (_jsx("tr", { "aria-selected": selected?.(row) || undefined, children: columns.map((c) => (_jsx("td", { className: cx(c.numeric && "hq-table__num", toneClass(c.tone?.(row))), children: c.render ? c.render(row) : (row[c.key] ?? null) }, c.key))) }, rowKey(row, i)))) })] }) }));
}
/* ---- List ---- */
export function List({ className, ...rest }) {
    return _jsx("ul", { className: cx("hq-list", className), ...rest });
}
export function ListItem({ children, meta, metaNumeric, href, className, ...rest }) {
    return (_jsxs("li", { className: cx("hq-list__item", className), ...rest, children: [href ? _jsx("a", { href: href, children: children }) : _jsx("span", { children: children }), meta != null && _jsx("span", { className: cx("hq-list__meta", metaNumeric && "hq-num"), children: meta })] }));
}
export function Nav({ items, brand, end, orientation = "top", label = "Main", renderLink, className, ...rest }) {
    return (_jsxs("nav", { "aria-label": label, className: cx("hq-nav", orientation === "side" && "hq-nav--side", className), ...rest, children: [brand && _jsx("div", { className: "hq-nav__brand", children: brand }), items.map((item) => {
                const props = {
                    href: item.href,
                    className: "hq-nav__link",
                    "aria-current": item.current ? "page" : undefined,
                    children: item.label,
                };
                return renderLink ? _jsx("span", { style: { display: "contents" }, children: renderLink(props) }, item.href) : _jsx("a", { ...props }, item.href);
            }), end && (_jsxs(_Fragment, { children: [_jsx("span", { className: "hq-nav__spacer" }), end] }))] }));
}
/** The DKT arch on a plinth. The arch takes the text colour. The plinth is always walnut. */
export function DktMark({ size = 20 }) {
    return (_jsxs("svg", { "aria-hidden": "true", viewBox: "0 0 64 64", width: size, height: size, children: [_jsx("path", { d: "M13 55 V30 A19 19 0 0 1 51 30 V55", fill: "none", stroke: "currentColor", strokeWidth: "6.5" }), _jsx("rect", { x: "6", y: "56", width: "52", height: "6", fill: "#8A4A26" })] }));
}
export function Button({ variant = "primary", className, type = "button", ...rest }) {
    return _jsx("button", { type: type, className: cx("hq-btn", variant !== "primary" && `hq-btn--${variant}`, className), ...rest });
}
function Shell({ id, label, hint, error, children }) {
    return (_jsxs("div", { className: "hq-field", children: [_jsx("label", { className: "hq-field__label", htmlFor: id, children: label }), children, hint && !error && _jsx("span", { className: "hq-field__hint", id: `${id}-hint`, children: hint }), error && _jsx("span", { className: "hq-field__error", id: `${id}-error`, children: error })] }));
}
const describedBy = (id, hint, error) => (error ? `${id}-error` : hint ? `${id}-hint` : undefined);
export function Input({ label, hint, error, numeric, id, className, ...rest }) {
    const auto = useId();
    const fid = id ?? auto;
    return (_jsx(Shell, { id: fid, label: label, hint: hint, error: error, children: _jsx("input", { id: fid, className: cx("hq-input", numeric && "hq-input--num", className), "aria-invalid": error ? true : undefined, "aria-describedby": describedBy(fid, hint, error), ...rest }) }));
}
export function Select({ label, hint, error, id, className, children, ...rest }) {
    const auto = useId();
    const fid = id ?? auto;
    return (_jsx(Shell, { id: fid, label: label, hint: hint, error: error, children: _jsx("select", { id: fid, className: cx("hq-select", className), "aria-invalid": error ? true : undefined, "aria-describedby": describedBy(fid, hint, error), ...rest, children: children }) }));
}
export function Textarea({ label, hint, error, id, className, ...rest }) {
    const auto = useId();
    const fid = id ?? auto;
    return (_jsx(Shell, { id: fid, label: label, hint: hint, error: error, children: _jsx("textarea", { id: fid, className: cx("hq-textarea", className), "aria-invalid": error ? true : undefined, "aria-describedby": describedBy(fid, hint, error), ...rest }) }));
}
export function Checkbox({ label, className, ...rest }) {
    return (_jsxs("label", { className: cx("hq-check", className), children: [_jsx("input", { type: "checkbox", ...rest }), _jsx("span", { children: label })] }));
}
export function Legend({ items, className }) {
    return (_jsx("div", { className: cx("hq-legend", className), children: items.map((item, i) => (_jsxs("span", { className: "hq-legend__item", children: [_jsx("span", { "aria-hidden": "true", className: "hq-legend__swatch", style: { background: item.color } }), item.label] }, i))) }));
}
