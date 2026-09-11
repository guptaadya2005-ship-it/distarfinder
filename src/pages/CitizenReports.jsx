import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileWarning,
  MapPin,
  Clock3,
  User,
  Send,
  CheckCircle2,
  AlertTriangle,
  Camera,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const initialReports = [
  {
    id: 1,
    type: "Road Crack",
    location: "East Sikkim, Sikkim",
    description:
      "Large cracks observed near the mountain road. Vehicles are moving slowly.",
    reporter: "Field Officer",
    severity: "High",
    status: "Pending",
    time: "8 min ago",
  },
  {
    id: 2,
    type: "Waterlogging",
    location: "Dima Hasao, Assam",
    description:
      "Heavy rainfall has caused water accumulation near residential areas.",
    reporter: "Citizen",
    severity: "Moderate",
    status: "Verified",
    time: "24 min ago",
  },
  {
    id: 3,
    type: "Slope Movement",
    location: "West Kameng, Arunachal Pradesh",
    description:
      "Small rocks and soil are falling from the upper slope near the road.",
    reporter: "Field Officer",
    severity: "High",
    status: "Pending",
    time: "42 min ago",
  },
];

function CitizenReports() {
  const navigate = useNavigate();
  const [reports, setReports] = useState(initialReports);

  const [showForm, setShowForm] = useState(false);

  const [type, setType] = useState("Road Crack");
  const [location, setLocation] = useState("East Sikkim, Sikkim");
  const [severity, setSeverity] = useState("High");
  const [description, setDescription] = useState("");

  const submitReport = (event) => {
    event.preventDefault();

    if (!description.trim()) {
      return;
    }

    const newReport = {
      id: Date.now(),
      type,
      location,
      description,
      reporter: "Citizen Reporter",
      severity,
      status: "Pending",
      time: "Just now",
    };

    setReports((currentReports) => [
      newReport,
      ...currentReports,
    ]);

    setDescription("");
    setShowForm(false);
    navigate("/emergency-priority");
  };

  const verifyReport = (id) => {
    setReports((currentReports) =>
      currentReports.map((report) =>
        report.id === id
          ? { ...report, status: "Verified" }
          : report
      )
    );
  };

  const pendingCount = reports.filter(
    (report) => report.status === "Pending"
  ).length;

  const verifiedCount = reports.filter(
    (report) => report.status === "Verified"
  ).length;

  const highCount = reports.filter(
    (report) => report.severity === "High"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50">

      <Sidebar />

      <div className="ml-64">

        <Navbar />

        <main className="p-8">

          {/* Header */}
          <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

            <div>

              <div className="mb-2 flex items-center gap-2">

                <span className="h-2 w-2 rounded-full bg-blue-500"></span>

                <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                  Community Intelligence
                </span>

              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Citizen Reports
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-slate-500">
                Collect real-world observations from citizens and field
                officers to improve disaster awareness and response.
              </p>

            </div>

            <button
              onClick={() => setShowForm(true)}
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Send size={17} />
              Submit New Report
            </button>

          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl border border-yellow-100 bg-white p-5 shadow-sm">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-50">
                <FileWarning
                  size={21}
                  className="text-yellow-600"
                />
              </div>

              <p className="mt-5 text-sm text-slate-500">
                Pending Reports
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-900">
                {pendingCount}
              </h2>

            </div>

            <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                <CheckCircle2
                  size={21}
                  className="text-emerald-600"
                />
              </div>

              <p className="mt-5 text-sm text-slate-500">
                Verified Reports
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-900">
                {verifiedCount}
              </h2>

            </div>

            <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
                <AlertTriangle
                  size={21}
                  className="text-red-500"
                />
              </div>

              <p className="mt-5 text-sm text-slate-500">
                High Severity Reports
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-900">
                {highCount}
              </h2>

            </div>

          </div>

          {/* Reports */}
          <div className="mt-7 rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 px-6 py-5">

              <h2 className="font-semibold text-slate-900">
                Incoming Reports
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Observations submitted by citizens and field teams
              </p>

            </div>

            <div className="divide-y divide-slate-100">

              {reports.map((report) => {

                const severityClass =
                  report.severity === "High"
                    ? "bg-red-50 text-red-600"
                    : report.severity === "Moderate"
                    ? "bg-yellow-50 text-yellow-600"
                    : "bg-emerald-50 text-emerald-600";

                const statusClass =
                  report.status === "Verified"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-yellow-50 text-yellow-600";

                return (
                  <div
                    key={report.id}
                    className="px-6 py-5"
                  >

                    <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

                      <div className="flex gap-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                          <FileWarning
                            size={20}
                            className="text-blue-600"
                          />
                        </div>

                        <div>

                          <div className="flex flex-wrap items-center gap-2">

                            <h3 className="font-semibold text-slate-900">
                              {report.type}
                            </h3>

                            <span
                              className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${severityClass}`}
                            >
                              {report.severity}
                            </span>

                            <span
                              className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${statusClass}`}
                            >
                              {report.status}
                            </span>

                          </div>

                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">

                            <span className="flex items-center gap-1.5">
                              <MapPin size={14} />
                              {report.location}
                            </span>

                            <span className="flex items-center gap-1.5">
                              <User size={14} />
                              {report.reporter}
                            </span>

                            <span className="flex items-center gap-1.5">
                              <Clock3 size={14} />
                              {report.time}
                            </span>

                          </div>

                          <p className="mt-3 max-w-3xl text-xs leading-relaxed text-slate-500">
                            {report.description}
                          </p>

                        </div>

                      </div>

                      <div className="flex items-center gap-3">

                        <button
                          className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                        >
                          <Camera size={15} />
                          Evidence
                        </button>

                        {report.status === "Pending" && (
                          <button
                            onClick={() =>
                              verifyReport(report.id)
                            }
                            className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-600"
                          >
                            <CheckCircle2 size={15} />
                            Verify
                          </button>
                        )}

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

        </main>

      </div>

      {/* Submit Report Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-6 backdrop-blur-sm">

          <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <div>

                <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-600">
                  Community Report
                </p>

                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  Submit Disaster Observation
                </h2>

              </div>

              <button
                onClick={() => setShowForm(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                ×
              </button>

            </div>

            <form
              onSubmit={submitReport}
              className="space-y-5 p-6"
            >

              {/* Report Type */}
              <div>

                <label className="mb-2 block text-xs font-semibold text-slate-700">
                  Report Type
                </label>

                <select
                  value={type}
                  onChange={(event) =>
                    setType(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
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

              {/* Location */}
              <div>

                <label className="mb-2 block text-xs font-semibold text-slate-700">
                  Location
                </label>

                <div className="relative">

                  <MapPin
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    value={location}
                    onChange={(event) =>
                      setLocation(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                    placeholder="Enter location"
                  />

                </div>

              </div>

              {/* Severity */}
              <div>

                <label className="mb-2 block text-xs font-semibold text-slate-700">
                  Severity
                </label>

                <div className="grid grid-cols-3 gap-2">

                  {["Low", "Moderate", "High"].map(
                    (level) => (
                      <button
                        type="button"
                        key={level}
                        onClick={() =>
                          setSeverity(level)
                        }
                        className={`rounded-xl border px-3 py-3 text-xs font-semibold transition ${
                          severity === level
                            ? "border-red-300 bg-red-50 text-red-600"
                            : "border-slate-200 text-slate-500 hover:bg-slate-50"
                        }`}
                      >
                        {level}
                      </button>
                    )
                  )}

                </div>

              </div>

              {/* Description */}
              <div>

                <label className="mb-2 block text-xs font-semibold text-slate-700">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  rows="4"
                  placeholder="Describe what you observed..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <Send size={17} />
                Submit Report
              </button>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default CitizenReports;