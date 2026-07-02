"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface Props {
  attended: number;
  absent: number;
  totalEvents: number;
  totalMembers: number;
}

export default function AttendanceDonut({ attended, absent, totalEvents, totalMembers }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    chartRef.current?.destroy();
    chartRef.current = new Chart(ref.current, {
      type: "doughnut",
      data: {
        labels: ["Attended", "Absent"],
        datasets: [
          {
            data: [attended, absent],
            backgroundColor: ["#2A8F4D", "#EAF4EF"],
            borderColor: ["#2A8F4D", "#2A8F4D"],
            borderWidth: [0, 1],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${ctx.parsed}%` } },
        },
      },
    });
    return () => chartRef.current?.destroy();
  }, [attended, absent]);

  return (
    <div className="flex items-center gap-6">
      <div style={{ position: "relative", width: "120px", height: "120px", flexShrink: 0 }}>
        <canvas ref={ref} />
      </div>
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-primary-500 inline-block" />
          <span className="font-bold text-slate-900">{attended}%</span>
          <span className="text-slate-400">Attended</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-sm bg-primary-50 border border-primary-500 inline-block" />
          <span className="font-bold text-slate-900">{absent}%</span>
          <span className="text-slate-400">Absent</span>
        </div>
        <p className="text-xs text-slate-300 pt-2 border-t border-slate-100">
          {totalEvents} events · {totalMembers} members
        </p>
      </div>
    </div>
  );
}