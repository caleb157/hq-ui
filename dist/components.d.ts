import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
export declare const cx: (...parts: Array<string | false | null | undefined>) => string;
export type Tone = "neutral" | "success" | "warning" | "danger";
export type CardProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
    title?: ReactNode;
    /** Short text on the right of the heading: a source, a date, a count. */
    aside?: ReactNode;
    /** "section" is unboxed (ruled in Work, open in Personal). "raised" draws a box. */
    variant?: "section" | "raised";
};
export declare function Card({ title, aside, variant, className, children, ...rest }: CardProps): import("react").JSX.Element;
export type StatProps = HTMLAttributes<HTMLDivElement> & {
    label: ReactNode;
    value: ReactNode;
    note?: ReactNode;
    tone?: Tone;
};
export declare function Stat({ label, value, note, tone, className, ...rest }: StatProps): import("react").JSX.Element;
export declare function StatRow({ className, ...rest }: HTMLAttributes<HTMLDivElement>): import("react").JSX.Element;
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
export declare function DataTable<Row>({ columns, rows, rowKey, selected, caption, minWidth, className }: DataTableProps<Row>): import("react").JSX.Element;
export declare function List({ className, ...rest }: HTMLAttributes<HTMLUListElement>): import("react").JSX.Element;
export type ListItemProps = Omit<HTMLAttributes<HTMLLIElement>, "children"> & {
    children: ReactNode;
    /** Right-hand detail: a date, an amount, a count. */
    meta?: ReactNode;
    /** Sets the meta in the data face. Use when meta is a number or date. */
    metaNumeric?: boolean;
    href?: string;
};
export declare function ListItem({ children, meta, metaNumeric, href, className, ...rest }: ListItemProps): import("react").JSX.Element;
export type NavItem = {
    label: ReactNode;
    href: string;
    current?: boolean;
};
export type NavProps = Omit<HTMLAttributes<HTMLElement>, "children"> & {
    items: NavItem[];
    brand?: ReactNode;
    /** Content pushed to the far end: a theme switch, a user menu. */
    end?: ReactNode;
    orientation?: "top" | "side";
    label?: string;
    /** Swap in a router link. Defaults to a plain anchor. */
    renderLink?: (props: AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
    }) => ReactNode;
};
export declare function Nav({ items, brand, end, orientation, label, renderLink, className, ...rest }: NavProps): import("react").JSX.Element;
/** The DKT arch on a plinth. The arch takes the text colour. The plinth is always walnut. */
export declare function DktMark({ size }: {
    size?: number;
}): import("react").JSX.Element;
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    /** One primary per view. */
    variant?: "primary" | "secondary" | "ghost";
};
export declare function Button({ variant, className, type, ...rest }: ButtonProps): import("react").JSX.Element;
type FieldShell = {
    label: ReactNode;
    hint?: ReactNode;
    error?: ReactNode;
};
export type InputProps = InputHTMLAttributes<HTMLInputElement> & FieldShell & {
    /** Right-aligned in the data face, for prices, quantities and dimensions. */
    numeric?: boolean;
};
export declare function Input({ label, hint, error, numeric, id, className, ...rest }: InputProps): import("react").JSX.Element;
export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & FieldShell;
export declare function Select({ label, hint, error, id, className, children, ...rest }: SelectProps): import("react").JSX.Element;
export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & FieldShell;
export declare function Textarea({ label, hint, error, id, className, ...rest }: TextareaProps): import("react").JSX.Element;
export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
    label: ReactNode;
};
export declare function Checkbox({ label, className, ...rest }: CheckboxProps): import("react").JSX.Element;
export type LegendItem = {
    label: ReactNode;
    color: string;
};
export declare function Legend({ items, className }: {
    items: LegendItem[];
    className?: string;
}): import("react").JSX.Element;
export {};
