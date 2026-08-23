import { createContext, useContext, useState, useEffect } from "react";
import { bookingRequest } from "../api/bookingApi";
import { getSlotsRequest } from "../api/facilityApi";
import { useNavigate } from "react-router-dom";

const BookingContext = createContext();

const BookingProvider = ({ children }) => {
  const navigate = useNavigate();

  const [facilityId, setFacilityId] = useState("");

  const [bookingDate, setBookingDate] = useState();
  const [slotIndex, setSlotIndex] = useState();
  const [partySize, setPartySize] = useState(1);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [slots, setSlots] = useState([]);

  // Initialize
  useEffect(() => {
    if (!facilityId) return;

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    setBookingDate(today);
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

    setProcessing(true);
    try {
      const res = await bookingRequest(facilityId, bookingData);
      if (res.success) {
        const booking = res.data;
        setTimeout(() => {
          navigate(`/booking-success`, {
            state: {
              booking: booking,
            },
          });
        }, 400);
      }
    } finally {
      setProcessing(false);
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
        loading,
        setFacilityId,
        setBookingDate,
        setPartySize,
        setSlotIndex,
        setLoading,
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
