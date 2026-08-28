import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import DateSelector from "./DateSelector";
import PartySize from "./PartySize";
import SlotSelector from "./SlotSelector";
import CheckoutButton from "./CheckoutButton";

import { useBooking } from "../../../../contexts/BookingContext";
import { toast } from "sonner";

function BookSlot({ facilityId }) {
  const navigate = useNavigate();
  const { bookFacility, setErrors, setFacilityId } = useBooking();

  useEffect(() => {
    setFacilityId(facilityId);
  }, [facilityId]);

  const handleBooking = async () => {
    try {
      await bookFacility();
      toast.success("Booking Confirmed");
    } catch (error) {
      if (error.response?.data?.field == "accessToken") {
        toast.warning("Please Login to continue.");
        navigate("/login");
      }

      const { field, message } = error.response?.data;
      setErrors({
        [field]: message || "Something went wrong.",
      });
    }
  };

  return (
    <div className="w-full py-5 space-y-6">
      <DateSelector />
      <PartySize />
      <SlotSelector />
      <div className="pt-6 mt-6 border-t border-border flex justify-end">
        <CheckoutButton onSuccess={handleBooking} />
      </div>
    </div>
  );
}

export default BookSlot;
