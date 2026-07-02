"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

type EventStat = { name: string; rate: number };

export default function AttendanceBarChart({ events }: { events: EventStat[] }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    chartRef.current?.destroy();
    chartRef.current = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: events.map((e) => e.name),
        datasets: [
          {
            label: "Attendance %",
            data: events.map((e) => e.rate),
            backgroundColor: events.map((e) =>
              e.rate >= 70 ? "#2A8F4D" : "#EAF4EF"
            ),
            borderColor: events.map((e) =>
              e.rate >= 70 ? "#2A8F4D" : "#2A8F4D"
            ),
            borderWidth: events.map((e) => (e.rate >= 70 ? 0 : 1)) as unknown as number,
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (ctx) => `${ctx.parsed.y}%` } },
        },
        scales: {
          x: {
            ticks: { color: "#94a3b8", font: { size: 11 }, maxRotation: 35, autoSkip: false },
            grid: { display: false },
          },
          y: {
            min: 0,
            max: 100,
            ticks: { color: "#94a3b8", font: { size: 11 }, callback: (v) => `${v}%`, stepSize: 25 },
            grid: { color: "rgba(0,0,0,0.05)" },
          },
        },
      },
    });
    return () => chartRef.current?.destroy();
  }, [events]);

  if (events.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-slate-300 text-sm">
        No data available
      </div>
    );
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "220px" }}>
      <canvas ref={ref} />
    </div>
  );
}