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
    <aside className="glass-card fixed left-4 top-4 z-40 hidden h-[calc(100vh-2rem)] w-64 flex-col !rounded-2xl text-slate-700 antialiased select-none lg:flex">

      {/* Brand Header */}
      <div className="flex h-[76px] items-center gap-3 px-5">
        <div className="seal-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#b8862e]/40 bg-[#12293f] text-[#d9a94a]">
          <Shield size={20} strokeWidth={1.75} />
        </div>
        <div className="flex flex-col">
          <span className="text-base font-bold tracking-tight text-[#12293f]">
            TerraGuard
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8a8377]">
            Disaster Intelligence
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        {navigationSections.map((section, idx) => (
          <div key={section.title}>
            {/* Section Header */}
            <p className="px-3 pb-2 text-[10px] font-bold tracking-[0.13em] text-[#9b9488]">
              {section.title}
            </p>

            {/* Links */}
            <nav className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-150 ${
                        isActive
                          ? "bg-[#12293f] text-white shadow-sm"
                          : "text-slate-600 hover:bg-white/60"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          size={18}
                          className={
                            isActive
                              ? "text-[#d9a94a]"
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
      <div className="p-3">
        <div className="flex items-center gap-2.5 rounded-xl bg-white/50 px-3 py-2.5">
          <Radio size={15} className="text-emerald-600 animate-pulse" />
          <span className="text-xs font-semibold text-slate-700">
            System Operational
          </span>
        </div>
      </div>

    </aside>
  );
}

export default Sidebar;
