import React from "react";
import FacilityDetails from "./components/FacilityDetails";
import BookSlot from "./components/BookSlot";
import { useParams } from "react-router-dom";

function FacilityBooking() {
  const { facilityId } = useParams();
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
      <FacilityDetails facilityId={facilityId} />
      <BookSlot facilityId={facilityId} />
    </div>
  );
}

export default FacilityBooking;
