import { createContext, useContext, useState, useEffect } from "react";
import { useFacility } from "./FacilityContext";
import { bookingRequest } from "../api/bookingApi";

const BookingContext = createContext();

const BookingProvider = ({ children }) => {
  const { facilityDetails, getFacilitySlots } = useFacility();
  const [bookingDate, setBookingDate] = useState();
  const [slotIndex, setSlotIndex] = useState();
  const [partySize, setPartySize] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Initialize
  useEffect(() => {
    if (!facilityDetails?._id) return;

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    setBookingDate(today);
    setSlotIndex(undefined);
    setPartySize(1);
    setErrors({});
  }, [facilityDetails?._id]);

  // Fetch slots
  useEffect(() => {
    if (!facilityDetails?._id || !bookingDate) return;

    setSlotIndex(undefined); // Unselect selected slot

    const fetchSlots = async () => {
      setLoading(true);

      try {
        await getFacilitySlots(facilityDetails._id, bookingDate);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [facilityDetails?._id, bookingDate]);

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

    setLoading(true);
    try {
      await bookingRequest(facilityDetails?._id, bookingData);
    } finally {
      setLoading(false);
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
        errors,
        setErrors,
        bookFacility,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

const useBooking = () => useContext(BookingContext);

export { BookingProvider, useBooking };
