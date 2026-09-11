function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconBg = "bg-slate-50",
  iconColor = "text-slate-600",
  accentColor = "#12293f",
  status,
}) {
  return (
    <div className="flex flex-1 items-center gap-3 px-5 py-4 sm:px-6">

      {/* Accent bar */}
      <span
        className="h-9 w-1 shrink-0 rounded-full"
        style={{ backgroundColor: accentColor }}
      />

      {/* Icon */}
      {Icon && (
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
        >
          <Icon size={20} className={iconColor} />
        </div>
      )}

      {/* Text block */}
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </span>

          {status && (
            <span className="hidden items-center rounded-full bg-white/60 px-2 py-0.5 text-[10px] font-semibold text-slate-600 md:inline-flex">
              {status}
            </span>
          )}
        </div>

        <div className="mt-0.5 flex items-baseline gap-2">
          <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            {value}
          </h3>
        </div>

        {description && (
          <p className="truncate text-[11px] text-slate-500">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export default StatCard;