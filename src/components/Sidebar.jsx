import {
  LayoutDashboard,
  Map,
  BrainCircuit,
  Bell,
  FileWarning,
  Siren,
  Shield,
  ChevronRight,
  Radio,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Risk Map",
    path: "/risk-map",
    icon: Map,
  },
  {
    name: "AI Prediction",
    path: "/prediction",
    icon: BrainCircuit,
  },
  {
    name: "Alerts",
    path: "/alerts",
    icon: Bell,
    badge: "12",
  },
  {
    name: "Citizen Reports",
    path: "/citizen-reports",
    icon: FileWarning,
  },
  {
    name: "Emergency Priority",
    path: "/emergency-priority",
    icon: Siren,
  },
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-slate-800 bg-[#0b1120] text-slate-300 antialiased select-none lg:flex">
      
      {/* Brand Header */}
      <div className="flex h-16 items-center gap-3 border-b border-slate-800/80 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-sm ring-1 ring-emerald-400/20">
          <Shield size={20} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-wide text-white">
            TerraGuard
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
            Disaster Intelligence
          </span>
        </div>
      </div>

      {/* Navigation Group */}
      <div className="flex-1 overflow-y-auto px-3 py-5">
        <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Monitoring
        </p>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? "bg-slate-800/90 text-emerald-400"
                      : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Left active border indicator */}
                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-emerald-500" />
                    )}

                    <Icon
                      size={18}
                      className={
                        isActive
                          ? "text-emerald-400"
                          : "text-slate-400 group-hover:text-slate-200"
                      }
                    />

                    <span className="flex-1 truncate">{item.name}</span>

                    {/* Optional alert count badge */}
                    {item.badge && (
                      <span className="rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-semibold text-rose-400 ring-1 ring-rose-500/20">
                        {item.badge}
                      </span>
                    )}

                    <ChevronRight
                      size={14}
                      className={`text-slate-500 transition-transform ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* System Status Footer */}
      <div className="border-t border-slate-800/80 p-3">
        <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio size={14} className="text-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-slate-200">
                System Live
              </span>
            </div>
            <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-medium text-emerald-400 ring-1 ring-emerald-500/20">
              Active
            </span>
          </div>

          <p className="mt-1.5 text-[11px] leading-snug text-slate-400">
            Northeast regional feeds connected.
          </p>
        </div>
      </div>

    </aside>
  );
}

export default Sidebar;