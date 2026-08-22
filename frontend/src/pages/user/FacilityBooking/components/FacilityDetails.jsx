import React, { useEffect } from "react";
import { useFacility } from "../../../../contexts/FacilityContext";
import {
  MapPin,
  Building2,
  CircleCheck,
  Users,
  Clock,
  User,
} from "lucide-react";
import formatTime from "../../../../utils/formatTIme";

function FacilityDetails({ facilityId }) {
  const { facilityDetails, getFacilityDetails, loading } = useFacility();

  useEffect(() => {
    getFacilityDetails(facilityId);
  }, [facilityId]);

  if (loading) {
    return <div className="flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="mx-auto w-full max-w-5xl py-5">
      <div className="space-y-5">
        <img
          src={facilityDetails?.facilityImage?.imageUrl}
          alt={facilityDetails?.name}
          className="h-64 w-full rounded-xl border object-cover bg-primary/20"
        />

        <div>
          <h1 className="text-xl font-semibold">{facilityDetails?.name}</h1>

          <div className="flex flex-row items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <p className="text-sm text-text-muted">
              {facilityDetails?.address?.city}
            </p>
          </div>
        </div>

        {/* Facility Details */}
        <div className="text-sm rounded-xl border border-border-light bg-card divide-y divide-border-light">
          <div className="flex items-center gap-2 px-4 py-3">
            <Building2 className="h-4 w-4 text-primary" />
            <h2 className="font-medium">Facility Details</h2>
          </div>

          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <CircleCheck className="h-4 w-4 text-primary " />
              <span>Status</span>
            </div>

            <span
              className={`font-medium px-2 rounded-2xl border ${
                facilityDetails?.isActive
                  ? "text-green-500 border-green-600"
                  : "text-red-500 border-red-600"
              }`}
            >
              {facilityDetails?.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <Users className="h-4 w-4 text-primary " />
              <span>Capacity</span>
            </div>

            <span className="font-medium">
              {facilityDetails?.capacity} people
            </span>
          </div>

          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-primary " />
              <span>Opens</span>
            </div>

            <span className="font-medium">
              {formatTime(facilityDetails?.openingTime)}
            </span>
          </div>

          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-primary " />
              <span>Closes</span>
            </div>

            <span className="font-medium">
              {formatTime(facilityDetails?.closingTime)}
            </span>
          </div>
        </div>

        {/* Owner */}
        <div className="rounded-xl border border-border-light bg-card">
          <div className="flex items-center gap-2 border-b border-border-light px-4 py-3">
            <User className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-medium">Owner</h2>
          </div>

          <div className="space-y-1 px-4 py-4">
            <p className="font-medium">{facilityDetails?.owner?.fullName}</p>

            <p className="break-all text-sm ">
              {facilityDetails?.owner?.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacilityDetails;
