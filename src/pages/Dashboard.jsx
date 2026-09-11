import {
  ShieldAlert,
  Map,
  Bell,
  Users,
  CloudRain,
  Activity,
  ArrowUpRight,
  Clock,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Sidebar />

      {/* Main application */}
      <div className="app-main">
        <Navbar />

        <main className="page-enter page-container p-4 sm:p-6 lg:p-8 lg:pr-14 xl:pr-20">
          {/* Page heading */}
          <div className="flex flex-col justify-between gap-4 border-b border-[#d8d3c7] pb-6 lg:flex-row lg:items-end">
            <div className="min-w-0 border-l-4 border-[#b8862e] pl-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="live-dot bg-emerald-600"></span>

                <span className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
                  Live Monitoring
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-[#12293f] sm:text-3xl">
                Regional Risk Dashboard
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-slate-500">
                Monitor landslide and flash-flood threats across vulnerable
                regions of Northeast India.
              </p>
            </div>

            <div className="mr-1 flex shrink-0 items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2.5 shadow-sm sm:mr-2">
              <Clock size={16} className="text-slate-400" />

              <div>
                <p className="text-[10px] uppercase tracking-wide text-slate-400">
                  Last updated
                </p>

                <p className="text-xs font-semibold text-slate-700">
                  Just now
                </p>
              </div>
            </div>
          </div>

          {/* Statistics — one unified strip, not separate boxes */}
          <div className="glass-card grid grid-cols-1 divide-y divide-white/60 p-1 sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:p-1.5 xl:grid-cols-4 xl:divide-x">
            <StatCard
              title="High Risk Zones"
              value="07"
              description="2 zones escalated today"
              icon={ShieldAlert}
              iconBg="bg-red-50"
              iconColor="text-red-600"
              accentColor="#7a1f1f"
              status="Critical"
            />

            <StatCard
              title="Monitored Zones"
              value="42"
              description="Across 8 northeastern states"
              icon={Map}
              iconBg="bg-blue-50"
              iconColor="text-[#12293f]"
              accentColor="#12293f"
              status="Active"
            />

            <StatCard
              title="Active Alerts"
              value="12"
              description="3 require immediate action"
              icon={Bell}
              iconBg="bg-orange-50"
              iconColor="text-orange-600"
              accentColor="#b8862e"
              status="Live"
            />

            <StatCard
              title="Population at Risk"
              value="24.5K"
              description="Estimated affected population"
              icon={Users}
              iconBg="bg-purple-50"
              iconColor="text-purple-600"
              accentColor="#5b4636"
              status="Estimate"
            />
          </div>

          {/* Main dashboard grid */}
          <div className="grid gap-6 xl:grid-cols-5">
            {/* Risk overview — now smaller */}
            <div className="glass-card p-6 xl:col-span-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[#12293f]">
                    Regional Risk Overview
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Current threat distribution across monitored areas
                  </p>
                </div>

                <button
                  onClick={() => navigate("/risk-map")}
                  className="flex items-center gap-1 text-xs font-semibold text-[#12293f] transition hover:text-[#b8862e]"
                >
                  View map
                  <ArrowUpRight size={14} />
                </button>
              </div>

              {/* Clickable Map */}
              <div
                onClick={() => navigate("/risk-map")}
                className="relative mt-6 flex h-[240px] cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-[#1c3d5a] bg-[#0f2338] transition duration-200 hover:border-[#b8862e]/60 sm:h-[260px]"
              >
                {/* Cartographic grid */}
                <div
                  className="absolute inset-0 opacity-25"
                  style={{
                    backgroundImage:
                      "linear-gradient(#3d5872 1px, transparent 1px), linear-gradient(90deg, #3d5872 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Region outline accents */}
                <div className="absolute inset-6 rounded-md border border-dashed border-[#3d5872]" />

                {/* Risk markers — static, no motion, official cartographic style */}
                <div className="absolute left-[31%] top-[38%] flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-red-500" />

                <div className="absolute right-[30%] top-[30%] flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-orange-500" />

                <div className="absolute bottom-[30%] left-[48%] flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white bg-yellow-400" />

                <div className="absolute bottom-[22%] right-[22%] flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white bg-emerald-500" />

                {/* Center text */}
                <div className="relative z-10 text-center">
                  <Map size={32} className="mx-auto text-[#d9a94a]" strokeWidth={1.5} />

                  <p
                    className="mt-3 text-sm font-semibold text-white"
                    style={{ fontFamily: "'Merriweather', Georgia, serif" }}
                  >
                    GIS Risk Map
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Click to explore detailed risk zones
                  </p>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-md border border-[#3d5872] bg-[#0b1c2c]/90 px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>

                    <span className="text-[10px] text-slate-300">
                      Critical
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-orange-500"></span>

                    <span className="text-[10px] text-slate-300">
                      High
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400"></span>

                    <span className="text-[10px] text-slate-300">
                      Moderate
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>

                    <span className="text-[10px] text-slate-300">
                      Low
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right panel — Environmental Signals, now bigger */}
            <div className="glass-card flex flex-col gap-6 p-7 xl:col-span-2 xl:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#12293f]/10">
                  <Activity size={22} className="text-[#12293f]" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-[#12293f]">
                    Environmental Signals
                  </h2>

                  <p className="text-xs text-slate-500">
                    Latest sensor indicators
                  </p>
                </div>
              </div>

              {/* Rainfall */}
              <div className="rounded-xl bg-white/40 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <CloudRain size={18} className="shrink-0 text-blue-500" />

                    <span className="text-sm font-medium text-slate-700">
                      Rainfall
                    </span>
                  </div>

                  <span className="shrink-0 text-base font-bold text-slate-900">
                    182 mm
                  </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200/70">
                  <div className="h-full w-[82%] rounded-full bg-blue-500"></div>
                </div>

                <p className="mt-3 text-[11px] font-medium text-red-500">
                  Above critical threshold
                </p>
              </div>

              {/* Soil moisture */}
              <div className="rounded-xl bg-white/40 p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-slate-700">
                    Soil Moisture
                  </span>

                  <span className="shrink-0 text-base font-bold text-slate-900">
                    81%
                  </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200/70">
                  <div className="h-full w-[81%] rounded-full bg-orange-500"></div>
                </div>

                <p className="mt-3 text-[11px] font-medium text-orange-500">
                  High saturation detected
                </p>
              </div>

              {/* System health */}
              <div className="mt-auto rounded-xl bg-slate-50/70 p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-medium text-slate-600">
                    Monitoring System
                  </span>

                  <span className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                    Operational
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;