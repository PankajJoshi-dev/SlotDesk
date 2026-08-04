import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFacility } from "../../../../contexts/FacilityContext";
import { MapPin } from "lucide-react";
import formatTime from "../../../../utils/formatTIme";

function FacilityDetails() {
  const { facilityId } = useParams();
  const { facilityDetails, getFacilityDetails, loading } = useFacility();

  useEffect(() => {
    getFacilityDetails(facilityId);
  }, [facilityId]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-5">
      <div className="space-y-5">
        <img
          src={facilityDetails?.imageUrl}
          alt={facilityDetails?.name}
          className="h-64 w-full rounded-xl border object-cover bg-primary/20"
        />

        <div>
          <h1 className="text-xl font-semibold">{facilityDetails?.name}</h1>
          <div className="flex flex-row gap-2 items-center content-center">
            <MapPin className="h-4 w-4" />
            <p className="mt-1 text-sm text-muted-foreground">
              {facilityDetails?.address?.city}
            </p>
          </div>
        </div>

        {/* Facility Details */}
        <div className="rounded-xl border border-border/50 bg-card">
          <div className="border-b px-4 py-3">
            <h2 className="text-sm font-medium">Facility Details</h2>
          </div>

          <div className="divide-y text-sm">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-muted-foreground">Status</span>
              <span
                className={`font-medium ${facilityDetails?.isActive ? "text-green-500" : "text-red-500"}`}
              >
                {facilityDetails?.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-muted-foreground">Capacity</span>
              <span className="font-medium">
                {facilityDetails?.capacity} people
              </span>
            </div>

            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-muted-foreground">Opens</span>
              <span className="font-medium">
                {formatTime(facilityDetails?.openingTime)}
              </span>
            </div>

            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-muted-foreground">Closes</span>
              <span className="font-medium">
                {formatTime(facilityDetails?.closingTime)}
              </span>
            </div>
          </div>
        </div>

        {/* Owner */}
        <div className="rounded-xl border border-border/50 bg-card">
          <div className="border-b px-4 py-3">
            <h2 className="text-sm font-medium">Owner</h2>
          </div>

          <div className="space-y-1 px-4 py-4">
            <p className="font-medium">{facilityDetails?.owner?.fullName}</p>

            <p className="text-sm text-muted-foreground break-all">
              {facilityDetails?.owner?.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacilityDetails;
