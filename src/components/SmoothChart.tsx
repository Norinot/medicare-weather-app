interface SmoothChartProps {
  values: number[];
  width?: number;
  height?: number;
}

// I was contemplating wheter to use a chart library or use something simpler, since the Figma design was just a line in a box, I thought drawing something like an svg, or using pure html may be a better solution for such a requirement as this keeps the bundle size small and its also fairly simple once you understand what it does. The primary implementation of this used AI assistance, I just had the idea and left some comments for easier understanding in the future. Also chart libraries are usually very heavy.
export function SmoothChart({
  values,
  width = 500,
  height = 180,
}: SmoothChartProps) {
  // Return early if no data points are present, avoids drawing a meaningless chart.
  if (!values || values.length < 2) {
    return null;
  }

  const padX = 20;
  const padTop = 25;
  const padBottom = 15;

  // defines the usable draw area so we don't overflow from the svg
  const chartW = width - padX * 2;
  const chartH = height - padTop - padBottom;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  // Plotted coordinates: `points[index]`
  const points = values.map((value, index) => ({
    x: padX + (index / (values.length - 1)) * chartW,
    y: padTop + chartH - ((value - min) / range) * chartH,
  }));

  // To avoid sharp angles, custom Bézier smoothing.
  const tension = 0.3;
  let path = `M ${points[0].x},${points[0].y}`;

  for (let index = 0; index < points.length - 1; index += 1) {
    // Iterate through the plotted coordinates -> p[n] are just the neighboring points used to derive the smooth control points.
    const p0 = points[index - 1] || points[index];
    const p1 = points[index];
    const p2 = points[index + 1];
    const p3 = points[index + 2] || p2;

    const cp1x = p1.x + ((p2.x - p0.x) / 6) * (1 - tension);
    const cp1y = p1.y + ((p2.y - p0.y) / 6) * (1 - tension);
    const cp2x = p2.x - ((p3.x - p1.x) / 6) * (1 - tension);
    const cp2y = p2.y - ((p3.y - p1.y) / 6) * (1 - tension);

    path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }

  const gridLines = 3;
  const gridYs = Array.from(
    { length: gridLines },
    (_, index) => padTop + (chartH / (gridLines + 1)) * (index + 1),
  );

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="chart"
      role="img"
      aria-label={`Hőmérsékleti grafikon: ${values.join("°C, ")}°C`}
    >
      {gridYs.map((y, index) => (
        <line
          key={`${y}-${index}`}
          x1={padX}
          y1={y}
          x2={width - padX}
          y2={y}
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="0.8"
        />
      ))}
      <path
        d={path}
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
