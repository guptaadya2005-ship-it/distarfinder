import { useState } from "react";
import { useTerraGuard } from "../context/TerraGuardContext";
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

function Prediction() {
  const navigate = useNavigate();

  const { selectedZone, prediction, savePrediction } = useTerraGuard();

  const [rainfall, setRainfall] = useState(
    String(selectedZone?.rainfall ?? 182)
  );

  const [soilMoisture, setSoilMoisture] = useState(
    String(selectedZone?.soilMoisture ?? 81)
  );

  const [slope, setSlope] = useState(
    String(selectedZone?.slope ?? 39)
  );

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const zoneName = selectedZone?.name || "East Sikkim";

  const zoneState = selectedZone?.state || "Sikkim";

  const analyzeRisk = () => {
    setIsAnalyzing(true);

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

      // Terrain slope contribution
      if (slopeValue >= 35) {
        score += 25;
      } else if (slopeValue >= 25) {
        score += 18;
      } else if (slopeValue >= 15) {
        score += 10;
      } else {
        score += 5;
      }

      // Final prototype score
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

      const result = {
        score: finalScore,
        level,
        description,
        location: zoneName,
        state: zoneState,
        rainfall: rain,
        soilMoisture: soil,
        slope: slopeValue,
      };

      // Save prediction globally
      savePrediction(result);

      setIsAnalyzing(false);
    }, 1800);
  };

  const resetPrediction = () => {
    savePrediction(null);

    setRainfall(String(selectedZone?.rainfall ?? 182));
    setSoilMoisture(String(selectedZone?.soilMoisture ?? 81));
    setSlope(String(selectedZone?.slope ?? 39));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div className="ml-64">
        <Navbar />

        <main className="page-enter p-8">

          {/* Heading */}
          <div className="mb-8">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-violet-500"></span>

              <span className="text-xs font-semibold uppercase tracking-widest text-violet-600">
                AI Decision Support
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              AI Risk Prediction
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Analyze environmental conditions to estimate landslide risk
              and support faster emergency decision-making.
            </p>
          </div>

          <div className="grid gap-6 xl:grid-cols-5">

            {/* ================= INPUT PANEL ================= */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50">
                  <BrainCircuit
                    size={22}
                    className="text-violet-600"
                  />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Environmental Inputs
                  </h2>

                  <p className="text-xs text-slate-500">
                    Enter current field conditions
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="mt-7 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2">
                  <MapPin
                    size={17}
                    className="text-red-500"
                  />

                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">
                      Monitoring Location
                    </p>

                    <p className="text-sm font-semibold text-slate-800">
                      {zoneName}, {zoneState}
                    </p>
                  </div>
                </div>
              </div>

              {/* Rainfall */}
              <div className="mt-6">
                <label className="mb-2 block text-xs font-semibold text-slate-700">
                  Rainfall
                </label>

                <div className="relative">
                  <CloudRain
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
                  />

                  <input
                    type="number"
                    value={rainfall}
                    onChange={(e) => setRainfall(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-16 text-sm font-semibold outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                    mm
                  </span>
                </div>

                <p className="mt-1.5 text-[11px] text-slate-400">
                  Recent accumulated rainfall
                </p>
              </div>

              {/* Soil moisture */}
              <div className="mt-5">
                <label className="mb-2 block text-xs font-semibold text-slate-700">
                  Soil Moisture
                </label>

                <div className="relative">
                  <Droplets
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500"
                  />

                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={soilMoisture}
                    onChange={(e) =>
                      setSoilMoisture(e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-16 text-sm font-semibold outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                    %
                  </span>
                </div>

                <p className="mt-1.5 text-[11px] text-slate-400">
                  Current soil saturation level
                </p>
              </div>

              {/* Slope */}
              <div className="mt-5">
                <label className="mb-2 block text-xs font-semibold text-slate-700">
                  Terrain Slope
                </label>

                <div className="relative">
                  <Mountain
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500"
                  />

                  <input
                    type="number"
                    value={slope}
                    onChange={(e) => setSlope(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-20 text-sm font-semibold outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                    degrees
                  </span>
                </div>

                <p className="mt-1.5 text-[11px] text-slate-400">
                  Average terrain inclination
                </p>
              </div>

              {/* Analyze button */}
              <button
                onClick={analyzeRisk}
                disabled={isAnalyzing}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />

                    Analyzing environmental data...
                  </>
                ) : (
                  <>
                    <BrainCircuit size={18} />

                    Analyze Risk
                  </>
                )}
              </button>

              {/* Reset */}
              {prediction && (
                <button
                  onClick={resetPrediction}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  <RotateCcw size={14} />

                  Reset Analysis
                </button>
              )}
            </div>

            {/* ================= RESULT PANEL ================= */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-3">

              {/* Ready state */}
              {!prediction && !isAnalyzing && (
                <div className="flex h-full min-h-[560px] flex-col items-center justify-center text-center">

                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-50">
                    <BrainCircuit
                      size={38}
                      className="text-violet-500"
                    />
                  </div>

                  <h2 className="mt-6 text-xl font-bold text-slate-900">
                    Ready for Risk Analysis
                  </h2>

                  <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
                    Enter environmental conditions on the left and run the
                    AI analysis to estimate the current landslide risk.
                  </p>

                  <div className="mt-7 grid w-full max-w-md grid-cols-3 gap-3">

                    <div className="rounded-xl bg-blue-50 p-3">
                      <CloudRain
                        size={18}
                        className="mx-auto text-blue-500"
                      />

                      <p className="mt-2 text-[10px] font-medium text-slate-500">
                        Rainfall
                      </p>
                    </div>

                    <div className="rounded-xl bg-cyan-50 p-3">
                      <Droplets
                        size={18}
                        className="mx-auto text-cyan-500"
                      />

                      <p className="mt-2 text-[10px] font-medium text-slate-500">
                        Soil
                      </p>
                    </div>

                    <div className="rounded-xl bg-orange-50 p-3">
                      <Mountain
                        size={18}
                        className="mx-auto text-orange-500"
                      />

                      <p className="mt-2 text-[10px] font-medium text-slate-500">
                        Terrain
                      </p>
                    </div>

                  </div>
                </div>
              )}

              {/* Loading state */}
              {isAnalyzing && (
                <div className="flex min-h-[560px] flex-col items-center justify-center text-center">

                  <div className="relative">
                    <div className="h-24 w-24 animate-pulse rounded-full bg-violet-100"></div>

                    <BrainCircuit
                      size={40}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-violet-600"
                    />
                  </div>

                  <h2 className="mt-7 text-xl font-bold text-slate-900">
                    AI is analyzing the region...
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Evaluating rainfall, soil moisture and terrain conditions
                  </p>

                  <div className="mt-6 flex items-center gap-2">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400"></span>

                    <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400 [animation-delay:150ms]"></span>

                    <span className="h-2 w-2 animate-bounce rounded-full bg-violet-400 [animation-delay:300ms]"></span>
                  </div>
                </div>
              )}

              {/* Prediction result */}
              {prediction && !isAnalyzing && (
                <div>

                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                        AI Prediction Result
                      </p>

                      <h2 className="mt-2 text-2xl font-bold text-slate-900">
                        {prediction.location || zoneName} Risk Assessment
                      </h2>
                    </div>

                    <div className="rounded-xl bg-emerald-50 p-3">
                      <CheckCircle2
                        size={22}
                        className="text-emerald-600"
                      />
                    </div>
                  </div>

                  {/* Risk score */}
                  <div className="mt-7 rounded-2xl bg-red-50 p-6">

                    <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="h-3 w-3 animate-pulse rounded-full bg-red-500"></span>

                          <span className="text-xs font-bold uppercase tracking-widest text-red-600">
                            {prediction.level} Risk
                          </span>
                        </div>

                        <p className="mt-3 text-6xl font-black tracking-tight text-red-600">
                          {prediction.score}%
                        </p>

                        <p className="mt-1 text-sm font-medium text-red-500">
                          Estimated Landslide Probability
                        </p>
                      </div>

                      <div className="flex h-28 w-28 items-center justify-center rounded-full border-8 border-red-200 bg-white">
                        <AlertTriangle
                          size={42}
                          className="text-red-500"
                        />
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mt-6">
                      <div className="h-3 overflow-hidden rounded-full bg-red-100">
                        <div
                          className="h-full rounded-full bg-red-500 transition-all duration-1000"
                          style={{
                            width: `${prediction.score}%`,
                          }}
                        ></div>
                      </div>

                      <div className="mt-2 flex justify-between text-[10px] text-red-400">
                        <span>Low</span>
                        <span>Moderate</span>
                        <span>High</span>
                        <span>Critical</span>
                      </div>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="mt-5 rounded-xl border border-slate-200 p-5">
                    <div className="flex items-center gap-2">
                      <BrainCircuit
                        size={18}
                        className="text-violet-600"
                      />

                      <h3 className="text-sm font-semibold text-slate-900">
                        AI Assessment
                      </h3>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-slate-500">
                      {prediction.description}
                    </p>
                  </div>

                  {/* Input summary */}
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">

                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <p className="text-[10px] uppercase tracking-wide text-slate-400">
                        Rainfall
                      </p>

                      <p className="mt-1 text-lg font-bold text-slate-900">
                        {prediction.rainfall} mm
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <p className="text-[10px] uppercase tracking-wide text-slate-400">
                        Soil Moisture
                      </p>

                      <p className="mt-1 text-lg font-bold text-slate-900">
                        {prediction.soilMoisture}%
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <p className="text-[10px] uppercase tracking-wide text-slate-400">
                        Terrain Slope
                      </p>

                      <p className="mt-1 text-lg font-bold text-slate-900">
                        {prediction.slope}°
                      </p>
                    </div>
                  </div>

                  {/* Alert action */}
                  <div className="mt-5 flex flex-col justify-between gap-4 rounded-xl border border-red-100 bg-red-50/50 p-4 sm:flex-row sm:items-center">

                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-red-100 p-2">
                        <AlertTriangle
                          size={18}
                          className="text-red-600"
                        />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-slate-800">
                          Immediate attention recommended
                        </p>

                        <p className="text-[11px] text-slate-500">
                          Generate an emergency alert for this zone.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate("/alerts")}
                      className="flex items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-red-600"
                    >
                      Generate Alert

                      <ArrowRight size={14} />
                    </button>
                  </div>

                </div>
              )}

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Prediction;