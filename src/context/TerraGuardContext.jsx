import { createContext, useContext, useState } from "react";

const TerraGuardContext = createContext(null);

export function TerraGuardProvider({ children }) {
  // Currently selected risk zone
  const [selectedZone, setSelectedZone] = useState(null);

  // Latest AI prediction
  const [prediction, setPrediction] = useState(null);

  // Emergency alerts
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      location: "East Sikkim",
      type: "Potential Landslide",
      risk: 87,
      level: "Critical",
      population: 4820,
      villages: 3,
      status: "Active",
    },
    {
      id: 2,
      location: "West Kameng",
      type: "Slope Instability",
      risk: 72,
      level: "High",
      population: 3180,
      villages: 5,
      status: "Active",
    },
  ]);

  // Citizen / field reports
  const [reports, setReports] = useState([
    {
      id: 1,
      type: "Road Crack",
      location: "East Sikkim",
      severity: "High",
      status: "Pending",
      source: "Field Officer",
    },
    {
      id: 2,
      type: "Waterlogging",
      location: "Dima Hasao",
      severity: "Moderate",
      status: "Verified",
      source: "Citizen",
    },
  ]);

  // System status
  const [systemStatus] = useState("Operational");

  // Select a zone from Risk Map
  const selectZone = (zone) => {
    setSelectedZone(zone);
  };

  // Store AI prediction
  const savePrediction = (result) => {
    setPrediction(result);
  };

  // Generate a new emergency alert
  const generateAlert = (alert) => {
    setAlerts((currentAlerts) => [
      {
        id: Date.now(),
        ...alert,
      },
      ...currentAlerts,
    ]);
  };

  // Add a citizen report
  const addReport = (report) => {
    setReports((currentReports) => [
      {
        id: Date.now(),
        ...report,
      },
      ...currentReports,
    ]);
  };

  // Verify a citizen report
  const verifyReport = (id) => {
    setReports((currentReports) =>
      currentReports.map((report) =>
        report.id === id
          ? { ...report, status: "Verified" }
          : report
      )
    );
  };

  // Acknowledge an alert
  const acknowledgeAlert = (id) => {
    setAlerts((currentAlerts) =>
      currentAlerts.map((alert) =>
        alert.id === id
          ? { ...alert, status: "Acknowledged" }
          : alert
      )
    );
  };

  return (
    <TerraGuardContext.Provider
      value={{
        selectedZone,
        prediction,
        alerts,
        reports,
        systemStatus,

        selectZone,
        savePrediction,
        generateAlert,
        addReport,
        verifyReport,
        acknowledgeAlert,
      }}
    >
      {children}
    </TerraGuardContext.Provider>
  );
}

// Custom hook for accessing TerraGuard data
export function useTerraGuard() {
  const context = useContext(TerraGuardContext);

  if (!context) {
    throw new Error(
      "useTerraGuard must be used inside TerraGuardProvider"
    );
  }

  return context;
}