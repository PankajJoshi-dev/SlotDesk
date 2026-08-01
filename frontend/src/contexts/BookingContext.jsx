import { createContext, useContext, useState, useEffect } from "react";
import { useFacility } from "./FacilityContext";
import { bookingRequest } from "../api/bookingApi";

const BookingContext = createContext();

const BookingProvider = ({ children }) => {
  const { facilityDetails, getFacilitySlots } = useFacility();
  const [bookingDate, setBookingDate] = useState();
  const [slotIndex, setSlotIndex] = useState(0);
  const [partySize, setPartySize] = useState(0);
  const [loading, setLoading] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (!facilityDetails?._id) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    setBookingDate(today);
    getFacilitySlots(facilityDetails._id, today);
    setSlotIndex(0);
    setPartySize(0);
  }, [facilityDetails?._id]);

  useEffect(() => {
    getFacilitySlots(facilityDetails?._id, bookingDate);
  }, [bookingDate]);

  async function bookFacility() {
    const bookingData = {
      date: bookingDate,
      slotIndex: slotIndex,
      partySize: partySize,
    };

    {
      try {
        const res = await bookingRequest(facilityDetails?._id, bookingData);
        setSlots(res.data);
      } catch (error) {}
    }
  }

  return (
    <BookingContext.Provider
      value={{
        bookingDate,
        slotIndex,
        partySize,
        loading,
        setBookingDate,
        setPartySize,
        setSlotIndex,
        setLoading,
        bookFacility,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

const useBooking = () => useContext(BookingContext);

export { BookingProvider, useBooking };
