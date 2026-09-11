import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  Clock3,
  Users,
  Mountain,
  ShieldAlert,
  X,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const initialAlerts = [
  {
    id: 1,
    severity: "Critical",
    title: "High Landslide Risk Detected",
    location: "East Sikkim, Sikkim",
    risk: 87,
    time: "2 min ago",
    villages: 3,
    population: 4820,
    message:
      "Heavy rainfall, high soil moisture and steep terrain indicate a critical landslide probability.",
    status: "Active",
  },
  {
    id: 2,
    severity: "High",
    title: "Elevated Landslide Probability",
    location: "West Kameng, Arunachal Pradesh",
    risk: 72,
    time: "18 min ago",
    villages: 5,
    population: 3180,
    message:
      "Environmental conditions have crossed the high-risk threshold. Continue close monitoring.",
    status: "Active",
  },
  {
    id: 3,
    severity: "High",
    title: "Rainfall Threshold Exceeded",
    location: "Dima Hasao, Assam",
    risk: 68,
    time: "31 min ago",
    villages: 4,
    population: 2740,
    message:
      "Accumulated rainfall and increasing soil moisture require field verification.",
    status: "Active",
  },
  {
    id: 4,
    severity: "Moderate",
    title: "Moderate Terrain Risk",
    location: "East Khasi Hills, Meghalaya",
    risk: 49,
    time: "1 hr ago",
    villages: 2,
    population: 1960,
    message:
      "Risk indicators are elevated but remain below the high-risk threshold.",
    status: "Monitoring",
  },
];

