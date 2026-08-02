import React, { useState } from "react";
import DateSelector from "./DateSelector";
import PartySize from "./PartySize";
import SlotSelector from "./SlotSelector";
import { useBooking } from "../../../../contexts/BookingContext";
import { useFacility } from "../../../../contexts/FacilityContext";
import { toast } from "sonner";

function BookSlot() {
  const { bookFacility, loading, errors, setErrors } = useBooking();

  const handleBooking = async () => {
    try {
      await bookFacility();
      toast.success("Booking Confirmed");
    } catch (error) {
      if (error.response?.data?.field == "accessToken") {
        toast.warning("Please Login to continue.");
      }

      const { field, message } = error.response?.data;
      setErrors({
        [field]: message || "Something went wrong.",
      });
    }
  };

  return (
    <div className="w-full mx-auto p-6 space-y-6">
      <DateSelector />
      <PartySize />
      <SlotSelector />
      <div className="pt-6 mt-6 border-t border-border flex justify-end">
        <button
          className="w-full sm:w-auto bg-primary hover:bg-primary-hover transition-all duration-200 px-8 py-3 rounded-md font-semibold shadow hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
          onClick={handleBooking}
          disabled={loading}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

export default BookSlot;
