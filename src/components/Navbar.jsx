import {
  Bell,
  Search,
  CircleHelp,
  ChevronDown,
} from "lucide-react";

function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 lg:px-8 backdrop-blur">

      {/* Left side */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Regional Monitoring Center
        </h2>

        <p className="text-xs text-slate-500">
          North Eastern Region • India
        </p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div className="hidden items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
          <Search
            size={16}
            className="text-slate-400"
          />

          <input
            type="text"
            placeholder="Search zones..."
            className="ml-2 w-40 bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Help */}
        <button
          type="button"
          className="text-slate-500 transition hover:text-slate-900"
        >
          <CircleHelp size={20} />
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="relative text-slate-500 transition hover:text-slate-900"
        >
          <Bell size={21} />

          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
            3
          </span>
        </button>

        {/* User */}
        <div className="flex items-center gap-3 border-l border-slate-200 pl-5">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
            AD
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-semibold text-slate-800">
              Control Officer
            </p>

            <p className="text-[11px] text-slate-500">
              Administrator
            </p>
          </div>

          <ChevronDown
            size={15}
            className="text-slate-400"
          />

        </div>

      </div>
    </header>
  );
}

export default Navbar;