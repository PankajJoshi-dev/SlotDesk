function DashboardStats({ stats, loading }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(([label, value, icon]) => {
        const Icon = icon;

        return (
          <div
            key={label}
            className="rounded-2xl border border-border-light bg-card p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm text-text-secondary">{label}</p>

              <Icon size={19} className="text-primary" />
            </div>

            <p className="mt-4 text-3xl font-semibold tracking-tight">
              {loading ? "-" : value}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default DashboardStats;
