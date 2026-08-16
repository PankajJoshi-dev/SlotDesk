import { createContext, useContext, useState } from "react";
import { getMyBookingsRequest, cancelBookingRequest } from "../api/bookingApi";
import { toast } from "sonner";

const MyBookingContext = createContext();

const MyBookingProvider = ({ children }) => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const [filters, setFilters] = useState({ status: "BOOKED" });
  const [mybookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getMyBookings() {
    setLoading(true);

    try {
      const res = await getMyBookingsRequest(filters);
      setMyBookings(res.data);
    } finally {
      setLoading(false);
    }
  }

  async function cancelBooking(bookingId) {
    setLoading(true);

    try {
      const res = await cancelBookingRequest(bookingId);

      if (res.success) {
        await getMyBookings();
        toast.success("Booking Cancelled.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <MyBookingContext.Provider
      value={{
        filters,
        setFilters,
        mybookings,
        loading,
        getMyBookings,
        cancelBooking,
      }}
    >
      {children}
    </MyBookingContext.Provider>
  );
};

const useMyBooking = () => useContext(MyBookingContext);

export { MyBookingProvider, useMyBooking };
