function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconBg = "bg-slate-50",
  iconColor = "text-slate-600",
  status,
  trend,
}) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      
      {/* Top Header: Title + Icon Badge */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>

        {Icon && (
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconBg}`}
          >
            <Icon size={18} className={iconColor} />
          </div>
        )}
      </div>

      {/* Center Value */}
      <div className="my-3 flex items-baseline gap-2.5">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900">
          {value}
        </h3>

        {status && (
          <span className="inline-flex items-center rounded-md bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-rose-600 ring-1 ring-inset ring-rose-500/20">
            {status}
          </span>
        )}
      </div>

      {/* Bottom Subtext */}
      {description && (
        <p className="text-xs font-normal text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
}

export default StatCard;