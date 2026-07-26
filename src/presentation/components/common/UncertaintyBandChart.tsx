interface UncertaintyBandChartProps {
  viewBoxWidth?: number;
  viewBoxHeight?: number;
  bandPath: string;
  historicalPoints?: string;
  p50Points: string;
  todayX: number;
  xLabels: string[];
}

export function UncertaintyBandChart({
  viewBoxWidth = 600,
  viewBoxHeight = 300,
  bandPath,
  historicalPoints,
  p50Points,
  todayX,
  xLabels,
}: UncertaintyBandChartProps) {
  return (
    <div className="relative h-[300px] w-full">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio="none"
        role="img"
        aria-label="Grafik interval ketidakpastian harga P10-P90"
      >
        <path d={bandPath} fill="rgba(143, 182, 208, 0.25)" stroke="none" />
        {historicalPoints && <polyline fill="none" points={historicalPoints} stroke="#243a5e" strokeWidth={3} />}
        <polyline
          fill="none"
          points={p50Points}
          stroke="#5f86a6"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1={todayX} x2={todayX} y1={0} y2={viewBoxHeight} stroke="#44474e" strokeDasharray="4" strokeWidth={1.5} />
      </svg>
      <div className="absolute top-4" style={{ left: todayX, transform: 'translateX(-50%)' }}>
        <span className="rounded bg-on-surface px-2 py-1 text-[10px] font-bold text-background">HARI INI</span>
      </div>
      <div className="absolute bottom-0 flex w-full justify-between text-caption font-medium text-outline">
        {xLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}
