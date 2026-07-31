import React from "react";
import FacilityDetails from "./components/FacilityDetails";
import BookSlot from "./components/BookSlot";

function FacilityBooking() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2">
      <FacilityDetails />
      <BookSlot />
    </div>
  );
}

export default FacilityBooking;
