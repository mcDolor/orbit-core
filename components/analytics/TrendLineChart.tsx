"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

type EventStat = { name: string; date: string; rate: number };

export default function TrendLineChart({ events }: { events: EventStat[] }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    chartRef.current?.destroy();
    chartRef.current = new Chart(ref.current, {
      type: "line",
      data: {
        labels: events.map((_, i) => `Event ${i + 1}`),
        datasets: [
          {
            label: "Rate",
            data: events.map((e) => e.rate),
            borderColor: "#2A8F4D",
            backgroundColor: "rgba(42,143,77,0.08)",
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "#2A8F4D",
            pointRadius: 4,
            borderWidth: 2,
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
          x: { ticks: { color: "#94a3b8", font: { size: 11 } }, grid: { display: false } },
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

  return (
    <div style={{ position: "relative", width: "100%", height: "180px" }}>
      <canvas ref={ref} />
    </div>
  );
}