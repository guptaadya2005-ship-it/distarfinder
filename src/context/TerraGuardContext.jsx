import { createContext, useContext, useState } from "react";

const TerraGuardContext = createContext(null);

export function TerraGuardProvider({ children }) {
  // --------------------------------------------------
  // SELECTED RISK ZONE
  // --------------------------------------------------

  const [selectedZone, setSelectedZone] = useState(null);

  // --------------------------------------------------
  // AI PREDICTION
  // --------------------------------------------------

  const [prediction, setPrediction] = useState(null);

  // --------------------------------------------------
  // EMERGENCY ALERTS
  // --------------------------------------------------

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

  // --------------------------------------------------
  // CITIZEN / FIELD REPORTS
  // --------------------------------------------------

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

  // --------------------------------------------------
  // DISPATCHED EMERGENCY RESPONSES
  // --------------------------------------------------

  const [dispatchedResponses, setDispatchedResponses] =
    useState([]);

  // --------------------------------------------------
  // SYSTEM STATUS
  // --------------------------------------------------

  const [systemStatus] = useState("Operational");

  // --------------------------------------------------
  // SELECT ZONE
  // --------------------------------------------------

  const selectZone = (zone) => {
    setSelectedZone(zone);
  };

  // --------------------------------------------------
  // SAVE AI PREDICTION
  // --------------------------------------------------

  const savePrediction = (result) => {
    setPrediction(result);
  };

  // --------------------------------------------------
  // GENERATE ALERT
  // --------------------------------------------------

  const generateAlert = (alert) => {
    setAlerts((currentAlerts) => [
      {
        id: Date.now(),
        ...alert,
      },
      ...currentAlerts,
    ]);
  };

  // --------------------------------------------------
  // ADD CITIZEN REPORT
  // --------------------------------------------------

  const addReport = (report) => {
    setReports((currentReports) => [
      {
        id: Date.now(),
        ...report,
      },
      ...currentReports,
    ]);
  };

  // --------------------------------------------------
  // VERIFY CITIZEN REPORT
  // --------------------------------------------------

  const verifyReport = (id) => {
    setReports((currentReports) =>
      currentReports.map((report) =>
        report.id === id
          ? {
              ...report,
              status: "Verified",
            }
          : report
      )
    );
  };

  // --------------------------------------------------
  // ACKNOWLEDGE ALERT
  // --------------------------------------------------

  const acknowledgeAlert = (id) => {
    setAlerts((currentAlerts) =>
      currentAlerts.map((alert) =>
        alert.id === id
          ? {
              ...alert,
              status: "Acknowledged",
            }
          : alert
      )
    );
  };

  // --------------------------------------------------
  // DISPATCH EMERGENCY RESPONSE
  // --------------------------------------------------

  const dispatchResponse = (id) => {
    // Prevent duplicate dispatch
    if (dispatchedResponses.includes(id)) {
      return;
    }

    // Store dispatched response globally
    setDispatchedResponses((currentResponses) => [
      ...currentResponses,
      id,
    ]);

    // Update the corresponding alert
    setAlerts((currentAlerts) =>
      currentAlerts.map((alert) =>
        alert.id === id
          ? {
              ...alert,
              status: "Response Dispatched",
            }
          : alert
      )
    );
  };

  // --------------------------------------------------
  // CHECK WHETHER RESPONSE IS DISPATCHED
  // --------------------------------------------------

  const isResponseDispatched = (id) => {
    return dispatchedResponses.includes(id);
  };

  // --------------------------------------------------
  // CONTEXT
  // --------------------------------------------------

  return (
    <TerraGuardContext.Provider
      value={{
        selectedZone,
        prediction,
        alerts,
        reports,
        systemStatus,
        dispatchedResponses,

        selectZone,
        savePrediction,
        generateAlert,
        addReport,
        verifyReport,
        acknowledgeAlert,
        dispatchResponse,
        isResponseDispatched,
      }}
    >
      {children}
    </TerraGuardContext.Provider>
  );
}

// --------------------------------------------------
// CUSTOM HOOK
// --------------------------------------------------

export function useTerraGuard() {
  const context = useContext(TerraGuardContext);

  if (!context) {
    throw new Error(
      "useTerraGuard must be used inside TerraGuardProvider"
    );
  }

  return context;
}