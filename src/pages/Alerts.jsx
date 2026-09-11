import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  Mountain,
  ArrowRight,
  ShieldAlert,
  X,
  Siren,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useTerraGuard } from "../context/TerraGuardContext";

function Alerts() {
  const navigate = useNavigate();

  const {
    alerts,
    generateAlert,
    acknowledgeAlert,
  } = useTerraGuard();

  const [selectedAlert, setSelectedAlert] = useState(null);

  // --------------------------------------------------
  // Generate a manual emergency alert
  // --------------------------------------------------

  const handleGenerateEmergencyAlert = () => {
    generateAlert({
      location: "East Sikkim",
      type: "Emergency Landslide Warning",
      risk: 87,
      level: "Critical",
      population: 4820,
      villages: 3,
      status: "Active",
    });

    navigate("/emergency-priority");
  };

  // --------------------------------------------------
  // Helpers
  // --------------------------------------------------

  const getLevelStyles = (level) => {
    switch (level) {
      case "Critical":
        return {
          badge: "bg-red-100 text-red-700",
          border: "border-red-200",
          iconBg: "bg-red-100",
          icon: "text-red-600",
        };

      case "High":
        return {
          badge: "bg-orange-100 text-orange-700",
          border: "border-orange-200",
          iconBg: "bg-orange-100",
          icon: "text-orange-600",
        };

      case "Moderate":
        return {
          badge: "bg-yellow-100 text-yellow-700",
          border: "border-yellow-200",
          iconBg: "bg-yellow-100",
          icon: "text-yellow-600",
        };

      default:
        return {
          badge: "bg-emerald-100 text-emerald-700",
          border: "border-emerald-200",
          iconBg: "bg-emerald-100",
          icon: "text-emerald-600",
        };
    }
  };

  const getStatusStyles = (status) => {
    if (status === "Acknowledged") {
      return "bg-emerald-100 text-emerald-700";
    }

    if (status === "Active") {
      return "bg-red-100 text-red-700";
    }

    return "bg-slate-100 text-slate-600";
  };

  // --------------------------------------------------
  // Statistics
  // --------------------------------------------------

  const criticalAlerts = alerts.filter(
    (alert) => alert.level === "Critical"
  ).length;

  const highPriorityAlerts = alerts.filter(
    (alert) => alert.level === "High"
  ).length;

  const acknowledgedAlerts = alerts.filter(
    (alert) => alert.status === "Acknowledged"
  ).length;

  const activeAlerts = alerts.filter(
    (alert) => alert.status !== "Acknowledged"
  );

  return (
    <div className="min-h-screen">
      <Sidebar />

      <div className="app-main">
        <Navbar />

        <main className="p-8">
          {/* ------------------------------------------------ */}
          {/* Header */}
          {/* ------------------------------------------------ */}

          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-red-100">
                  <Bell size={20} className="text-red-600" />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-[#12293f]">
                    Emergency Alerts
                  </h1>

                  <p className="mt-1 text-sm text-slate-500">
                    Monitor and manage active regional disaster warnings.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerateEmergencyAlert}
              className="flex items-center gap-2 rounded-md bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700"
            >
              <Siren size={17} />
              Generate Emergency Alert
            </button>
          </div>

          {/* ------------------------------------------------ */}
          {/* Statistics */}
          {/* ------------------------------------------------ */}

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {/* Critical */}
            <div className="glass-card p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-red-100">
                  <AlertTriangle
                    size={21}
                    className="text-red-600"
                  />
                </div>

                <span className="text-xs font-semibold text-red-500">
                  CRITICAL
                </span>
              </div>

              <p className="mt-5 text-sm font-medium text-slate-500">
                Critical Alerts
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-900">
                {criticalAlerts}
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                Immediate attention required
              </p>
            </div>

            {/* High */}
            <div className="glass-card p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-orange-100">
                  <ShieldAlert
                    size={21}
                    className="text-orange-600"
                  />
                </div>

                <span className="text-xs font-semibold text-orange-500">
                  HIGH
                </span>
              </div>

              <p className="mt-5 text-sm font-medium text-slate-500">
                High Priority Alerts
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-900">
                {highPriorityAlerts}
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                Require close monitoring
              </p>
            </div>

            {/* Acknowledged */}
            <div className="glass-card p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-emerald-100">
                  <CheckCircle2
                    size={21}
                    className="text-emerald-600"
                  />
                </div>

                <span className="text-xs font-semibold text-emerald-500">
                  RESOLVED
                </span>
              </div>

              <p className="mt-5 text-sm font-medium text-slate-500">
                Acknowledged
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-900">
                {acknowledgedAlerts}
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                Alerts acknowledged by officers
              </p>
            </div>
          </div>

          {/* ------------------------------------------------ */}
          {/* Active Alerts */}
          {/* ------------------------------------------------ */}

          <div className="mt-8 glass-card">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Active Alert Feed
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Real-time warnings generated by the TerraGuard monitoring
                  system.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                <span className="text-xs font-semibold text-red-600">
                  {activeAlerts.length} Active
                </span>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {alerts.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <Bell
                    size={30}
                    className="mx-auto text-slate-300"
                  />

                  <p className="mt-3 text-sm font-medium text-slate-500">
                    No alerts available
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    New alerts will appear here automatically.
                  </p>
                </div>
              ) : (
                alerts.map((alert) => {
                  const styles = getLevelStyles(alert.level);

                  return (
                    <div
                      key={alert.id}
                      className={`p-6 transition hover:bg-slate-50 ${
                        alert.status !== "Acknowledged"
                          ? ""
                          : "opacity-70"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md ${styles.iconBg}`}
                        >
                          <AlertTriangle
                            size={21}
                            className={styles.icon}
                          />
                        </div>

                        {/* Main Content */}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-bold text-slate-900">
                              {alert.type}
                            </h3>

                            <span
                              className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${styles.badge}`}
                            >
                              {alert.level}
                            </span>

                            <span
                              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusStyles(
                                alert.status
                              )}`}
                            >
                              {alert.status}
                            </span>
                          </div>

                          {/* Location */}
                          <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                            <div className="flex items-center gap-1.5">
                              <MapPin size={14} />
                              {alert.location}
                            </div>

                            <div className="flex items-center gap-1.5">
                              <Mountain size={14} />
                              Risk {alert.risk}%
                            </div>

                            <div className="flex items-center gap-1.5">
                              <Users size={14} />
                              {alert.population?.toLocaleString() || 0}{" "}
                              people
                            </div>

                            <div className="flex items-center gap-1.5">
                              <Clock size={14} />
                              Live
                            </div>
                          </div>

                          {/* Impact */}
                          <div className="mt-4 flex flex-wrap gap-3">
                            <div className="rounded-lg bg-slate-50 px-3 py-2">
                              <p className="text-[10px] uppercase tracking-wide text-slate-400">
                                Villages
                              </p>

                              <p className="mt-0.5 text-sm font-bold text-slate-800">
                                {alert.villages || 0}
                              </p>
                            </div>

                            <div className="rounded-lg bg-slate-50 px-3 py-2">
                              <p className="text-[10px] uppercase tracking-wide text-slate-400">
                                Risk Score
                              </p>

                              <p className="mt-0.5 text-sm font-bold text-slate-800">
                                {alert.risk}%
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex shrink-0 flex-col gap-2">
                          <button
                            onClick={() =>
                              setSelectedAlert(alert)
                            }
                            className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                          >
                            View Details
                            <ArrowRight size={13} />
                          </button>

                          {alert.status !== "Acknowledged" && (
                            <button
                              onClick={() =>
                                acknowledgeAlert(alert.id)
                              }
                              className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700"
                            >
                              <CheckCircle2 size={13} />
                              Acknowledge
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* ------------------------------------------------ */}
          {/* Information Panel */}
          {/* ------------------------------------------------ */}

          <div className="mt-6 glass-dark p-6 text-white">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-emerald-500/20">
                <ShieldAlert
                  size={20}
                  className="text-emerald-400"
                />
              </div>

              <div>
                <h3 className="font-semibold">
                  TerraGuard Alert Intelligence
                </h3>

                <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-400">
                  Alerts are generated from environmental risk indicators,
                  AI risk predictions, and field observations. Critical
                  alerts are prioritized for immediate response based on
                  predicted risk, exposed population, affected villages,
                  and available field reports.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* -------------------------------------------------- */}
      {/* Alert Details Modal */}
      {/* -------------------------------------------------- */}

      {selectedAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-6 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/70 bg-white/70 shadow-2xl backdrop-blur-2xl backdrop-saturate-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Alert Details
                </p>

                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  {selectedAlert.location}
                </h2>
              </div>

              <button
                onClick={() => setSelectedAlert(null)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-md ${
                    getLevelStyles(selectedAlert.level).iconBg
                  }`}
                >
                  <AlertTriangle
                    size={22}
                    className={
                      getLevelStyles(selectedAlert.level).icon
                    }
                  />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    {selectedAlert.type}
                  </h3>

                  <span
                    className={`mt-1 inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
                      getLevelStyles(selectedAlert.level).badge
                    }`}
                  >
                    {selectedAlert.level} Risk
                  </span>
                </div>
              </div>

              {/* Metrics */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-md bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    Risk Probability
                  </p>

                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {selectedAlert.risk}%
                  </p>
                </div>

                <div className="rounded-md bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    Population at Risk
                  </p>

                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {selectedAlert.population?.toLocaleString() || 0}
                  </p>
                </div>

                <div className="rounded-md bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    Villages
                  </p>

                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {selectedAlert.villages || 0}
                  </p>
                </div>

                <div className="rounded-md bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">
                    Status
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-900">
                    {selectedAlert.status}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="mt-6 flex gap-3">
                {selectedAlert.status !== "Acknowledged" && (
                  <button
                    onClick={() => {
                      acknowledgeAlert(selectedAlert.id);
                      setSelectedAlert(null);
                    }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                  >
                    <CheckCircle2 size={16} />
                    Acknowledge Alert
                  </button>
                )}

                <button
                  onClick={() => setSelectedAlert(null)}
                  className="rounded-md border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Alerts;