import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTerraGuard } from "../context/TerraGuardContext";

import {
  Search,
  MapPin,
  Layers,
  Navigation,
  Plus,
  Minus,
  X,
  CloudRain,
  Droplets,
  Mountain,
  Users,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const riskZones = [
  {
    id: 1,
    name: "East Sikkim",
    state: "Sikkim",
    risk: "Critical",
    probability: 87,
    rainfall: 182,
    soilMoisture: 81,
    slope: 39,
    population: 4820,
    villages: 3,
    color: "red",
    position: {
      top: "31%",
      left: "62%",
    },
  },
  {
    id: 2,
    name: "West Kameng",
    state: "Arunachal Pradesh",
    risk: "High",
    probability: 72,
    rainfall: 148,
    soilMoisture: 73,
    slope: 34,
    population: 3180,
    villages: 5,
    color: "orange",
    position: {
      top: "20%",
      left: "74%",
    },
  },
  {
    id: 3,
    name: "Dima Hasao",
    state: "Assam",
    risk: "High",
    probability: 68,
    rainfall: 139,
    soilMoisture: 69,
    slope: 31,
    population: 2740,
    villages: 4,
    color: "orange",
    position: {
      top: "60%",
      left: "54%",
    },
  },
  {
    id: 4,
    name: "East Khasi Hills",
    state: "Meghalaya",
    risk: "Moderate",
    probability: 49,
    rainfall: 118,
    soilMoisture: 61,
    slope: 27,
    population: 1960,
    villages: 2,
    color: "yellow",
    position: {
      top: "69%",
      left: "42%",
    },
  },
  {
    id: 5,
    name: "Champhai",
    state: "Mizoram",
    risk: "Moderate",
    probability: 43,
    rainfall: 104,
    soilMoisture: 56,
    slope: 25,
    population: 1420,
    villages: 2,
    color: "yellow",
    position: {
      top: "76%",
      left: "63%",
    },
  },
  {
    id: 6,
    name: "Kohima",
    state: "Nagaland",
    risk: "Low",
    probability: 28,
    rainfall: 82,
    soilMoisture: 43,
    slope: 19,
    population: 980,
    villages: 1,
    color: "green",
    position: {
      top: "43%",
      left: "83%",
    },
  },
];

function RiskMap() {
  const navigate = useNavigate();

  // Shared TerraGuard state
  const { selectedZone, selectZone } = useTerraGuard();

  // Local UI state
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter zones according to risk level and search
  const filteredZones = riskZones.filter((zone) => {
    const matchesRisk =
      filter === "All" || zone.risk === filter;

    const search = searchTerm.toLowerCase();

    const matchesSearch =
      zone.name.toLowerCase().includes(search) ||
      zone.state.toLowerCase().includes(search);

    return matchesRisk && matchesSearch;
  });

  // Select a zone and save it globally
  const handleZoneSelect = (zone) => {
    selectZone(zone);
  };

  // Close selected zone
  const handleCloseZone = () => {
    selectZone(null);
  };

  // Move selected zone to AI Prediction page
  const handleAnalyzeRisk = () => {
    if (!selectedZone) return;

    // Make sure the latest selected zone is stored globally
    selectZone(selectedZone);

    navigate("/prediction");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div className="app-main">
        <Navbar />

        <main className="page-enter p-8">

          {/* =========================
              PAGE HEADING
          ========================== */}
          <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">

            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500"></span>

                <span className="text-xs font-semibold uppercase tracking-widest text-red-500">
                  GIS Monitoring
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Regional Risk Map
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-slate-500">
                Geospatial visualization of landslide and environmental
                risk zones across the North Eastern Region.
              </p>
            </div>

            {/* Search */}
            <div className="flex w-full items-center rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm lg:w-72">
              <Search size={17} className="text-slate-400" />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search location..."
                className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* =========================
              MAP
          ========================== */}
          <div className="relative h-[650px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-sm">

            {/* Fake satellite / terrain background */}
            <div
              className="absolute inset-0 opacity-80"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(71,85,105,0.18) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(71,85,105,0.18) 1px, transparent 1px),
                  radial-gradient(circle at 50% 40%, rgba(16,185,129,0.18), transparent 30%),
                  radial-gradient(circle at 75% 20%, rgba(245,158,11,0.12), transparent 25%),
                  radial-gradient(circle at 35% 70%, rgba(59,130,246,0.10), transparent 30%)
                `,
                backgroundSize:
                  "45px 45px, 45px 45px, 100% 100%, 100% 100%, 100% 100%",
              }}
            />

            {/* Terrain shapes */}
            <div className="absolute left-[15%] top-[18%] h-64 w-72 rotate-12 rounded-[45%] bg-emerald-950/60 blur-xl"></div>

            <div className="absolute left-[43%] top-[12%] h-72 w-80 -rotate-6 rounded-[50%] bg-emerald-900/50 blur-xl"></div>

            <div className="absolute right-[12%] top-[25%] h-72 w-64 rotate-12 rounded-[45%] bg-slate-800/80 blur-xl"></div>

            <div className="absolute bottom-[5%] left-[30%] h-64 w-96 -rotate-12 rounded-[50%] bg-blue-950/50 blur-xl"></div>

            {/* =========================
                RISK FILTERS
            ========================== */}
            <div className="absolute left-5 top-5 z-20 flex flex-wrap gap-2">

              {["All", "Critical", "High", "Moderate", "Low"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={`rounded-lg border px-3 py-2 text-xs font-semibold backdrop-blur transition ${
                      filter === item
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-white/10 bg-slate-950/80 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}

            </div>

            {/* =========================
                MAP TOOLS
            ========================== */}
            <div className="absolute right-5 top-5 z-20 flex flex-col overflow-hidden rounded-xl border border-white/10 bg-slate-950/80 backdrop-blur">

              <button
                className="p-3 text-slate-300 hover:bg-slate-800"
                title="Zoom in"
              >
                <Plus size={18} />
              </button>

              <div className="border-t border-white/10"></div>

              <button
                className="p-3 text-slate-300 hover:bg-slate-800"
                title="Zoom out"
              >
                <Minus size={18} />
              </button>

              <div className="border-t border-white/10"></div>

              <button
                className="p-3 text-slate-300 hover:bg-slate-800"
                title="My location"
              >
                <Navigation size={18} />
              </button>

              <div className="border-t border-white/10"></div>

              <button
                className="p-3 text-slate-300 hover:bg-slate-800"
                title="Map layers"
              >
                <Layers size={18} />
              </button>

            </div>

            {/* =========================
                ZONE MARKERS
            ========================== */}
            {filteredZones.map((zone) => {

              const markerColor = {
                red: "bg-red-500",
                orange: "bg-orange-500",
                yellow: "bg-yellow-400",
                green: "bg-emerald-500",
              }[zone.color];

              const ringColor = {
                red: "bg-red-500",
                orange: "bg-orange-500",
                yellow: "bg-yellow-400",
                green: "bg-emerald-500",
              }[zone.color];

              const isSelected =
                selectedZone?.id === zone.id;

              return (
                <button
                  key={zone.id}
                  onClick={() => handleZoneSelect(zone)}
                  className={`group absolute z-10 -translate-x-1/2 -translate-y-1/2 ${
                    isSelected ? "z-20" : ""
                  }`}
                  style={{
                    top: zone.position.top,
                    left: zone.position.left,
                  }}
                >

                  {/* Pulse */}
                  <span
                    className={`absolute -inset-3 rounded-full ${ringColor} opacity-20 ${
                      zone.risk === "Critical"
                        ? "animate-ping"
                        : ""
                    }`}
                  ></span>

                  {/* Selected ring */}
                  {isSelected && (
                    <span className="absolute -inset-2 rounded-full border-2 border-white/70"></span>
                  )}

                  {/* Marker */}
                  <span
                    className={`relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-white ${markerColor} shadow-lg`}
                  >
                    <MapPin
                      size={12}
                      className="text-white"
                    />
                  </span>

                  {/* Label */}
                  <span className="absolute left-1/2 top-8 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-slate-950/90 px-2 py-1 text-[10px] font-semibold text-white shadow-xl group-hover:block">
                    {zone.name}
                  </span>

                </button>
              );
            })}

            {/* No search results */}
            {filteredZones.length === 0 && (
              <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-slate-950/90 px-6 py-4 text-center">
                <p className="text-sm font-semibold text-white">
                  No zones found
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Try another location or risk level.
                </p>
              </div>
            )}

            {/* =========================
                MAP LEGEND
            ========================== */}
            <div className="absolute bottom-5 left-5 z-20 rounded-xl border border-white/10 bg-slate-950/90 p-4 backdrop-blur">

              <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Risk Level
              </p>

              <div className="space-y-2">

                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500"></span>

                  <span className="text-xs text-slate-300">
                    Critical
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-orange-500"></span>

                  <span className="text-xs text-slate-300">
                    High
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-yellow-400"></span>

                  <span className="text-xs text-slate-300">
                    Moderate
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-emerald-500"></span>

                  <span className="text-xs text-slate-300">
                    Low
                  </span>
                </div>

              </div>
            </div>

            {/* =========================
                SELECTED ZONE PANEL
            ========================== */}
            {selectedZone && (
              <div className="absolute bottom-5 right-5 z-30 w-[350px] rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">

                {/* Header */}
                <div className="flex items-start justify-between">

                  <div>

                    <div className="flex items-center gap-2">

                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          selectedZone.risk === "Critical"
                            ? "bg-red-500"
                            : selectedZone.risk === "High"
                            ? "bg-orange-500"
                            : selectedZone.risk === "Moderate"
                            ? "bg-yellow-400"
                            : "bg-emerald-500"
                        }`}
                      ></span>

                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest ${
                          selectedZone.risk === "Critical"
                            ? "text-red-500"
                            : selectedZone.risk === "High"
                            ? "text-orange-500"
                            : selectedZone.risk === "Moderate"
                            ? "text-yellow-600"
                            : "text-emerald-600"
                        }`}
                      >
                        {selectedZone.risk} Risk
                      </span>

                    </div>

                    <h2 className="mt-2 text-xl font-bold text-slate-900">
                      {selectedZone.name}
                    </h2>

                    <p className="text-xs text-slate-500">
                      {selectedZone.state}
                    </p>

                  </div>

                  <button
                    onClick={handleCloseZone}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    title="Close"
                  >
                    <X size={18} />
                  </button>

                </div>

                {/* Probability */}
                <div className="mt-5 rounded-xl bg-red-50 p-4">

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-xs text-red-600">
                        Landslide Probability
                      </p>

                      <p className="mt-1 text-3xl font-bold text-red-600">
                        {selectedZone.probability}%
                      </p>
                    </div>

                    <AlertTriangle
                      size={32}
                      className="text-red-500"
                    />

                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-red-100">

                    <div
                      className="h-full rounded-full bg-red-500"
                      style={{
                        width: `${selectedZone.probability}%`,
                      }}
                    ></div>

                  </div>

                </div>

                {/* Environmental data */}
                <div className="mt-4 grid grid-cols-2 gap-3">

                  {/* Rainfall */}
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">

                    <div className="flex items-center gap-2">
                      <CloudRain
                        size={15}
                        className="text-blue-500"
                      />

                      <span className="text-[10px] text-slate-500">
                        Rainfall
                      </span>
                    </div>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {selectedZone.rainfall} mm
                    </p>

                  </div>

                  {/* Soil moisture */}
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">

                    <div className="flex items-center gap-2">
                      <Droplets
                        size={15}
                        className="text-cyan-500"
                      />

                      <span className="text-[10px] text-slate-500">
                        Soil Moisture
                      </span>
                    </div>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {selectedZone.soilMoisture}%
                    </p>

                  </div>

                  {/* Slope */}
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">

                    <div className="flex items-center gap-2">
                      <Mountain
                        size={15}
                        className="text-orange-500"
                      />

                      <span className="text-[10px] text-slate-500">
                        Slope
                      </span>
                    </div>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {selectedZone.slope}°
                    </p>

                  </div>

                  {/* Population */}
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">

                    <div className="flex items-center gap-2">
                      <Users
                        size={15}
                        className="text-purple-500"
                      />

                      <span className="text-[10px] text-slate-500">
                        Population
                      </span>
                    </div>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {selectedZone.population.toLocaleString()}
                    </p>

                  </div>

                </div>

                {/* Villages */}
                <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">

                  <span className="text-xs text-slate-500">
                    Villages potentially affected
                  </span>

                  <span className="text-sm font-bold text-slate-900">
                    {selectedZone.villages}
                  </span>

                </div>

                {/* =========================
                    ACTIONS
                ========================== */}
                <div className="mt-4 grid grid-cols-2 gap-3">

                  {/* Analyze Risk */}
                  <button
                    onClick={handleAnalyzeRisk}
                    className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-3 text-xs font-semibold text-white transition hover:bg-slate-800"
                  >
                    Analyze Risk
                    <ArrowUpRight size={14} />
                  </button>

                  {/* Generate Alert - Step 4 */}
                  <button
                    className="flex items-center justify-center gap-2 rounded-xl bg-red-500 px-3 py-3 text-xs font-semibold text-white transition hover:bg-red-600"
                  >
                    Generate Alert
                    <AlertTriangle size={14} />
                  </button>

                </div>

              </div>
            )}

          </div>

        </main>
      </div>
    </div>
  );
}

export default RiskMap;
