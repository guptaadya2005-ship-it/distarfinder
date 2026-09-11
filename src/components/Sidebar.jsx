import {
  LayoutDashboard,
  Map,
  BrainCircuit,
  Bell,
  FileWarning,
  Siren,
  Shield,
  ChevronRight,
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
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-slate-800 bg-slate-950 text-white lg:flex">

      {/* Logo */}
      <div className="flex h-20 items-center border-b border-slate-800 px-6">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500">
          <Shield size={22} className="text-white" />
        </div>

        <div className="ml-3">
          <h1 className="text-lg font-bold tracking-wide">
            TerraGuard
          </h1>

          <p className="text-[10px] uppercase tracking-widest text-slate-400">
            Disaster Intelligence
          </p>
        </div>

      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 py-6">

        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
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
                  `group flex items-center rounded-xl px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/10"
                      : "text-slate-400 hover:bg-slate-900 hover:text-white"
                  }`
                }
              >

                <Icon size={19} />

                <span className="ml-3">
                  {item.name}
                </span>

                <ChevronRight
                  size={15}
                  className="ml-auto opacity-0 transition group-hover:opacity-100"
                />

              </NavLink>
            );
          })}

        </nav>

      </div>

      {/* Bottom status */}
      <div className="border-t border-slate-800 p-4">

        <div className="rounded-xl bg-slate-900 p-4">

          <div className="flex items-center gap-2">

            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>

            <span className="text-xs font-medium text-slate-300">
              Monitoring Active
            </span>

          </div>

          <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
            Regional disaster monitoring systems are operational.
          </p>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;