import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFacility } from "../../../../contexts/FacilityContext";
import InfoCard from "./InfoCard.jsx";

function FacilityDetails() {
  const { facilityId } = useParams();
  const { facilityDetails, getFacilityDetails, loading } = useFacility();

  useEffect(() => {
    getFacilityDetails(facilityId);
  }, [facilityId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-6">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <img
            src={facilityDetails?.imageUrl}
            alt={facilityDetails?.name}
            className="w-full aspect-video object-cover rounded-xl shadow-lg bg-primary/20"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{facilityDetails?.name}</h1>

            <p className="text-muted-foreground mt-1">
              {facilityDetails?.address?.city}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InfoCard
              title="Status"
              value={facilityDetails?.isActive ? "Active" : "Inactive"}
            />

            <InfoCard
              title="Capacity"
              value={`${facilityDetails?.capacity} people`}
            />

            <InfoCard title="Opens" value={facilityDetails?.openingTime} />

            <InfoCard title="Closes" value={facilityDetails?.closingTime} />
          </div>

          <div className="bg-card rounded-xl p-5 border">
            <h2 className="font-semibold text-lg mb-3">Facility Owner</h2>

            <div className="space-y-2">
              <p>
                <span className="font-medium">Name:</span>{" "}
                {facilityDetails?.owner?.fullName}
              </p>

              <p>
                <span className="font-medium">Email:</span>{" "}
                {facilityDetails?.owner?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacilityDetails;
