"use client";

import { useState } from "react";
import AttendanceBarChart from "./AttendanceBarChart";
import TrendLineChart from "./TrendLineChart";
import AttendanceDonut from "./AttendanceDonut";

type EventStat = {
  name: string;
  date: string;
  attended: number;
  total: number;
  rate: number;
};

interface Props {
  orgName: string;
  totalMembers: number;
  totalEvents: number;
  avgAttendance: number;
  lowestEvent: EventStat | null;
  eventStats: EventStat[];
}

const FILTERS = ["All", "≥70%", "<70%"] as const;
type Filter = (typeof FILTERS)[number];

export default function AnalyticsDashboard({
  orgName,
  totalMembers,
  totalEvents,
  avgAttendance,
  lowestEvent,
  eventStats,
}: Props) {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = eventStats.filter((e) => {
    if (filter === "≥70%") return e.rate >= 70;
    if (filter === "<70%") return e.rate < 70;
    return true;
  });

  const totalAttended = eventStats.reduce((sum, e) => sum + e.attended, 0);
  const totalPossible = eventStats.reduce((sum, e) => sum + e.total, 0);
  const overallRate = totalPossible > 0
    ? Math.round((totalAttended / totalPossible) * 100)
    : 0;

  const isEmpty = eventStats.length === 0;

  return (
    <div className="flex flex-col gap-6 p-6 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
          Participation Analytics
        </p>
        <h1 className="font-heading font-bold text-2xl text-slate-900">
          {orgName}
        </h1>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Members", value: totalMembers, sub: "registered" },
          { label: "Events Held", value: totalEvents, sub: "this semester" },
          {
            label: "Avg. Attendance",
            value: `${avgAttendance}%`,
            sub: "across all events",
            highlight: avgAttendance >= 70,
          },
          {
            label: "Lowest Rate",
            value: lowestEvent ? `${lowestEvent.rate}%` : "—",
            sub: lowestEvent?.name ?? "No events yet",
            danger: lowestEvent ? lowestEvent.rate < 70 : false,
          },
        ].map((m) => (
          <div
            key={m.label}
            className="bg-slate-50 rounded-xl p-4 flex flex-col gap-1"
          >
            <p className="text-xs font-medium text-slate-500">{m.label}</p>
            <p
              className={`text-2xl font-bold font-heading ${
                m.highlight
                  ? "text-primary-500"
                  : m.danger
                  ? "text-red-500"
                  : "text-slate-900"
              }`}
            >
              {m.value}
            </p>
            <p className="text-xs text-slate-400">{m.sub}</p>
          </div>
        ))}
      </div>

      {isEmpty ? (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center py-20 gap-3">
          <p className="text-slate-400 text-sm font-medium">No event data available</p>
          <p className="text-slate-300 text-xs">
            Attendance data will appear once events are created and synced.
          </p>
        </div>
      ) : (
        <>
          {/* Filter Pills */}
          <div className="flex gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-xs font-semibold px-4 py-1.5 rounded-full border transition-colors ${
                  filter === f
                    ? "bg-primary-500 text-white border-primary-500"
                    : "bg-white text-slate-500 border-slate-200 hover:border-primary-500"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-bold text-base text-slate-900">
                Attendance rate per event
              </h2>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-primary-500 inline-block" />
                  ≥70%
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-primary-50 border border-primary-500 inline-block" />
                  &lt;70%
                </span>
              </div>
            </div>
            <AttendanceBarChart events={filtered} />
          </div>

          {/* Line + Donut */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="font-heading font-bold text-base text-slate-900 mb-4">
                Participation trend
              </h2>
              <TrendLineChart events={eventStats} />
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="font-heading font-bold text-base text-slate-900 mb-4">
                Overall breakdown
              </h2>
              <AttendanceDonut
                attended={overallRate}
                absent={100 - overallRate}
                totalEvents={totalEvents}
                totalMembers={totalMembers}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}