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
    <div className="min-h-screen bg-slate-50">

      <Sidebar />

      {/* Main application */}
      <div className="ml-64">

        <Navbar />

        <main className="p-8">

          {/* Page heading */}
          <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">

            <div>

              <div className="mb-2 flex items-center gap-2">

                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>

                <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
                  Live Monitoring
                </span>

              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Regional Risk Dashboard
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-slate-500">
                Monitor landslide and flash-flood threats across vulnerable
                regions of Northeast India.
              </p>

            </div>

            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">

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

          {/* Statistics */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            <StatCard
              title="High Risk Zones"
              value="07"
              description="2 zones escalated today"
              icon={ShieldAlert}
              iconBg="bg-red-50"
              iconColor="text-red-600"
              status="Critical"
            />

            <StatCard
              title="Monitored Zones"
              value="42"
              description="Across 8 northeastern states"
              icon={Map}
              iconBg="bg-blue-50"
              iconColor="text-blue-600"
              status="Active"
            />

            <StatCard
              title="Active Alerts"
              value="12"
              description="3 require immediate action"
              icon={Bell}
              iconBg="bg-orange-50"
              iconColor="text-orange-600"
              status="Live"
            />

            <StatCard
              title="Population at Risk"
              value="24.5K"
              description="Estimated affected population"
              icon={Users}
              iconBg="bg-purple-50"
              iconColor="text-purple-600"
              status="Estimate"
            />

          </div>

          {/* Main dashboard grid */}
          <div className="mt-6 grid gap-6 xl:grid-cols-3">

            {/* Risk overview */}
            <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-lg font-semibold text-slate-900">
                    Regional Risk Overview
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Current threat distribution across monitored areas
                  </p>

                </div>

                <button className="flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700">
                  View map
                  <ArrowUpRight size={14} />
                </button>

              </div>

              {/* Map placeholder */}
              <div className="relative mt-6 flex h-[340px] items-center justify-center overflow-hidden rounded-2xl bg-slate-900">

                {/* Grid */}
                <div className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "linear-gradient(#64748b 1px, transparent 1px), linear-gradient(90deg, #64748b 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Fake terrain */}
                <div className="absolute left-[25%] top-[25%] h-32 w-48 rotate-12 rounded-[40%] bg-emerald-900/70 blur-sm"></div>

                <div className="absolute right-[20%] top-[18%] h-40 w-32 -rotate-12 rounded-[45%] bg-orange-900/60 blur-sm"></div>

                <div className="absolute bottom-[18%] left-[40%] h-28 w-52 rotate-6 rounded-[45%] bg-red-900/60 blur-sm"></div>

                {/* Risk points */}
                <div className="absolute left-[31%] top-[38%]">
                  <span className="absolute h-8 w-8 animate-ping rounded-full bg-red-500 opacity-30"></span>
                  <span className="relative block h-4 w-4 rounded-full border-2 border-white bg-red-500"></span>
                </div>

                <div className="absolute right-[30%] top-[30%]">
                  <span className="absolute h-7 w-7 animate-ping rounded-full bg-orange-500 opacity-30"></span>
                  <span className="relative block h-4 w-4 rounded-full border-2 border-white bg-orange-500"></span>
                </div>

                <div className="absolute left-[48%] bottom-[30%]">
                  <span className="relative block h-4 w-4 rounded-full border-2 border-white bg-yellow-400"></span>
                </div>

                {/* Center text */}
                <div className="relative z-10 text-center">

                  <Map
                    size={38}
                    className="mx-auto text-slate-400"
                  />

                  <p className="mt-3 text-sm font-semibold text-white">
                    GIS Risk Map
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Interactive visualization coming next
                  </p>

                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 flex items-center gap-4 rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 backdrop-blur">

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

                </div>

              </div>

            </div>

            {/* Right panel */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-emerald-50 p-3">
                  <Activity
                    size={20}
                    className="text-emerald-600"
                  />
                </div>

                <div>

                  <h2 className="text-lg font-semibold text-slate-900">
                    Environmental Signals
                  </h2>

                  <p className="text-xs text-slate-500">
                    Latest sensor indicators
                  </p>

                </div>

              </div>

              {/* Rainfall */}
              <div className="mt-7">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-2">
                    <CloudRain
                      size={17}
                      className="text-blue-500"
                    />

                    <span className="text-sm font-medium text-slate-700">
                      Rainfall
                    </span>
                  </div>

                  <span className="text-sm font-bold text-slate-900">
                    182 mm
                  </span>

                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">

                  <div className="h-full w-[82%] rounded-full bg-blue-500"></div>

                </div>

                <p className="mt-2 text-[11px] text-red-500">
                  Above critical threshold
                </p>

              </div>

              {/* Soil moisture */}
              <div className="mt-7">

                <div className="flex items-center justify-between">

                  <span className="text-sm font-medium text-slate-700">
                    Soil Moisture
                  </span>

                  <span className="text-sm font-bold text-slate-900">
                    81%
                  </span>

                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">

                  <div className="h-full w-[81%] rounded-full bg-orange-500"></div>

                </div>

                <p className="mt-2 text-[11px] text-orange-500">
                  High saturation detected
                </p>

              </div>

              {/* System health */}
              <div className="mt-7 rounded-xl bg-slate-50 p-4">

                <div className="flex items-center justify-between">

                  <span className="text-xs font-medium text-slate-600">
                    Monitoring System
                  </span>

                  <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">

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