function Alerts() {
  
  const [alerts, setAlerts] = useState(initialAlerts);
  const [selectedAlert, setSelectedAlert] = useState(null);

  const acknowledgeAlert = (id) => {
    setAlerts((currentAlerts) =>
      currentAlerts.map((alert) =>
        alert.id === id
          ? { ...alert, status: "Acknowledged" }
          : alert
      )
    );

    setSelectedAlert(null);
  };

  const generateEmergencyAlert = () => {
    const newAlert = {
      id: Date.now(),
      severity: "Critical",
      title: "Emergency Alert Generated",
      location: "East Sikkim, Sikkim",
      risk: 87,
      time: "Just now",
      villages: 3,
      population: 4820,
      message:
        "Critical risk identified by the AI prediction system. Immediate field assessment is recommended.",
      status: "Active",
    };

    setAlerts((currentAlerts) => [newAlert, ...currentAlerts]);
  };

  const criticalCount = alerts.filter(
    (alert) => alert.severity === "Critical" && alert.status === "Active"
  ).length;

  const highCount = alerts.filter(
    (alert) => alert.severity === "High" && alert.status === "Active"
  ).length;

  const acknowledgedCount = alerts.filter(
    (alert) => alert.status === "Acknowledged"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div className="ml-64">
        <Navbar />

        <main className="p-8">

          {/* Page Header */}
          <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-red-500"></span>

                <span className="text-xs font-semibold uppercase tracking-widest text-red-600">
                  Emergency Monitoring
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Emergency Alerts
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-slate-500">
                Monitor AI-generated disaster alerts and coordinate rapid
                response across vulnerable regions.
              </p>
            </div>

            <button
              onClick={() => {
                generateEmergencyAlert();
                navigate("/emergency-priority");
              }}
              className="flex items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600"
            >
              <ShieldAlert size={18} />
              Generate Emergency Alert
            </button>
          </div>

          {/* Alert Summary */}
          <div className="grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
                  <AlertTriangle
                    size={21}
                    className="text-red-500"
                  />
                </div>

                <span className="text-xs font-semibold text-red-500">
                  LIVE
                </span>
              </div>

              <p className="mt-5 text-sm text-slate-500">
                Critical Alerts
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-900">
                {criticalCount}
              </h2>
            </div>

            <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
                  <Bell
                    size={21}
                    className="text-orange-500"
                  />
                </div>

                <span className="text-xs font-semibold text-orange-500">
                  ACTIVE
                </span>
              </div>

              <p className="mt-5 text-sm text-slate-500">
                High Priority Alerts
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-900">
                {highCount}
              </h2>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                  <CheckCircle2
                    size={21}
                    className="text-emerald-500"
                  />
                </div>

                <span className="text-xs font-semibold text-emerald-500">
                  RESOLVED
                </span>
              </div>

              <p className="mt-5 text-sm text-slate-500">
                Acknowledged Alerts
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-900">
                {acknowledgedCount}
              </h2>
            </div>

          </div>

          {/* Alerts List */}
          <div className="mt-7 rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Active Alert Feed
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Real-time disaster intelligence generated by TerraGuard
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>

                <span className="text-xs font-medium text-slate-500">
                  System Operational
                </span>
              </div>
            </div>

            <div className="divide-y divide-slate-100">

              {alerts.map((alert) => {

                const severityStyles = {
                  Critical: {
                    badge: "bg-red-50 text-red-600",
                    icon: "bg-red-50 text-red-500",
                    border: "border-l-red-500",
                  },

                  High: {
                    badge: "bg-orange-50 text-orange-600",
                    icon: "bg-orange-50 text-orange-500",
                    border: "border-l-orange-500",
                  },

                  Moderate: {
                    badge: "bg-yellow-50 text-yellow-600",
                    icon: "bg-yellow-50 text-yellow-500",
                    border: "border-l-yellow-500",
                  },
                };

                const style =
                  severityStyles[alert.severity];

                return (
                  <div
                    key={alert.id}
                    className={`border-l-4 px-6 py-5 ${style.border}`}
                  >

                    <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

                      <div className="flex gap-4">

                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${style.icon}`}
                        >
                          <AlertTriangle size={20} />
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">

                            <h3 className="font-semibold text-slate-900">
                              {alert.title}
                            </h3>

                            <span
                              className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${style.badge}`}
                            >
                              {alert.severity}
                            </span>

                            {alert.status === "Acknowledged" && (
                              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase text-emerald-600">
                                Acknowledged
                              </span>
                            )}

                          </div>

                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">

                            <span className="flex items-center gap-1.5">
                              <MapPin size={14} />
                              {alert.location}
                            </span>

                            <span className="flex items-center gap-1.5">
                              <Clock3 size={14} />
                              {alert.time}
                            </span>

                            <span className="flex items-center gap-1.5">
                              <Users size={14} />
                              {alert.population.toLocaleString()} people
                            </span>

                          </div>

                          <p className="mt-3 max-w-2xl text-xs leading-relaxed text-slate-500">
                            {alert.message}
                          </p>
                        </div>

                      </div>

                      <div className="flex items-center gap-5">

                        <div className="text-center">
                          <p className="text-[10px] uppercase tracking-wide text-slate-400">
                            Risk
                          </p>

                          <p className="mt-1 text-2xl font-black text-slate-900">
                            {alert.risk}%
                          </p>
                        </div>

                        <div className="hidden h-10 w-px bg-slate-200 xl:block"></div>

                        <div className="text-center">
                          <p className="text-[10px] uppercase tracking-wide text-slate-400">
                            Villages
                          </p>

                          <p className="mt-1 text-lg font-bold text-slate-900">
                            {alert.villages}
                          </p>
                        </div>

                        <button
                          onClick={() => setSelectedAlert(alert)}
                          className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                          View Details
                        </button>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>
          </div>

        </main>
      </div>

      {/* Alert Details Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-6 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-red-500">
                  Alert Details
                </p>

                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  {selectedAlert.location}
                </h2>
              </div>

              <button
                onClick={() => setSelectedAlert(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={19} />
              </button>

            </div>

            <div className="p-6">

              <div className="rounded-xl bg-red-50 p-5 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-red-500">
                  Estimated Risk
                </p>

                <p className="mt-2 text-5xl font-black text-red-600">
                  {selectedAlert.risk}%
                </p>

                <p className="mt-1 text-xs text-red-500">
                  {selectedAlert.severity} Risk
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-[10px] uppercase text-slate-400">
                    Villages
                  </p>

                  <p className="mt-1 text-xl font-bold text-slate-900">
                    {selectedAlert.villages}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-[10px] uppercase text-slate-400">
                    Population
                  </p>

                  <p className="mt-1 text-xl font-bold text-slate-900">
                    {selectedAlert.population.toLocaleString()}
                  </p>
                </div>

              </div>

              <div className="mt-5 rounded-xl border border-slate-200 p-4">

                <div className="flex items-center gap-2">
                  <Mountain size={17} className="text-slate-500" />

                  <p className="text-xs font-semibold text-slate-700">
                    AI Assessment
                  </p>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {selectedAlert.message}
                </p>

              </div>

              {selectedAlert.status === "Active" && (
                <button
                  onClick={() =>
                    acknowledgeAlert(selectedAlert.id)
                  }
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
                >
                  <CheckCircle2 size={18} />
                  Acknowledge Alert
                </button>
              )}

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Alerts;