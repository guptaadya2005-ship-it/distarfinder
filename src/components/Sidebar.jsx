import {
  LayoutDashboard,
  Map,
  BrainCircuit,
  Bell,
  FileWarning,
  Siren,
  Shield,
  Radio,
} from "lucide-react";
import { NavLink } from "react-router-dom";

// Categorized navigation groups
const navigationSections = [
  {
    title: "DASHBOARD",
    items: [
      { name: "Overview", path: "/", icon: LayoutDashboard },
      { name: "Risk Map", path: "/risk-map", icon: Map },
    ],
  },
  {
    title: "INTELLIGENCE",
    items: [
      { name: "AI Prediction", path: "/prediction", icon: BrainCircuit },
      { name: "Live Alerts", path: "/alerts", icon: Bell },
    ],
  },
  {
    title: "OPERATIONS",
    items: [
      { name: "Citizen Reports", path: "/citizen-reports", icon: FileWarning },
      { name: "Emergency Priority", path: "/emergency-priority", icon: Siren },
    ],
  },
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 flex-col border-r border-slate-200 bg-white text-slate-700 antialiased select-none lg:flex shadow-[1px_0_10px_rgba(0,0,0,0.03)]">
      
      {/* Brand Header */}
      <div className="flex h-20 items-center gap-3.5 border-b border-slate-100 px-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2589d8] text-white shadow-sm">
          <Shield size={22} />
        </div>
        <div className="flex flex-col">
          <span className="text-base font-bold tracking-tight text-slate-900">
            TerraGuard
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Disaster Intelligence
          </span>
        </div>
      </div>

      {/* Navigation List with scrollbar */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
        {navigationSections.map((section, idx) => (
          <div
            key={section.title}
            className={idx !== 0 ? "pt-4 border-t border-slate-100" : ""}
          >
            {/* Section Header */}
            <p className="px-3 pb-3 text-[11px] font-bold tracking-widest text-slate-400">
              {section.title}
            </p>

            {/* Links */}
            <nav className="space-y-1.5">
              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3.5 rounded-lg px-3.5 py-3 text-sm font-semibold transition-all duration-150 ${
                        isActive
                          ? "bg-[#2589d8] text-white shadow-md shadow-blue-500/25"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          size={20}
                          className={
                            isActive
                              ? "text-white"
                              : "text-slate-500"
                          }
                        />
                        <span className="truncate">{item.name}</span>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* System Status Footer */}
      <div className="border-t border-slate-100 p-4 bg-slate-50/50">
        <div className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-white p-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <Radio size={16} className="text-emerald-500 animate-pulse" />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-800">
                System Online
              </span>
              <span className="text-[11px] text-slate-500">
                Regional Hub Active
              </span>
            </div>
          </div>
        </div>
      </div>

    </aside>
  );
}

export default Sidebar;