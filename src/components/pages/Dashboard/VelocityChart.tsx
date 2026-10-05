"use client";

import React, { useState, useMemo } from "react";

// Task item shape accepted by the velocity chart
interface TaskItem {
  createdAt?: string;
  updatedAt?: string;
  status?: string;
}

interface VelocityChartProps {
  tasks: TaskItem[];
}

export default function VelocityChart({ tasks }: VelocityChartProps) {
  // Timeframe selector state: 7 days vs 4 weeks
  const [timeframe, setTimeframe] = useState<"7d" | "4w">("7d");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // BLOCK 1: Aggregate created vs completed tasks by day or by week
  const chartData = useMemo(() => {
    if (timeframe === "7d") {
      const days: { label: string; fullDate: string; created: number; completed: number }[] = [];
      const now = new Date();

      for (let i = 6; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split("T")[0];
        const dayLabel = d.toLocaleDateString("en-US", { weekday: "short" });

        const createdCount = tasks.filter((t) => {
          if (!t.createdAt) return false;
          return t.createdAt.startsWith(dateStr);
        }).length;

        const completedCount = tasks.filter((t) => {
          const isDone =
            t.status?.toLowerCase() === "done" ||
            t.status?.toLowerCase() === "completed";
          if (!isDone) return false;
          const refDate = t.updatedAt || t.createdAt;
          return refDate ? refDate.startsWith(dateStr) : false;
        }).length;

        days.push({
          label: dayLabel,
          fullDate: d.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          created: createdCount,
          completed: completedCount,
        });
      }
      return days;
    } else {
      const weeks: { label: string; fullDate: string; created: number; completed: number }[] = [];
      const now = new Date();

      for (let w = 3; w >= 0; w--) {
        const start = new Date(now);
        start.setDate(start.getDate() - (w + 1) * 7);
        const end = new Date(now);
        end.setDate(end.getDate() - w * 7);

        const startTime = start.getTime();
        const endTime = end.getTime();

        const createdCount = tasks.filter((t) => {
          if (!t.createdAt) return false;
          const tTime = new Date(t.createdAt).getTime();
          return tTime >= startTime && tTime <= endTime;
        }).length;

        const completedCount = tasks.filter((t) => {
          const isDone =
            t.status?.toLowerCase() === "done" ||
            t.status?.toLowerCase() === "completed";
          if (!isDone) return false;
          const refDate = t.updatedAt || t.createdAt;
          if (!refDate) return false;
          const tTime = new Date(refDate).getTime();
          return tTime >= startTime && tTime <= endTime;
        }).length;

        weeks.push({
          label: w === 0 ? "This Wk" : `Wk -${w}`,
          fullDate: `${start.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })} - ${end.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}`,
          created: createdCount,
          completed: completedCount,
        });
      }
      return weeks;
    }
  }, [tasks, timeframe]);

  // BLOCK 2: Dynamic sizing and column calculations
  const maxVal = Math.max(
    4,
    ...chartData.map((d) => Math.max(d.created, d.completed))
  );

  const chartHeight = 120;
  const chartWidth = 700;
  const paddingLeft = 28;
  const paddingRight = 12;
  const paddingBottom = 22;
  const availableWidth = chartWidth - paddingLeft - paddingRight;
  const barSlotWidth = availableWidth / chartData.length;
  const barWidth = timeframe === "7d" ? 14 : 22;

  const yTicks = [maxVal, Math.ceil((maxVal * 2) / 3), Math.ceil(maxVal / 3), 0];

  return (
    <div className="poppins flex flex-col gap-2.5 rounded-[8px] border border-[#565656]/15 bg-white p-4 shadow-sm dark:border-[#565656]/15 dark:bg-[#141414]">
      {/* Header Block: Title, Color Legend and Timeframe Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#565656]/10 pb-2.5">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-[13px] font-semibold text-[#111] dark:text-white">
            Velocity & Output Throughput
          </h3>

          {/* Legend Badges */}
          <div className="flex items-center gap-2.5 text-[10px]">
            <div className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-[2px] bg-[#7c3aed]" />
              <span className="text-zinc-500 dark:text-zinc-400">Created</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-[2px] bg-[#10b981]" />
              <span className="text-zinc-500 dark:text-zinc-400">Completed</span>
            </div>
          </div>
        </div>

        {/* Timeframe Toggle Buttons */}
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
            onClick={() => setTimeframe("4w")}
            className={`rounded px-2 py-0.5 transition-colors ${
              timeframe === "4w"
                ? "bg-white text-[#111] shadow-xs dark:bg-[#1f1f1f] dark:text-white"
                : "text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
            }`}
          >
            4 Weeks
          </button>
        </div>
      </div>

      {/* SVG Canvas Block: Dual-Bar Comparison Layout */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight + paddingBottom}`}
          className="h-[150px] w-full"
          preserveAspectRatio="none"
        >
          {/* Horizontal Gridlines & Y-Axis numeric labels */}
          {yTicks.map((tick, i) => {
            const y = (i / (yTicks.length - 1)) * chartHeight + 8;
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

          {/* Interactive Dual Bars per slot */}
          {chartData.map((item, index) => {
            const groupCenterX =
              paddingLeft + index * barSlotWidth + barSlotWidth / 2;
            const xCreated = groupCenterX - barWidth - 1.5;
            const xCompleted = groupCenterX + 1.5;

            const heightCreated =
              maxVal > 0 ? (item.created / maxVal) * chartHeight : 0;
            const heightCompleted =
              maxVal > 0 ? (item.completed / maxVal) * chartHeight : 0;

            const yCreated = chartHeight + 8 - heightCreated;
            const yCompleted = chartHeight + 8 - heightCompleted;

            const isHovered = hoveredIndex === index;

            return (
              <g
                key={index}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Subtle column hover highlight backdrop */}
                {isHovered && (
                  <rect
                    x={paddingLeft + index * barSlotWidth + 2}
                    y={8}
                    width={barSlotWidth - 4}
                    height={chartHeight}
                    fill="currentColor"
                    className="text-zinc-100 dark:text-zinc-800/30"
                    rx={3}
                  />
                )}

                {/* Created Task Bar */}
                <rect
                  x={xCreated}
                  y={yCreated}
                  width={barWidth}
                  height={Math.max(2, heightCreated)}
                  rx={2}
                  fill="#7c3aed"
                  className="transition-all duration-200"
                />

                {/* Completed Task Bar */}
                <rect
                  x={xCompleted}
                  y={yCompleted}
                  width={barWidth}
                  height={Math.max(2, heightCompleted)}
                  rx={2}
                  fill="#10b981"
                  className="transition-all duration-200"
                />

                {/* X-Axis Date/Week Label */}
                <text
                  x={groupCenterX}
                  y={chartHeight + 20}
                  textAnchor="middle"
                  className={`text-[9px] select-none font-medium transition-colors ${
                    isHovered
                      ? "fill-black dark:fill-white font-semibold"
                      : "fill-zinc-400 dark:fill-zinc-500"
                  }`}
                >
                  {item.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip Detail Overlay */}
        {hoveredIndex !== null && chartData[hoveredIndex] && (
          <div
            className="pointer-events-none absolute top-1 rounded border border-[#565656]/20 bg-[#181818] px-2.5 py-1.5 text-white shadow-lg transition-all duration-150"
            style={{
              left: `${Math.min(
                Math.max(
                  10,
                  ((paddingLeft +
                    hoveredIndex * barSlotWidth +
                    barSlotWidth / 2) /
                    chartWidth) *
                    100 -
                    15
                ),
                70
              )}%`,
            }}
          >
            <p className="text-[9px] font-mono text-zinc-400 border-b border-[#565656]/20 pb-0.5 mb-0.5">
              {chartData[hoveredIndex].fullDate}
            </p>
            <div className="flex items-center justify-between gap-3 text-[10px]">
              <span className="flex items-center gap-1 text-[#a78bfa]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7c3aed]" />
                Created:
              </span>
              <span className="font-semibold">
                {chartData[hoveredIndex].created}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 text-[10px]">
              <span className="flex items-center gap-1 text-[#34d399]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
                Completed:
              </span>
              <span className="font-semibold">
                {chartData[hoveredIndex].completed}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
