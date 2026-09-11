import { useState } from "react";
import {
  FileWarning,
  MapPin,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  Plus,
  X,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useTerraGuard } from "../context/TerraGuardContext";

function CitizenReports() {
  // Shared reports from TerraGuard Context
  const {
    reports,
    addReport,
    verifyReport,
  } = useTerraGuard();

  // Form state
  const [showForm, setShowForm] = useState(false);

  const [type, setType] = useState("Road Crack");
  const [location, setLocation] = useState("");
  const [severity, setSeverity] = useState("High");
  const [description, setDescription] = useState("");

  // Submit a new report
  const submitReport = () => {
    if (!location.trim() || !description.trim()) {
      return;
    }

    const newReport = {
      type,
      location: location.trim(),
      severity,
      description: description.trim(),
      status: "Pending",
      source: "Citizen",
      createdAt: "Just now",
    };

    // Save report to shared TerraGuard Context
    addReport(newReport);

    // Reset form
    setType("Road Crack");
    setLocation("");
    setSeverity("High");
    setDescription("");
    setShowForm(false);
  };

  // Statistics
  const pendingReports = reports.filter(
    (report) => report.status === "Pending"
  ).length;

  const verifiedReports = reports.filter(
    (report) => report.status === "Verified"
  ).length;

  const highSeverityReports = reports.filter(
    (report) => report.severity === "High"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div className="ml-[280px] min-h-screen">
        <Navbar />

        <main className="p-8">
          {/* PAGE HEADER */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-orange-500"></span>

                <span className="text-xs font-semibold uppercase tracking-widest text-orange-500">
                  Community Intelligence
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Citizen Reports
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-slate-500">
                Real-time reports from citizens and field officers help
                TerraGuard identify developing hazards on the ground.
              </p>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800"
            >
              <Plus size={17} />
              Submit Report
            </button>
          </div>

          {/* SUMMARY CARDS */}
          <section className="mt-8 grid gap-5 md:grid-cols-3">
            {/* Pending */}
            <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
                  <Clock3
                    size={21}
                    className="text-orange-500"
                  />
                </div>

                <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-semibold text-orange-600">
                  Review
                </span>
              </div>

              <p className="mt-5 text-sm font-medium text-slate-500">
                Pending Reports
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-900">
                {pendingReports}
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                Reports waiting for verification
              </p>
            </div>

            {/* Verified */}
            <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                  <ShieldCheck
                    size={21}
                    className="text-emerald-500"
                  />
                </div>

                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-600">
                  Verified
                </span>
              </div>

              <p className="mt-5 text-sm font-medium text-slate-500">
                Verified Reports
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-900">
                {verifiedReports}
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                Confirmed ground-level observations
              </p>
            </div>

            {/* High severity */}
            <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
                  <AlertTriangle
                    size={21}
                    className="text-red-500"
                  />
                </div>

                <span className="rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-semibold text-red-600">
                  High Severity
                </span>
              </div>

              <p className="mt-5 text-sm font-medium text-slate-500">
                High Severity Reports
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-900">
                {highSeverityReports}
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                Reports requiring urgent attention
              </p>
            </div>
          </section>

          {/* REPORT LIST */}
          <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Ground Reports
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Recent observations from the field
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
                <FileWarning
                  size={15}
                  className="text-slate-500"
                />

                <span className="text-xs font-medium text-slate-600">
                  {reports.length} reports
                </span>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {reports.length === 0 ? (
                <div className="px-6 py-16 text-center">
                  <FileWarning
                    size={38}
                    className="mx-auto text-slate-300"
                  />

                  <h3 className="mt-4 text-sm font-semibold text-slate-800">
                    No reports yet
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Submit a ground report to help monitor developing
                    hazards.
                  </p>
                </div>
              ) : (
                reports.map((report) => (
                  <div
                    key={report.id}
                    className="px-6 py-5 transition hover:bg-slate-50"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      {/* REPORT INFO */}
                      <div className="flex min-w-0 gap-4">
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                            report.severity === "High"
                              ? "bg-red-50"
                              : report.severity === "Moderate"
                                ? "bg-orange-50"
                                : "bg-emerald-50"
                          }`}
                        >
                          <FileWarning
                            size={20}
                            className={
                              report.severity === "High"
                                ? "text-red-500"
                                : report.severity === "Moderate"
                                  ? "text-orange-500"
                                  : "text-emerald-500"
                            }
                          />
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-semibold text-slate-900">
                              {report.type}
                            </h3>

                            <span
                              className={`rounded-full px-2 py-1 text-[10px] font-bold ${
                                report.severity === "High"
                                  ? "bg-red-50 text-red-600"
                                  : report.severity === "Moderate"
                                    ? "bg-orange-50 text-orange-600"
                                    : "bg-emerald-50 text-emerald-600"
                              }`}
                            >
                              {report.severity}
                            </span>

                            <span
                              className={`rounded-full px-2 py-1 text-[10px] font-bold ${
                                report.status === "Verified"
                                  ? "bg-emerald-50 text-emerald-600"
                                  : "bg-yellow-50 text-yellow-700"
                              }`}
                            >
                              {report.status}
                            </span>
                          </div>

                          <div className="mt-2 flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                              <MapPin size={13} />
                              {report.location}
                            </div>

                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                              <UserRound size={13} />
                              {report.source || "Citizen"}
                            </div>

                            <div className="flex items-center gap-1.5 text-xs text-slate-400">
                              <Clock3 size={13} />
                              {report.createdAt || "Recently"}
                            </div>
                          </div>

                          {report.description && (
                            <p className="mt-3 max-w-2xl text-xs leading-relaxed text-slate-500">
                              {report.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* ACTION */}
                      <div className="flex shrink-0 items-center gap-2">
                        {report.status === "Pending" ? (
                          <button
                            onClick={() =>
                              verifyReport(report.id)
                            }
                            className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
                          >
                            <CheckCircle2 size={14} />
                            Verify
                          </button>
                        ) : (
                          <div className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                            <CheckCircle2 size={14} />
                            Verified
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* INFORMATION CARD */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900">
                <FileWarning
                  size={19}
                  className="text-white"
                />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Why citizen reports matter
                </h3>

                <p className="mt-2 max-w-4xl text-xs leading-relaxed text-slate-500">
                  Ground-level observations provide valuable information
                  that may not immediately appear in satellite, rainfall,
                  or sensor data. TerraGuard combines these reports with
                  predicted risk to help emergency teams understand
                  developing situations and prioritise their response.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* SUBMIT REPORT MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Submit Ground Report
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Report a hazard observed in your area.
                </p>
              </div>

              <button
                onClick={() => setShowForm(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            {/* FORM */}
            <div className="space-y-5 p-6">
              {/* TYPE */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-700">
                  Report Type
                </label>

                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                >
                  <option>Road Crack</option>
                  <option>Slope Movement</option>
                  <option>Waterlogging</option>
                  <option>Landslide</option>
                  <option>Flash Flood</option>
                  <option>Blocked Road</option>
                  <option>Other</option>
                </select>
              </div>

              {/* LOCATION */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-700">
                  Location
                </label>

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. East Sikkim"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                />
              </div>

              {/* SEVERITY */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-700">
                  Severity
                </label>

                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                >
                  <option>Low</option>
                  <option>Moderate</option>
                  <option>High</option>
                </select>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-700">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  rows={4}
                  placeholder="Describe what you observed..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                />
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  onClick={submitReport}
                  disabled={
                    !location.trim() ||
                    !description.trim()
                  }
                  className="flex-1 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Submit Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CitizenReports;