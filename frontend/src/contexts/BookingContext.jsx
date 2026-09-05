import { createContext, useContext, useState, useEffect } from "react";
import { bookingRequest } from "../api/bookingApi";
import { getSlotsRequest } from "../api/facilityApi";

const BookingContext = createContext();

const BookingProvider = ({ children }) => {
  const [facilityId, setFacilityId] = useState("");

  const [bookingDate, setBookingDate] = useState();
  const [slotIndex, setSlotIndex] = useState();
  const [partySize, setPartySize] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [errors, setErrors] = useState({});
  const [slots, setSlots] = useState([]);

  // Initialize
  useEffect(() => {
    if (!facilityId) return;

    setBookingDate("");
    setSlotIndex(undefined);
    setPartySize(1);
    setErrors({});
  }, [facilityId]);

  // Clear errors
  useEffect(() => {
    setErrors((prev) => ({
      ...prev,
      date: "",
      partySize: "",
      slotIndex: "",
    }));
  }, [bookingDate, partySize, slotIndex]);

  async function bookFacility() {
    const bookingData = {
      date: bookingDate,
      slotIndex: slotIndex,
      partySize: partySize,
    };

    setIsBooking(true);
    try {
      const res = await bookingRequest(facilityId, bookingData);
      const booking = res?.data;
      return booking;
    } finally {
      setIsBooking(false);
    }
  }

  async function getFacilitySlots(facilityId, date) {
    setLoading(true);

    try {
      const res = await getSlotsRequest(facilityId, date);
      setSlots(res.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <BookingContext.Provider
      value={{
        facilityId,
        bookingDate,
        slotIndex,
        partySize,
        setFacilityId,
        setBookingDate,
        setPartySize,
        setSlotIndex,
        loading,
        isBooking,
        errors,
        setErrors,
        slots,
        getFacilitySlots,
        bookFacility,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

const useBooking = () => useContext(BookingContext);

export { BookingProvider, useBooking };
