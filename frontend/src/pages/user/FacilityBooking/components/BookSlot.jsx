import { useEffect } from "react";
import DateSelector from "./DateSelector";
import PartySize from "./PartySize";
import SlotSelector from "./SlotSelector";
import CheckoutButton from "./CheckoutButton";

import { useBooking } from "../../../../contexts/BookingContext";

function BookSlot({ facilityId }) {
  const { bookFacility, setErrors, setFacilityId } = useBooking();

  useEffect(() => {
    setFacilityId(facilityId);
  }, [facilityId]);

  const handleBooking = async () => {
    try {
      const booking = await bookFacility();
      return booking;
    } catch (error) {
      const { field, message } = error.response?.data;
      setErrors({
        [field]: message || "Something went wrong.",
      });

      return null;
    }
  };

  return (
    <div className="w-full py-5 space-y-6">
      <DateSelector />
      <PartySize />
      <SlotSelector />

      <div className="pt-4 mt-4 border-t border-border flex justify-end">
        <CheckoutButton handleBooking={handleBooking} />
      </div>
    </div>
  );
}

export default BookSlot;
