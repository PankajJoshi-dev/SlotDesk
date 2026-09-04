import { useEffect } from "react";
import { useFacility } from "../../../../contexts/FacilityContext";
import {
  MapPin,
  Building2,
  CircleCheck,
  Users,
  Clock,
  User,
  LoaderCircle,
} from "lucide-react";
import formatTime from "../../../../utils/formatTime";
import getFacilityIcon from "../../../../utils/FacilityIcons";

function FacilityDetails({ facilityId }) {
  const { facilityDetails, getFacilityDetails, loading } = useFacility();

  useEffect(() => {
    getFacilityDetails(facilityId);
  }, [facilityId]);

  const Icon = getFacilityIcon(facilityDetails?.category);

  return (
    <div className="mx-auto w-full max-w-5xl py-5">
      <div className="space-y-5">
        <div className="aspect-16/7 bg-card content-center rounded-2xl">
          {loading ? (
            <LoaderCircle
              size={48}
              className="animate-spin text-text-secondary mx-auto"
            />
          ) : (
            <img
              src={facilityDetails?.facilityImage?.imageUrl}
              alt={loading ? "-" : facilityDetails?.name}
              className="h-full w-full object-cover rounded-2xl"
            />
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <Icon size={20} className="shrink-0 text-primary" />
            <h1 className="truncate text-2xl font-semibold">
              {loading ? "-" : facilityDetails?.name}
            </h1>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-text-muted" />
            <p className="text-sm text-text-muted">
              {`${loading ? "-" : facilityDetails?.address?.city}, ${loading ? "-" : facilityDetails?.address?.state}`}
            </p>
          </div>
        </div>

        <div className="text-sm rounded-xl border border-border-light bg-card divide-y divide-border-light">
          <div className="flex items-center gap-2 px-4 py-3">
            <Building2 className="h-4 w-4 text-primary" />
            <h2 className="font-medium">Facility Details</h2>
          </div>

          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <CircleCheck className="h-4 w-4 text-primary" />
              <span>Status</span>
            </div>

            <span
              className={`font-medium px-2 rounded-2xl border ${
                facilityDetails?.isActive
                  ? "text-green-500 border-green-600"
                  : "text-red-500 border-red-600"
              }`}
            >
              {loading
                ? "-"
                : facilityDetails?.isActive
                  ? "Active"
                  : "Inactive"}
            </span>
          </div>

          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <Users className="h-4 w-4 text-primary" />
              <span>Capacity</span>
            </div>

            <span className="font-medium">
              {loading ? "-" : facilityDetails?.capacity} people
            </span>
          </div>

          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-primary" />
              <span>Slot Duration</span>
            </div>

            <span className="font-medium">
              {loading ? "-" : facilityDetails?.slotDuration} minutes
            </span>
          </div>

          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-primary" />
              <span>Price per Slot</span>
            </div>

            <span className="font-medium">
              ₹{loading ? "-" : facilityDetails?.slotPrice}
            </span>
          </div>

          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-primary" />
              <span>Opens</span>
            </div>

            <span className="font-medium">
              {loading ? "-" : formatTime(facilityDetails?.openingTime)}
            </span>
          </div>

          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-primary" />
              <span>Closes</span>
            </div>

            <span className="font-medium">
              {loading ? "-" : formatTime(facilityDetails?.closingTime)}
            </span>
          </div>

          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <Building2 className="h-4 w-4 text-primary" />
              <span>Category</span>
            </div>

            <span className="font-medium">
              {loading ? "-" : facilityDetails?.category}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 px-4 py-3">
            <div className="flex items-center gap-3 shrink-0">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Address</span>
            </div>

            <span className="font-medium text-right">
              {loading
                ? "-"
                : `${facilityDetails?.address?.city}, ${facilityDetails?.address?.state} - ${facilityDetails?.address?.pinCode}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacilityDetails;
