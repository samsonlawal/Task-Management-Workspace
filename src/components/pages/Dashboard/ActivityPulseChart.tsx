"use client";

import React, { useState, useMemo } from "react";

// Task item shape accepted by the chart
interface TaskItem {
  createdAt?: string;
  updatedAt?: string;
  status?: string;
}

interface ActivityPulseChartProps {
  tasks: TaskItem[];
}

export default function ActivityPulseChart({ tasks }: ActivityPulseChartProps) {
  // Timeframe selector state: 7 days vs 14 days
  const [timeframe, setTimeframe] = useState<"7d" | "14d">("7d");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const numDays = timeframe === "7d" ? 7 : 14;

  // BLOCK 1: Aggregate daily creation/update activity across the selected timeframe
  const dataPoints = useMemo(() => {
    const points: { label: string; fullDate: string; count: number }[] = [];
    const now = new Date();

    for (let i = numDays - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const dayLabel =
        numDays === 7
          ? d.toLocaleDateString("en-US", { weekday: "short" })
          : d.toLocaleDateString("en-US", { month: "numeric", day: "numeric" });

      const count = tasks.filter((t) => {
        const createdMatch = t.createdAt?.startsWith(dateStr);
        const updatedMatch = t.updatedAt?.startsWith(dateStr);
        return createdMatch || updatedMatch;
      }).length;

      points.push({
        label: dayLabel,
        fullDate: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        count,
      });
    }
    return points;
  }, [tasks, numDays]);

  // BLOCK 2: Chart geometry and coordinate calculations
  const maxVal = Math.max(4, ...dataPoints.map((p) => p.count));
  const chartHeight = 120;
  const chartWidth = 600;
  const paddingLeft = 24;
  const paddingRight = 12;
  const paddingBottom = 22;
  const paddingTop = 8;
  const availableWidth = chartWidth - paddingLeft - paddingRight;
  const stepX = availableWidth / (dataPoints.length - 1);

  // Map each data point to (x, y) coordinates
  const coordinates = dataPoints.map((p, index) => {
    const x = paddingLeft + index * stepX;
    const y = paddingTop + chartHeight - (p.count / maxVal) * chartHeight;
    return { x, y, ...p };
  });

  // Sharp continuous line path (M ... L ...)
  const linePath = coordinates.reduce((path, pt, index) => {
    if (index === 0) return `M ${pt.x},${pt.y}`;
    return `${path} L ${pt.x},${pt.y}`;
  }, "");

  // Gradient area fill under the line path
  const areaPath = `${linePath} L ${coordinates[coordinates.length - 1].x},${chartHeight + paddingTop} L ${coordinates[0].x},${chartHeight + paddingTop} Z`;

  // Horizontal Y-Axis tick values
  const yTicks = [maxVal, Math.ceil((maxVal * 2) / 3), Math.ceil(maxVal / 3), 0];

  return (
    <div className="poppins flex flex-col gap-2.5 rounded-[8px] border border-[#565656]/15 bg-white p-4 shadow-xs dark:border-[#565656]/15 dark:bg-[#141414]">
      {/* Header Block: Title & Timeframe Toggle */}
      <div className="flex items-center justify-between border-b border-[#565656]/10 pb-2.5">
        <h3 className="text-[13px] font-semibold text-[#111] dark:text-white">
          Daily Execution Pulse
        </h3>

        <div className="flex items-center rounded-md border border-[#565656]/15 bg-zinc-100 p-0.5 text-[10px] font-medium dark:bg-zinc-800/70">
          <button
            onClick={() => setTimeframe("7d")}
            className={`rounded px-2 py-0.5 transition-colors ${
              timeframe === "7d"
                ? "bg-white text-[#111] shadow-xs dark:bg-[#1f1f1f] dark:text-white"
                : "text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setTimeframe("14d")}
            className={`rounded px-2 py-0.5 transition-colors ${
              timeframe === "14d"
                ? "bg-white text-[#111] shadow-xs dark:bg-[#1f1f1f] dark:text-white"
                : "text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            14 Days
          </button>
        </div>
      </div>

      {/* SVG Line Chart Block (Clean, Ring-free, Edge-to-Edge) */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight + paddingBottom + paddingTop}`}
          className="h-[150px] w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="emeraldGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Gridlines & Y-Axis values */}
          {yTicks.map((tick, i) => {
            const y = (i / (yTicks.length - 1)) * chartHeight + paddingTop;
            return (
              <g key={i}>
                <text
                  x={paddingLeft - 6}
                  y={y + 3}
                  textAnchor="end"
                  className="fill-zinc-400 text-[8px] font-mono select-none dark:fill-zinc-500"
                >
                  {tick}
                </text>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={chartWidth - paddingRight}
                  y2={y}
                  stroke="currentColor"
                  strokeDasharray="3 3"
                  className="text-zinc-200 dark:text-zinc-800/80"
                  strokeWidth={1}
                />
              </g>
            );
          })}

          {/* Area Gradient Fill */}
          <path d={areaPath} fill="url(#emeraldGlow)" />

          {/* Clean Sharp Line Stroke (No Rings) */}
          <path
            d={linePath}
            fill="none"
            stroke="#10b981"
            strokeWidth={2}
            strokeLinecap="round"
          />

          {/* Interactive Hover Columns & X-Axis Day Labels */}
          {coordinates.map((pt, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <g
                key={index}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Vertical hover crosshair guide */}
                {isHovered && (
                  <line
                    x1={pt.x}
                    y1={paddingTop}
                    x2={pt.x}
                    y2={chartHeight + paddingTop}
                    stroke="#565656"
                    strokeOpacity={0.35}
                    strokeDasharray="2 2"
                    strokeWidth={1}
                  />
                )}

                {/* X-Axis Date Label */}
                <text
                  x={pt.x}
                  y={chartHeight + paddingTop + 15}
                  textAnchor="middle"
                  className={`text-[9px] select-none font-medium transition-colors ${
                    isHovered
                      ? "fill-black dark:fill-white font-semibold"
                      : "fill-zinc-400 dark:fill-zinc-500"
                  }`}
                >
                  {pt.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredIndex !== null && coordinates[hoveredIndex] && (
          <div
            className="pointer-events-none absolute top-1 rounded border border-[#565656]/20 bg-[#181818] px-2.5 py-1 text-white shadow-lg transition-all duration-150"
            style={{
              left: `${Math.min(
                Math.max(
                  10,
                  (coordinates[hoveredIndex].x / chartWidth) * 100 - 15
                ),
                70
              )}%`,
            }}
          >
            <p className="text-[9px] font-mono text-zinc-400 border-b border-[#565656]/20 pb-0.5 mb-0.5">
              {coordinates[hoveredIndex].fullDate}
            </p>
            <div className="flex items-center gap-1.5 text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
              <span className="text-zinc-300">Activity:</span>
              <span className="font-semibold text-white">
                {coordinates[hoveredIndex].count} updates
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
