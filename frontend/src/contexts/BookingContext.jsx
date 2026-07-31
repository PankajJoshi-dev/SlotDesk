import { createContext, useContext, useState, useEffect } from "react";
import { useFacility } from "./FacilityContext";

const BookingContext = createContext();

const BookingProvider = ({ children }) => {
  const { facilityDetails, getFacilitySlots } = useFacility();
  const [bookingDate, setBookingDate] = useState();
  const [slotIndex, setSlotIndex] = useState(0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (!facilityDetails?._id) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    setBookingDate(today);
    getFacilitySlots(facilityDetails._id, today);
    setSlotIndex(0);
  }, [facilityDetails?._id]);

  useEffect(() => {
    getFacilitySlots(facilityDetails?._id, bookingDate);
  }, [bookingDate]);

  return (
    <BookingContext.Provider
      value={{
        bookingDate,
        slotIndex,
        setBookingDate,
        setPartySize,
        setSlotIndex,
        setLoading,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

const useBooking = () => useContext(BookingContext);

export { BookingProvider, useBooking };
