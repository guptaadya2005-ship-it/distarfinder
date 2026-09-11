import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  BrainCircuit,
  CloudRain,
  Droplets,
  Mountain,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useTerraGuard } from "../context/TerraGuardContext";

function Prediction() {
  const navigate = useNavigate();

  // Global TerraGuard data
  const {
    selectedZone,
    savePrediction,
    generateAlert,
  } = useTerraGuard();

  // Prediction input values
  const [rainfall, setRainfall] = useState(
    selectedZone?.rainfall?.toString() || "182"
  );

  const [soilMoisture, setSoilMoisture] = useState(
    selectedZone?.soilMoisture?.toString() || "81"
  );

  const [slope, setSlope] = useState(
    selectedZone?.slope?.toString() || "39"
  );

  // Prediction states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState(null);

  // Selected location
  const zoneName = selectedZone?.name || "East Sikkim";

  // --------------------------------------------------
  // AI RISK ANALYSIS
  // --------------------------------------------------

  const analyzeRisk = () => {
    setIsAnalyzing(true);
    setPrediction(null);

    setTimeout(() => {
      const rain = Number(rainfall);
      const soil = Number(soilMoisture);
      const slopeValue = Number(slope);

      let score = 0;

      // Rainfall contribution
      if (rain >= 180) {
        score += 35;
      } else if (rain >= 140) {
        score += 25;
      } else if (rain >= 100) {
        score += 15;
      } else {
        score += 8;
      }

      // Soil moisture contribution
      if (soil >= 80) {
        score += 30;
      } else if (soil >= 65) {
        score += 22;
      } else if (soil >= 50) {
        score += 14;
      } else {
        score += 7;
      }

      // Slope contribution
      if (slopeValue >= 35) {
        score += 25;
      } else if (slopeValue >= 25) {
        score += 18;
      } else if (slopeValue >= 15) {
        score += 10;
      } else {
        score += 5;
      }

      // Keep score realistic for prototype
      const finalScore = Math.min(score - 3, 99);

      let level = "Low";

      let description =
        "Current environmental conditions indicate relatively low landslide probability.";

      if (finalScore >= 75) {
        level = "Critical";

        description =
          "Multiple environmental indicators have crossed critical thresholds. Immediate assessment is recommended.";
      } else if (finalScore >= 55) {
        level = "High";

        description =
          "Environmental conditions indicate elevated landslide probability. Authorities should remain prepared.";
      } else if (finalScore >= 35) {
        level = "Moderate";

        description =
          "Some environmental indicators show increased risk. Continue monitoring the region.";
      }

      // Create complete prediction object
      const result = {
        score: finalScore,
        level,
        description,

        location: zoneName,

        rainfall: rain,
        soilMoisture: soil,
        slope: slopeValue,

        population: selectedZone?.population || 4820,
        villages: selectedZone?.villages || 3,
      };

      // Save locally for this page
      setPrediction(result);

      // Save globally for other pages
      savePrediction(result);

      setIsAnalyzing(false);
    }, 1800);
  };

  // --------------------------------------------------
  // GENERATE EMERGENCY ALERT
  // --------------------------------------------------

  const handleGenerateAlert = () => {
    if (!prediction) return;

    // Send prediction result to global Alerts state
    generateAlert({
      location: prediction.location,
      type: "Potential Landslide",

      risk: prediction.score,
      level: prediction.level,

      population: prediction.population,
      villages: prediction.villages,

      rainfall: prediction.rainfall,
      soilMoisture: prediction.soilMoisture,
      slope: prediction.slope,

      status: "Active",
    });

    // Move to Alerts page
    navigate("/alerts");
  };

  // --------------------------------------------------
  // RESET
  // --------------------------------------------------

  const resetPrediction = () => {
    setPrediction(null);

    setRainfall(
      selectedZone?.rainfall?.toString() || "182"
    );

    setSoilMoisture(
      selectedZone?.soilMoisture?.toString() || "81"
    );

    setSlope(
      selectedZone?.slope?.toString() || "39"
    );
  };

  // --------------------------------------------------
  // RISK COLOR
  // --------------------------------------------------

  const getRiskColor = () => {
    if (!prediction) return "text-slate-900";

    if (prediction.level === "Critical") {
      return "text-red-600";
    }

    if (prediction.level === "High") {
      return "text-orange-500";
    }

    if (prediction.level === "Moderate") {
      return "text-yellow-500";
    }

    return "text-emerald-500";
  };

  const getRiskBg = () => {
    if (!prediction) return "bg-slate-100";

    if (prediction.level === "Critical") {
      return "bg-red-50 border-red-200";
    }

    if (prediction.level === "High") {
      return "bg-orange-50 border-orange-200";
    }

    if (prediction.level === "Moderate") {
      return "bg-yellow-50 border-yellow-200";
    }

    return "bg-emerald-50 border-emerald-200";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div className="app-main">
        <Navbar />

        <main className="p-8">
          {/* PAGE HEADER */}

          <div className="mb-8 flex items-start justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <BrainCircuit
                  size={20}
                  className="text-emerald-500"
                />

                <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
                  AI Decision Support
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                AI Risk Prediction
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-slate-500">
                Analyze environmental conditions to estimate
                landslide risk for monitored zones.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              <span className="text-xs font-semibold text-emerald-700">
                AI Engine Ready
              </span>
            </div>
          </div>

          {/* SELECTED ZONE */}

          <div className="mb-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900">
                <MapPin
                  size={20}
                  className="text-white"
                />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Selected Monitoring Zone
                </p>

                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  {zoneName}
                </h2>
              </div>
            </div>

            {selectedZone && (
              <div className="hidden text-right md:block">
                <p className="text-xs text-slate-400">
                  Region
                </p>

                <p className="text-sm font-semibold text-slate-700">
                  {selectedZone.state || "Sikkim"}
                </p>
              </div>
            )}
          </div>

          {/* MAIN GRID */}

          <div className="grid gap-6 lg:grid-cols-5">
            {/* INPUT PANEL */}

            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-slate-900">
                    Environmental Inputs
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Enter or verify current environmental
                    conditions.
                  </p>
                </div>

                <div className="space-y-5">
                  {/* RAINFALL */}

                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <CloudRain
                        size={17}
                        className="text-blue-500"
                      />

                      Rainfall
                    </label>

                    <div className="relative">
                      <input
                        type="number"
                        value={rainfall}
                        onChange={(e) =>
                          setRainfall(e.target.value)
                        }
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-16 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                      />

                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                        mm
                      </span>
                    </div>

                    <p className="mt-1.5 text-xs text-slate-400">
                      24-hour accumulated rainfall
                    </p>
                  </div>

                  {/* SOIL MOISTURE */}

                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Droplets
                        size={17}
                        className="text-cyan-500"
                      />

                      Soil Moisture
                    </label>

                    <div className="relative">
                      <input
                        type="number"
                        value={soilMoisture}
                        onChange={(e) =>
                          setSoilMoisture(e.target.value)
                        }
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                      />

                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                        %
                      </span>
                    </div>

                    <p className="mt-1.5 text-xs text-slate-400">
                      Current soil saturation level
                    </p>
                  </div>

                  {/* SLOPE */}

                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Mountain
                        size={17}
                        className="text-amber-500"
                      />

                      Slope Angle
                    </label>

                    <div className="relative">
                      <input
                        type="number"
                        value={slope}
                        onChange={(e) =>
                          setSlope(e.target.value)
                        }
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                      />

                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
                        °
                      </span>
                    </div>

                    <p className="mt-1.5 text-xs text-slate-400">
                      Terrain slope angle
                    </p>
                  </div>
                </div>

                {/* ANALYZE BUTTON */}

                <button
                  onClick={analyzeRisk}
                  disabled={isAnalyzing}
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />

                      Analyzing Environmental Data...
                    </>
                  ) : (
                    <>
                      <BrainCircuit size={17} />

                      Analyze Risk
                    </>
                  )}
                </button>

                {/* RESET */}

                {prediction && !isAnalyzing && (
                  <button
                    onClick={resetPrediction}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    <RotateCcw size={15} />

                    Run New Analysis
                  </button>
                )}
              </div>
            </div>

            {/* RESULT PANEL */}

            <div className="lg:col-span-2">
              {!prediction && !isAnalyzing && (
                <div className="flex min-h-[450px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                    <BrainCircuit
                      size={30}
                      className="text-slate-400"
                    />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-800">
                    Ready for Analysis
                  </h3>

                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-500">
                    Enter environmental values and run the AI
                    analysis to generate a landslide risk
                    prediction.
                  </p>
                </div>
              )}

              {isAnalyzing && (
                <div className="flex min-h-[450px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
                    <Loader2
                      size={30}
                      className="animate-spin text-emerald-500"
                    />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-800">
                    AI Analysis in Progress
                  </h3>

                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-500">
                    Processing rainfall, soil moisture and
                    terrain conditions for {zoneName}.
                  </p>

                  <div className="mt-6 w-full max-w-xs">
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-2/3 animate-pulse rounded-full bg-emerald-500" />
                    </div>
                  </div>
                </div>
              )}

              {prediction && !isAnalyzing && (
                <div
                  className={`rounded-2xl border p-6 shadow-sm ${getRiskBg()}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                        AI Risk Assessment
                      </p>

                      <h3 className="mt-1 text-lg font-bold text-slate-900">
                        {prediction.location}
                      </h3>
                    </div>

                    {prediction.level === "Critical" ? (
                      <AlertTriangle
                        size={23}
                        className="text-red-500"
                      />
                    ) : (
                      <CheckCircle2
                        size={23}
                        className="text-emerald-500"
                      />
                    )}
                  </div>

                  {/* SCORE */}

                  <div className="mt-8 text-center">
                    <p
                      className={`text-7xl font-black tracking-tight ${getRiskColor()}`}
                    >
                      {prediction.score}%
                    </p>

                    <div
                      className={`mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${
                        prediction.level === "Critical"
                          ? "bg-red-100 text-red-700"
                          : prediction.level === "High"
                            ? "bg-orange-100 text-orange-700"
                            : prediction.level === "Moderate"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {prediction.level === "Critical" && (
                        <AlertTriangle size={15} />
                      )}

                      {prediction.level === "Critical"
                        ? "CRITICAL RISK"
                        : `${prediction.level.toUpperCase()} RISK`}
                    </div>
                  </div>

                  {/* DESCRIPTION */}

                  <div className="mt-7 rounded-xl border border-white/70 bg-white/70 p-4">
                    <p className="text-sm leading-relaxed text-slate-600">
                      {prediction.description}
                    </p>
                  </div>

                  {/* INPUT SUMMARY */}

                  <div className="mt-5 grid grid-cols-3 gap-2">
                    <div className="rounded-xl bg-white/70 p-3 text-center">
                      <p className="text-[10px] uppercase tracking-wider text-slate-400">
                        Rainfall
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-800">
                        {prediction.rainfall} mm
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/70 p-3 text-center">
                      <p className="text-[10px] uppercase tracking-wider text-slate-400">
                        Soil
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-800">
                        {prediction.soilMoisture}%
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/70 p-3 text-center">
                      <p className="text-[10px] uppercase tracking-wider text-slate-400">
                        Slope
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-800">
                        {prediction.slope}°
                      </p>
                    </div>
                  </div>

                  {/* GENERATE ALERT */}

                  <button
                    onClick={handleGenerateAlert}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700"
                  >
                    <AlertTriangle size={17} />

                    Generate Emergency Alert

                    <ArrowRight
                      size={16}
                      className="ml-auto"
                    />
                  </button>

                  <p className="mt-3 text-center text-[11px] text-slate-500">
                    This will create an active alert for{" "}
                    {prediction.location}.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* INFORMATION FOOTER */}

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                <BrainCircuit
                  size={19}
                  className="text-blue-500"
                />
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Prototype AI Decision Support
                </h3>

                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  TerraGuard combines rainfall, soil moisture
                  and terrain slope indicators to estimate
                  landslide risk. In the production system,
                  this decision-support layer can be connected
                  to trained ML models, real-time sensors,
                  satellite data and historical disaster
                  records.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Prediction;