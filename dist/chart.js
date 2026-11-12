// Chart styling for Recharts. Values are CSS variables, which SVG resolves at
// paint time, so a chart follows theme, mode and density with no re-render
// and no hook. Wrap the chart in an element with class "hq-chart".
/** Series colours in order. Work: iron, walnut, marble, honey wood, clay. Use four or fewer where you can. */
export const chartSeries = [
    "var(--hq-chart-1)",
    "var(--hq-chart-2)",
    "var(--hq-chart-3)",
    "var(--hq-chart-4)",
    "var(--hq-chart-5)",
];
export const chartColors = {
    series: chartSeries,
    grid: "var(--hq-chart-grid)",
    axis: "var(--hq-chart-axis)",
    positive: "var(--hq-success-fill)",
    negative: "var(--hq-danger-fill)",
    warning: "var(--hq-warning-fill)",
};
/** Spread onto <CartesianGrid />. Horizontal hairlines only. */
export const gridProps = { stroke: chartColors.grid, vertical: false };
/** Spread onto <XAxis /> and <YAxis />. Tick text is styled by .hq-chart text in components.css. */
export const axisProps = { tickLine: false, axisLine: { stroke: chartColors.axis }, tickMargin: 6 };
export const valueAxisProps = { tickLine: false, axisLine: false, tickMargin: 6, width: 44 };
/** Spread onto <Tooltip />. */
export const tooltipProps = {
    cursor: { fill: "var(--hq-accent-wash)" },
    isAnimationActive: false,
};
/** Spread onto <Bar />. Square tops in Work, softened in Personal, via the control radius. */
export const barProps = { isAnimationActive: false, maxBarSize: 28 };
/** Spread onto <Line />. */
export const lineProps = { type: "monotone", strokeWidth: 2, dot: false, isAnimationActive: false };
