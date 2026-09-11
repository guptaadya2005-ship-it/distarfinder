import { useState } from "react";
import {
  Siren,
  MapPin,
  Users,
  AlertTriangle,
  Clock3,
  Radio,
  ShieldAlert,
  ArrowUpRight,
  CheckCircle2,
  Navigation,
  FileWarning,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useTerraGuard } from "../context/TerraGuardContext";

function EmergencyPriority() {
  // --------------------------------------------------
  // GLOBAL TERRAGUARD DATA
  // --------------------------------------------------

  const {
    alerts,
    reports,
    dispatchResponse,
    isResponseDispatched,
  } = useTerraGuard();

  // --------------------------------------------------
  // SELECTED INCIDENT
  // --------------------------------------------------

  const [selectedIncident, setSelectedIncident] = useState(null);

  // --------------------------------------------------
  // BUILD PRIORITY INCIDENTS
  // --------------------------------------------------

  const incidents = alerts
    .map((alert) => {
      // Find reports for this location
      const locationReports = reports.filter(
        (report) =>
          report.location?.toLowerCase() ===
          alert.location?.toLowerCase()
      );

      // Count verified reports
      const verifiedReports = locationReports.filter(
        (report) => report.status === "Verified"
      );

      const reportCount = locationReports.length;

      // --------------------------------------------------
      // PRIORITY SCORE
      // --------------------------------------------------

      const priorityScore = Math.min(
        100,
        alert.risk +
          Math.min(alert.population / 1000, 10) +
          Math.min(reportCount * 2, 6) +
          Math.min(verifiedReports.length * 3, 6)
      );

      // --------------------------------------------------
      // RESPONSE TIME
      // --------------------------------------------------

      let responseTime = "<2 hours";

      if (alert.level === "Critical") {
        responseTime = "Immediate";
      } else if (alert.level === "High") {
        responseTime = "<30 min";
      }

      // --------------------------------------------------
      // DISPATCH STATUS
      // --------------------------------------------------

      const isDispatched = isResponseDispatched(alert.id);

      // --------------------------------------------------
      // INCIDENT OBJECT
      // --------------------------------------------------

      return {
        ...alert,

        reports: reportCount,
        verifiedReports: verifiedReports.length,

        priorityScore: Math.round(priorityScore),

        responseTime,

        status: isDispatched
          ? "Response Dispatched"
          : alert.status === "Acknowledged"
            ? "Monitoring"
            : "Awaiting Response",

        recommendedResponse:
          alert.level === "Critical"
            ? "Immediate evacuation assessment and emergency response deployment."
            : alert.level === "High"
              ? "Deploy field team and closely monitor slope conditions."
              : "Continue monitoring and keep local authorities prepared.",
      };
    })

    // Highest priority first
    .sort((a, b) => b.priorityScore - a.priorityScore)

    // Add ranking
    .map((incident, index) => ({
      ...incident,
      rank: index + 1,
    }));

  // --------------------------------------------------
  // DISPATCH RESPONSE
  // --------------------------------------------------

  const markDispatched = (id) => {
    dispatchResponse(id);
  };

  // --------------------------------------------------
  // SUMMARY DATA
  // --------------------------------------------------

  const criticalIncidents = incidents.filter(
    (incident) => incident.level === "Critical"
  ).length;

  const totalPopulation = incidents.reduce(
    (total, incident) => total + (incident.population || 0),
    0
  );

  const activeResponses = incidents.filter((incident) =>
    isResponseDispatched(incident.id)
  ).length;

  return (
    <div className="min-h-screen">
      {/* --------------------------------------------------
          SIDEBAR
      -------------------------------------------------- */}

      <Sidebar />

      {/* --------------------------------------------------
          MAIN CONTENT
      -------------------------------------------------- */}

      <div className="app-main">
        <Navbar />

        <main className="p-6">
          {/* --------------------------------------------------
              PAGE HEADER
          -------------------------------------------------- */}

          <div className="mb-6 flex items-start justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="rounded-lg bg-red-100 p-2 text-red-600">
                  <Siren size={20} />
                </div>

                <span className="text-sm font-semibold text-red-600">
                  Priority Engine
                </span>
              </div>

              <h1 className="text-2xl font-bold text-[#12293f]">
                Emergency Priority
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                AI-assisted prioritization of incidents for emergency response.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Live Monitoring
            </div>
          </div>

          {/* --------------------------------------------------
              SUMMARY CARDS
          -------------------------------------------------- */}

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Critical Incidents */}

            <div className="glass-card p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Critical Incidents
                  </p>

                  <p className="mt-2 text-3xl font-bold text-red-600">
                    {criticalIncidents}
                  </p>
                </div>

                <div className="rounded-md bg-red-50 p-3 text-red-600">
                  <AlertTriangle size={22} />
                </div>
              </div>
            </div>

            {/* Population Exposed */}

            <div className="glass-card p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Population Exposed
                  </p>

                  <p className="mt-2 text-3xl font-bold text-orange-600">
                    {totalPopulation.toLocaleString()}
                  </p>
                </div>

                <div className="rounded-md bg-orange-50 p-3 text-orange-600">
                  <Users size={22} />
                </div>
              </div>
            </div>

            {/* Active Responses */}

            <div className="glass-card p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Active Responses
                  </p>

                  <p className="mt-2 text-3xl font-bold text-emerald-600">
                    {activeResponses}
                  </p>
                </div>

                <div className="rounded-md bg-emerald-50 p-3 text-emerald-600">
                  <Radio size={22} />
                </div>
              </div>
            </div>
          </div>

          {/* --------------------------------------------------
              MAIN GRID
          -------------------------------------------------- */}

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            {/* --------------------------------------------------
                PRIORITY QUEUE
            -------------------------------------------------- */}

            <div className="xl:col-span-2">
              <div className="glass-card">
                <div className="border-b border-slate-200 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">
                        Response Priority Queue
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Incidents ranked by risk, population exposure and field reports.
                      </p>
                    </div>

                    <div className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
                      {incidents.length} Incidents
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-slate-100">
                  {incidents.length === 0 ? (
                    <div className="p-8 text-center">
                      <ShieldAlert
                        size={32}
                        className="mx-auto mb-3 text-slate-300"
                      />

                      <p className="font-medium text-slate-600">
                        No active incidents
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        New alerts will appear here automatically.
                      </p>
                    </div>
                  ) : (
                    incidents.map((incident) => {
                      const dispatched = isResponseDispatched(
                        incident.id
                      );

                      return (
                        <button
                          key={incident.id}
                          onClick={() =>
                            setSelectedIncident(incident)
                          }
                          className={`w-full p-5 text-left transition hover:bg-slate-50 ${
                            selectedIncident?.id === incident.id
                              ? "bg-slate-50"
                              : ""
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            {/* Rank */}

                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-sm font-bold ${
                                incident.level === "Critical"
                                  ? "bg-red-100 text-red-700"
                                  : incident.level === "High"
                                    ? "bg-orange-100 text-orange-700"
                                    : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              #{incident.rank}
                            </div>

                            {/* Incident Info */}

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-bold text-slate-900">
                                  {incident.location}
                                </h3>

                                <span
                                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                    incident.level === "Critical"
                                      ? "bg-red-100 text-red-700"
                                      : incident.level === "High"
                                        ? "bg-orange-100 text-orange-700"
                                        : "bg-yellow-100 text-yellow-700"
                                  }`}
                                >
                                  {incident.level}
                                </span>

                                {dispatched && (
                                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                                    Response Dispatched
                                  </span>
                                )}
                              </div>

                              <p className="mt-1 text-sm text-slate-500">
                                {incident.type}
                              </p>

                              <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                                <span className="flex items-center gap-1">
                                  <MapPin size={14} />
                                  {incident.villages} villages
                                </span>

                                <span className="flex items-center gap-1">
                                  <Users size={14} />
                                  {incident.population?.toLocaleString()} people
                                </span>

                                <span className="flex items-center gap-1">
                                  <FileWarning size={14} />
                                  {incident.reports} reports
                                </span>

                                <span className="flex items-center gap-1">
                                  <Clock3 size={14} />
                                  {incident.responseTime}
                                </span>
                              </div>
                            </div>

                            {/* Priority Score */}

                            <div className="hidden text-right sm:block">
                              <p className="text-xs font-medium text-slate-400">
                                Priority
                              </p>

                              <p className="mt-1 text-2xl font-bold text-slate-900">
                                {incident.priorityScore}
                              </p>

                              <ArrowUpRight
                                size={16}
                                className="ml-auto mt-1 text-red-500"
                              />
                            </div>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* --------------------------------------------------
                INCIDENT DETAILS
            -------------------------------------------------- */}

            <div>
              <div className="glass-card">
                <div className="border-b border-slate-200 p-5">
                  <h2 className="text-lg font-bold text-slate-900">
                    Incident Details
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Select an incident to view response information.
                  </p>
                </div>

                {!selectedIncident ? (
                  <div className="p-8 text-center">
                    <Navigation
                      size={36}
                      className="mx-auto mb-3 text-slate-300"
                    />

                    <p className="font-medium text-slate-600">
                      Select an incident
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Choose an incident from the priority queue.
                    </p>
                  </div>
                ) : (
                  <div className="p-5">
                    {/* Location */}

                    <div className="mb-5">
                      <div className="flex items-center gap-2">
                        <MapPin
                          size={18}
                          className="text-red-500"
                        />

                        <h3 className="text-xl font-bold text-slate-900">
                          {selectedIncident.location}
                        </h3>
                      </div>

                      <p className="mt-1 text-sm text-slate-500">
                        {selectedIncident.type}
                      </p>
                    </div>

                    {/* Risk Score */}

                    <div className="mb-5 rounded-lg bg-red-50 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-red-500">
                            Priority Score
                          </p>

                          <p className="mt-1 text-4xl font-bold text-red-600">
                            {selectedIncident.priorityScore}
                          </p>
                        </div>

                        <ShieldAlert
                          size={34}
                          className="text-red-500"
                        />
                      </div>
                    </div>

                    {/* Risk Factors */}

                    <div className="mb-5">
                      <h4 className="mb-3 text-sm font-bold text-slate-900">
                        Priority Factors
                      </h4>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-500">
                            Risk Score
                          </span>

                          <span className="font-semibold text-slate-900">
                            {selectedIncident.risk}%
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-500">
                            Population
                          </span>

                          <span className="font-semibold text-slate-900">
                            {selectedIncident.population?.toLocaleString()}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-500">
                            Field Reports
                          </span>

                          <span className="font-semibold text-slate-900">
                            {selectedIncident.reports}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-500">
                            Verified Reports
                          </span>

                          <span className="font-semibold text-emerald-600">
                            {selectedIncident.verifiedReports}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-500">
                            Villages
                          </span>

                          <span className="font-semibold text-slate-900">
                            {selectedIncident.villages}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Recommended Response */}

                    <div className="mb-5 rounded-md border border-orange-100 bg-orange-50 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <AlertTriangle
                          size={17}
                          className="text-orange-600"
                        />

                        <h4 className="text-sm font-bold text-orange-800">
                          Recommended Response
                        </h4>
                      </div>

                      <p className="text-sm leading-6 text-orange-700">
                        {selectedIncident.recommendedResponse}
                      </p>
                    </div>

                    {/* Response Time */}

                    <div className="mb-5 flex items-center justify-between rounded-md bg-slate-50 p-4">
                      <div className="flex items-center gap-2">
                        <Clock3
                          size={17}
                          className="text-slate-500"
                        />

                        <span className="text-sm text-slate-500">
                          Target Response Time
                        </span>
                      </div>

                      <span className="font-bold text-slate-900">
                        {selectedIncident.responseTime}
                      </span>
                    </div>

                    {/* Dispatch Button */}

                    <button
                      onClick={() =>
                        markDispatched(selectedIncident.id)
                      }
                      disabled={isResponseDispatched(
                        selectedIncident.id
                      )}
                      className={`flex w-full items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-semibold transition ${
                        isResponseDispatched(selectedIncident.id)
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-500 text-white shadow-lg shadow-red-500/20 hover:bg-red-600"
                      }`}
                    >
                      {isResponseDispatched(selectedIncident.id) ? (
                        <>
                          <CheckCircle2 size={17} />
                          Response Dispatched
                        </>
                      ) : (
                        <>
                          <Siren size={17} />
                          Dispatch Emergency Response
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* --------------------------------------------------
              HOW PRIORITY IS CALCULATED
          -------------------------------------------------- */}

          <div className="mt-6 glass-card p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-md bg-blue-50 p-3 text-blue-600">
                <ShieldAlert size={20} />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  How Priority Is Calculated
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  TerraGuard prioritizes incidents using risk level,
                  exposed population, number of field or citizen reports,
                  verified reports and affected villages. Higher-risk
                  incidents are placed at the top of the response queue.
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