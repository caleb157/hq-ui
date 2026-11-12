/** Series colours in order. Work: iron, walnut, marble, honey wood, clay. Use four or fewer where you can. */
export declare const chartSeries: readonly ["var(--hq-chart-1)", "var(--hq-chart-2)", "var(--hq-chart-3)", "var(--hq-chart-4)", "var(--hq-chart-5)"];
export declare const chartColors: {
    readonly series: readonly ["var(--hq-chart-1)", "var(--hq-chart-2)", "var(--hq-chart-3)", "var(--hq-chart-4)", "var(--hq-chart-5)"];
    readonly grid: "var(--hq-chart-grid)";
    readonly axis: "var(--hq-chart-axis)";
    readonly positive: "var(--hq-success-fill)";
    readonly negative: "var(--hq-danger-fill)";
    readonly warning: "var(--hq-warning-fill)";
};
/** Spread onto <CartesianGrid />. Horizontal hairlines only. */
export declare const gridProps: {
    readonly stroke: "var(--hq-chart-grid)";
    readonly vertical: false;
};
/** Spread onto <XAxis /> and <YAxis />. Tick text is styled by .hq-chart text in components.css. */
export declare const axisProps: {
    readonly tickLine: false;
    readonly axisLine: {
        readonly stroke: "var(--hq-chart-axis)";
    };
    readonly tickMargin: 6;
};
export declare const valueAxisProps: {
    readonly tickLine: false;
    readonly axisLine: false;
    readonly tickMargin: 6;
    readonly width: 44;
};
/** Spread onto <Tooltip />. */
export declare const tooltipProps: {
    readonly cursor: {
        readonly fill: "var(--hq-accent-wash)";
    };
    readonly isAnimationActive: false;
};
/** Spread onto <Bar />. Square tops in Work, softened in Personal, via the control radius. */
export declare const barProps: {
    readonly isAnimationActive: false;
    readonly maxBarSize: 28;
};
/** Spread onto <Line />. */
export declare const lineProps: {
    readonly type: "monotone";
    readonly strokeWidth: 2;
    readonly dot: false;
    readonly isAnimationActive: false;
};
