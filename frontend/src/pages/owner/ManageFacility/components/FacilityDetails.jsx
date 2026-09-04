import { CheckCircle2, Clock3, LoaderCircle } from "lucide-react";
import { useFacility } from "../../../../contexts/FacilityContext";
import formatTime from "../../../../utils/formatTime";

function facilityDetails({ loading }) {
  const { facilityDetails } = useFacility();

  return (
    <section className="overflow-hidden rounded-2xl border border-border-light bg-surface">
      <div className="aspect-16/7 bg-card content-center">
        {loading ? (
          <LoaderCircle
            size={48}
            className="animate-spin text-text-secondary mx-auto"
          />
        ) : (
          <img
            src={facilityDetails?.facilityImage?.imageUrl}
            alt={loading ? "-" : facilityDetails?.name}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-semibold">Facility details</h2>

          <span
            className={`flex items-center gap-1.5 text-xs ${
              facilityDetails?.isActive ? "text-success" : "text-text-muted"
            }`}
          >
            <CheckCircle2 size={15} />
            {loading
              ? "-"
              : facilityDetails?.isActive
                ? "Accepting bookings"
                : "Paused"}
          </span>
        </div>

        <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <p className="text-xs text-text-muted">Category</p>
            <p className="mt-1">{loading ? "-" : facilityDetails?.category}</p>
          </div>

          <div>
            <p className="text-xs text-text-muted">Location</p>
            <p className="mt-1">
              {loading
                ? "-"
                : `${facilityDetails?.address?.city}, ${facilityDetails?.address?.state}`}
            </p>
          </div>

          <div>
            <p className="text-xs text-text-muted">Pin code</p>
            <p className="mt-1">
              {loading ? "-" : facilityDetails?.address?.pinCode}
            </p>
          </div>

          <div>
            <p className="text-xs text-text-muted">Capacity</p>
            <p className="mt-1">
              {loading ? "-" : `${facilityDetails?.capacity} people`}
            </p>
          </div>

          <div>
            <p className="text-xs text-text-muted">Slot duration</p>
            <p className="mt-1">
              {loading ? "-" : `${facilityDetails?.slotDuration} minutes`}
            </p>
          </div>

          <div>
            <p className="text-xs text-text-muted">Price per slot</p>
            <p className="mt-1">
              {loading ? "-" : `₹${facilityDetails?.slotPrice}`}
            </p>
          </div>

          <div className="flex items-start gap-2">
            <Clock3 size={16} className="mt-0.5 text-primary" />

            <div>
              <p className="text-xs text-text-muted">Opening hours</p>
              <p className="mt-1">
                {loading ? "-" : formatTime(facilityDetails?.openingTime)} -{" "}
                {loading ? "-" : formatTime(facilityDetails?.closingTime)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 border-t border-border-light pt-4">
          <p className="text-xs text-text-muted">Working days</p>

          <p className="mt-1 text-sm">
            {loading ? "-" : facilityDetails?.workingDays?.join(" / ")}
          </p>
        </div>
      </div>
    </section>
  );
}

export default facilityDetails;
