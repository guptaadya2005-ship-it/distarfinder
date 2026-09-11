import {
  Bell,
  Search,
  CircleHelp,
  ChevronDown,
} from "lucide-react";

function Navbar() {
  return (
    <header className="glass-dark sticky top-0 z-30 mx-4 mt-4 rounded-2xl !bg-white/55 !border-white/70 lg:mx-8">

      <div className="flex h-[72px] items-center justify-between gap-3 px-5 lg:px-7">

        {/* Left side */}
        <div className="min-w-0">
          <h2 className="truncate text-base font-bold text-[#12293f]">
            Regional Monitoring Center
          </h2>

          <p className="truncate text-xs text-slate-500">
            North Eastern Region • India
          </p>
        </div>

        {/* Right side */}
        <div className="flex shrink-0 items-center gap-3 lg:gap-4">

          {/* Search */}
          <div className="hidden items-center rounded-full border border-white/70 bg-white/50 px-3 py-2 xl:flex">
            <Search
              size={15}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search zones..."
              className="ml-2 w-28 bg-transparent text-sm outline-none placeholder:text-slate-400 xl:w-36"
            />
          </div>

          {/* Help */}
          <button
            type="button"
            className="text-slate-500 transition hover:text-[#12293f]"
          >
            <CircleHelp size={19} />
          </button>

          {/* Notifications */}
          <button
            type="button"
            className="relative text-slate-500 transition hover:text-[#12293f]"
          >
            <Bell size={19} />

            <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#7a1f1f] text-[8px] font-bold text-white">
              3
            </span>
          </button>

          {/* User */}
          <div className="flex items-center gap-2.5 border-l border-white/60 pl-4">

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#12293f] text-[11px] font-bold text-white">
              AD
            </div>

            <div className="hidden md:block">
              <p className="text-xs font-semibold text-slate-800">
                Control Officer
              </p>
            </div>

            <ChevronDown
              size={14}
              className="text-slate-400"
            />

          </div>

        </div>
      </div>
    </header>
  );
}

export default Navbar;