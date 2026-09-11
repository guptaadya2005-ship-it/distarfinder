import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import RiskMap from "./pages/RiskMap";
import Prediction from "./pages/Prediction";
import Alerts from "./pages/Alerts";
import CitizenReports from "./pages/CitizenReports";
import EmergencyPriority from "./pages/EmergencyPriority";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/risk-map" element={<RiskMap />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/citizen-reports" element={<CitizenReports />} />
        <Route
          path="/emergency-priority"
          element={<EmergencyPriority />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;