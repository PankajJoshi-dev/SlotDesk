import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

function FacilitiesOverview({ facilities, loading }) {
  return (
    <section className="rounded-2xl border border-border-light bg-surface max-h-108 overflow-y-auto">
      <div className="border-b border-border-light px-5 py-4">
        <div>
          <h2 className="font-semibold">Your facilities</h2>
        </div>
      </div>

      {loading ? (
        <p className="px-5 py-10 text-center text-sm text-text-secondary">
          Loading facilities...
        </p>
      ) : facilities.length === 0 ? (
        <div className="px-5 py-10 text-center">
          <p className="text-sm text-text-secondary">
            You have no facilities yet.
          </p>

          <Link
            to="/register-facility"
            className="mt-3 inline-block text-sm font-medium text-primary hover:text-primary-hover"
          >
            Register a facility
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-border-light">
          {facilities.map((facility) => (
            <Link
              key={facility._id}
              to={`/owner/facilities/${facility._id}`}
              className="flex items-center justify-between gap-3 px-5 py-4 transition-colors hover:bg-card"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{facility.name}</p>

                <p className="mt-1 flex items-center gap-1 text-xs text-text-secondary">
                  <MapPin size={13} />
                  {facility.address?.city ?? "Location unavailable"}
                </p>
              </div>

              <span
                className={`shrink-0 text-xs ${
                  facility.isActive ? "text-success" : "text-text-muted"
                }`}
              >
                {facility.isActive ? "Active" : "Paused"}
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default FacilitiesOverview;
