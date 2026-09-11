import { useState } from "react";
import {
  Siren,
  MapPin,
  Users,
  AlertTriangle,
  Clock3,
  ArrowUp,
  CheckCircle2,
  ShieldAlert,
  Activity,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const initialIncidents = [
  {
    id: 1,
    rank: 1,
    location: "East Sikkim, Sikkim",
    incident: "Potential Landslide",
    risk: 87,
    population: 4820,
    villages: 3,
    reports: 2,
    severity: "Critical",
    responseTime: "Immediate",
    status: "Awaiting Response",
  },
  {
    id: 2,
    rank: 2,
    location: "West Kameng, Arunachal Pradesh",
    incident: "Slope Instability",
    risk: 72,
    population: 3180,
    villages: 5,
    reports: 1,
    severity: "High",
    responseTime: "< 30 min",
    status: "Monitoring",
  },
  {
    id: 3,
    rank: 3,
    location: "Dima Hasao, Assam",
    incident: "Heavy Rainfall",
    risk: 68,
    population: 2740,
    villages: 4,
    reports: 1,
    severity: "High",
    responseTime: "< 1 hour",
    status: "Monitoring",
  },
  {
    id: 4,
    rank: 4,
    location: "East Khasi Hills, Meghalaya",
    incident: "Terrain Risk",
    risk: 49,
    population: 1960,
    villages: 2,
    reports: 0,
    severity: "Moderate",
    responseTime: "< 2 hours",
    status: "Monitoring",
  },
];

function EmergencyPriority() {
  const [incidents, setIncidents] = useState(initialIncidents);
  const [selectedIncident, setSelectedIncident] = useState(
    initialIncidents[0]
  );

  const markDispatched = (id) => {
    setIncidents((current) =>
      current.map((incident) =>
        incident.id === id
          ? {
              ...incident,
              status: "Response Dispatched",
            }
          : incident
      )
    );

    setSelectedIncident((current) =>
      current?.id === id
        ? {
            ...current,
            status: "Response Dispatched",
          }
        : current
    );
  };

  const criticalCount = incidents.filter(
    (incident) => incident.severity === "Critical"
  ).length;

  const totalPopulation = incidents.reduce(
    (sum, incident) => sum + incident.population,
    0
  );

  const activeResponses = incidents.filter(
    (incident) => incident.status === "Response Dispatched"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div className="ml-64">
        <Navbar />

        <main className="page-enter p-8">

          {/* Header */}
          <div className="mb-8">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500"></span>

              <span className="text-xs font-semibold uppercase tracking-widest text-red-600">
                Response Intelligence
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Emergency Prioritisation
            </h1>

            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-500">
              TerraGuard ranks disaster incidents using risk level,
              population exposure, affected villages and field reports
              to help authorities respond to the highest-priority
              situations first.
            </p>
          </div>

          {/* Summary */}
          <div className="grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
                <ShieldAlert size={21} className="text-red-500" />
              </div>

              <p className="mt-5 text-sm text-slate-500">
                Critical Incidents
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-900">
                {criticalCount}
              </h2>
            </div>

            <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
                <Users size={21} className="text-orange-500" />
              </div>

              <p className="mt-5 text-sm text-slate-500">
                Population Exposed
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-900">
                {totalPopulation.toLocaleString()}
              </h2>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                <Activity size={21} className="text-emerald-500" />
              </div>

              <p className="mt-5 text-sm text-slate-500">
                Active Responses
              </p>

              <h2 className="mt-1 text-3xl font-bold text-slate-900">
                {activeResponses}
              </h2>
            </div>

          </div>

          {/* Main Grid */}
          <div className="mt-7 grid gap-6 xl:grid-cols-5">

            {/* Priority Queue */}
            <div className="xl:col-span-3 rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-200 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
                    <Siren size={20} className="text-red-500" />
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Response Priority Queue
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      Highest priority incidents appear first
                    </p>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-slate-100">

                {incidents.map((incident) => (
                  <button
                    key={incident.id}
                    onClick={() => setSelectedIncident(incident)}
                    className={`w-full p-5 text-left transition hover:bg-slate-50 ${
                      selectedIncident?.id === incident.id
                        ? "bg-slate-50"
                        : ""
                    }`}
                  >

                    <div className="flex items-center gap-4">

                      {/* Rank */}
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-black ${
                          incident.rank === 1
                            ? "bg-red-500 text-white"
                            : incident.rank === 2
                            ? "bg-orange-100 text-orange-600"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        #{incident.rank}
                      </div>

                      {/* Details */}
                      <div className="min-w-0 flex-1">

                        <div className="flex flex-wrap items-center gap-2">

                          <h3 className="font-semibold text-slate-900">
                            {incident.location}
                          </h3>

                          <span
                            className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
                              incident.severity === "Critical"
                                ? "bg-red-50 text-red-600"
                                : incident.severity === "High"
                                ? "bg-orange-50 text-orange-600"
                                : "bg-yellow-50 text-yellow-600"
                            }`}
                          >
                            {incident.severity}
                          </span>

                        </div>

                        <p className="mt-1 text-xs text-slate-500">
                          {incident.incident}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-4 text-[11px] text-slate-400">

                          <span className="flex items-center gap-1">
                            <AlertTriangle size={13} />
                            {incident.risk}% risk
                          </span>

                          <span className="flex items-center gap-1">
                            <Users size={13} />
                            {incident.population.toLocaleString()}
                          </span>

                          <span>
                            {incident.villages} villages
                          </span>

                          <span>
                            {incident.reports} reports
                          </span>

                        </div>

                      </div>

                      {/* Status */}
                      <div className="hidden text-right sm:block">

                        <p className="text-[10px] uppercase tracking-wide text-slate-400">
                          Response
                        </p>

                        <p className="mt-1 text-xs font-semibold text-slate-700">
                          {incident.responseTime}
                        </p>

                      </div>

                    </div>

                  </button>
                ))}

              </div>
            </div>

            {/* Selected Incident */}
            <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              {selectedIncident && (
                <>
                  <div className="flex items-start justify-between">

                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-red-500">
                        Priority #{selectedIncident.rank}
                      </p>

                      <h2 className="mt-2 text-xl font-bold text-slate-900">
                        {selectedIncident.location}
                      </h2>
                    </div>

                    <div className="rounded-xl bg-red-50 p-3">
                      <Siren size={21} className="text-red-500" />
                    </div>

                  </div>

                  {/* Score */}
                  <div className="mt-6 rounded-2xl bg-red-50 p-6 text-center">

                    <p className="text-xs font-semibold uppercase tracking-widest text-red-500">
                      Emergency Priority Score
                    </p>

                    <p className="mt-2 text-6xl font-black text-red-600">
                      {selectedIncident.risk}
                    </p>

                    <p className="mt-1 text-xs text-red-500">
                      Priority index
                    </p>

                  </div>

                  {/* Factors */}
                  <div className="mt-5">

                    <h3 className="text-sm font-semibold text-slate-900">
                      Priority Factors
                    </h3>

                    <div className="mt-4 space-y-3">

                      <div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">
                            Landslide Risk
                          </span>

                          <span className="font-semibold text-slate-700">
                            {selectedIncident.risk}%
                          </span>
                        </div>

                        <div className="mt-1.5 h-2 rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-red-500"
                            style={{
                              width: `${selectedIncident.risk}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">
                            Population Exposure
                          </span>

                          <span className="font-semibold text-slate-700">
                            {selectedIncident.population.toLocaleString()}
                          </span>
                        </div>

                        <div className="mt-1.5 h-2 rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-orange-500"
                            style={{
                              width: `${Math.min(
                                selectedIncident.population / 50,
                                100
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">
                            Field Reports
                          </span>

                          <span className="font-semibold text-slate-700">
                            {selectedIncident.reports}
                          </span>
                        </div>

                        <div className="mt-1.5 h-2 rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-blue-500"
                            style={{
                              width: `${Math.min(
                                selectedIncident.reports * 35,
                                100
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Impact */}
                  <div className="mt-6 grid grid-cols-2 gap-3">

                    <div className="rounded-xl bg-slate-50 p-4">
                      <Users
                        size={17}
                        className="text-slate-400"
                      />

                      <p className="mt-2 text-[10px] uppercase text-slate-400">
                        Population
                      </p>

                      <p className="mt-1 font-bold text-slate-900">
                        {selectedIncident.population.toLocaleString()}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                      <MapPin
                        size={17}
                        className="text-slate-400"
                      />

                      <p className="mt-2 text-[10px] uppercase text-slate-400">
                        Villages
                      </p>

                      <p className="mt-1 font-bold text-slate-900">
                        {selectedIncident.villages}
                      </p>
                    </div>

                  </div>

                  {/* Response */}
                  <div className="mt-5 rounded-xl border border-red-100 bg-red-50/50 p-4">

                    <div className="flex items-center gap-3">

                      <Clock3
                        size={18}
                        className="text-red-500"
                      />

                      <div>
                        <p className="text-xs font-semibold text-slate-800">
                          Recommended Response
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {selectedIncident.responseTime}
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* Dispatch */}
                  {selectedIncident.status !==
                    "Response Dispatched" ? (
                    <button
                      onClick={() =>
                        markDispatched(selectedIncident.id)
                      }
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-red-600"
                    >
                      <Siren size={18} />
                      Dispatch Emergency Response
                      <ArrowUp size={16} />
                    </button>
                  ) : (
                    <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-emerald-50 px-4 py-3.5 text-sm font-semibold text-emerald-600">
                      <CheckCircle2 size={18} />
                      Response Team Dispatched
                    </div>
                  )}

                </>
              )}

            </div>

          </div>

          {/* Explanation */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="flex items-start gap-3">

              <div className="rounded-lg bg-violet-50 p-2">
                <Activity
                  size={18}
                  className="text-violet-600"
                />
              </div>

              <div>

                <h3 className="text-sm font-semibold text-slate-900">
                  How TerraGuard prioritises incidents
                </h3>

                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  The prototype combines environmental risk,
                  population exposure, affected villages and citizen
                  observations to rank incidents. In the final system,
                  this layer can consume live sensor, weather,
                  satellite and field-report data.
                </p>

              </div>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
}

export default EmergencyPriority;