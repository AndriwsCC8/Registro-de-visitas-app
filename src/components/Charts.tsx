interface BarData { label: string; value: number }
interface LineData { label: string; value: number }

function maxVal(data: { value: number }[]) {
  return Math.max(...data.map((d) => d.value), 1);
}

export function BarChart({ data, color = "#00A651", height = 180 }: { data: BarData[]; color?: string; height?: number }) {
  const max = maxVal(data);
  const barW = Math.floor(480 / data.length) - 6;
  return (
    <svg width="100%" viewBox={`0 0 480 ${height}`} preserveAspectRatio="none" style={{ overflow: "visible" }}>
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((r) => (
        <line key={r} x1={0} x2={480} y1={height * (1 - r)} y2={height * (1 - r)} stroke="#E8EFF8" strokeWidth={1} />
      ))}
      {data.map((d, i) => {
        const x = i * (480 / data.length) + 3;
        const barH = Math.max((d.value / max) * (height - 20), 4);
        const y = height - barH;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={barH} fill={color} rx={4} opacity={0.9} />
            <text x={x + barW / 2} y={height + 14} textAnchor="middle" fontSize={11} fill="#5A7099">{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function HBarChart({ data, color = "#00A651", height = 200 }: { data: BarData[]; color?: string; height?: number }) {
  const max = maxVal(data);
  const rowH = height / data.length;
  const labelW = 110;
  const barMax = 340;
  return (
    <svg width="100%" viewBox={`0 0 480 ${height}`} preserveAspectRatio="none" style={{ overflow: "visible" }}>
      {data.map((d, i) => {
        const barW = Math.max((d.value / max) * barMax, 4);
        const y = i * rowH + rowH / 2;
        return (
          <g key={i}>
            <text x={0} y={y + 4} fontSize={11} fill="#5A7099">{d.label}</text>
            <rect x={labelW} y={y - 6} width={barMax} height={12} fill="#E8EFF8" rx={4} />
            <rect x={labelW} y={y - 6} width={barW} height={12} fill={color} rx={4} />
            <text x={labelW + barW + 5} y={y + 4} fontSize={11} fill="#0D1B3E">{d.value}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function LineChart({ data, color = "#00A651", height = 180, fill = false }: { data: LineData[]; color?: string; height?: number; fill?: boolean }) {
  const max = maxVal(data);
  const w = 480;
  const pad = 10;
  const points = data.map((d, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = pad + (1 - d.value / max) * (height - pad * 2 - 20);
    return { x, y, label: d.label };
  });
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaD = pathD + ` L${points[points.length - 1].x},${height - 20} L${points[0].x},${height - 20} Z`;
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.2} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((r) => (
        <line key={r} x1={pad} x2={w - pad} y1={pad + (1 - r) * (height - pad * 2 - 20)} y2={pad + (1 - r) * (height - pad * 2 - 20)} stroke="#E8EFF8" strokeWidth={1} />
      ))}
      {fill && <path d={areaD} fill={`url(#grad-${color.replace("#", "")})`} />}
      <path d={pathD} stroke={color} strokeWidth={2.5} fill="none" strokeLinejoin="round" strokeLinecap="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3.5} fill={color} stroke="white" strokeWidth={1.5} />
      ))}
      {points.map((p, i) => (
        <text key={i} x={p.x} y={height - 4} textAnchor="middle" fontSize={11} fill="#5A7099">{p.label}</text>
      ))}
    </svg>
  );
}

export function DonutChart({ data, size = 140 }: { data: { name: string; value: number; color: string }[]; size?: number }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = size * 0.3;
  const cx = size / 2;
  const cy = size / 2;
  let angle = -Math.PI / 2;
  const slices = data.map((d) => {
    const start = angle;
    const sweep = (d.value / total) * 2 * Math.PI;
    angle += sweep;
    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(angle);
    const y2 = cy + r * Math.sin(angle);
    const outerR = size * 0.45;
    const ox1 = cx + outerR * Math.cos(start);
    const oy1 = cy + outerR * Math.sin(start);
    const ox2 = cx + outerR * Math.cos(angle);
    const oy2 = cy + outerR * Math.sin(angle);
    const large = sweep > Math.PI ? 1 : 0;
    return { d: `M${ox1},${oy1} A${outerR},${outerR} 0 ${large},1 ${ox2},${oy2} L${x2},${y2} A${r},${r} 0 ${large},0 ${x1},${y1} Z`, color: d.color };
  });
  return (
    <svg width={size} height={size}>
      {slices.map((s, i) => <path key={i} d={s.d} fill={s.color} stroke="white" strokeWidth={2} />)}
    </svg>
  );
}
