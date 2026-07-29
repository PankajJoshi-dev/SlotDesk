import React from "react";
import { useNavigate } from "react-router-dom";

function FacilityCard({ facility }) {
  const navigate = useNavigate();

  return (
    <div
      className="flex gap-4 p-3 bg-card rounded-lg shadow-lg"
      onClick={() => navigate(`/facilities/${facility._id}`)}
    >
      <img
        src={facility?.imageUrl}
        alt="Facility"
        className=" w-36 aspect-square rounded-md object-cover shrink-0 bg-primary/20"
      />

      <div className="flex-1 flex flex-col gap-2">
        <h1 className="font-semibold text-xl">{facility?.name}</h1>

        <p className="text-sm text-text-secondary">
          {facility?.centerDistance || "2.4 km"} • {facility?.address?.city}
        </p>

        <div className="flex-1 content-center">
          <span className="self-start rounded-full bg-primary/20 px-2 py-1 text-sm">
            {facility?.facilityType}
          </span>
        </div>
      </div>
    </div>
  );
}

export default FacilityCard;
