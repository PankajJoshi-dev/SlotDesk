import { createContext, useContext, useState } from "react";
import { getMyBookingsRequest, cancelBookingRequest } from "../api/bookingApi";

const MyBookingContext = createContext();

const MyBookingProvider = ({ children }) => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const [filters, setFilters] = useState({});
  const [mybookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cancellingBookingId, setCancellingBookingId] = useState(null);

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
    setCancellingBookingId(bookingId);

    try {
      const res = await cancelBookingRequest(bookingId);

      const cancelledBooking = res?.data;
      setMyBookings((prev) =>
        prev.map((booking) =>
          booking._id === cancelledBooking._id ? cancelledBooking : booking,
        ),
      );

      return res;
    } finally {
      setCancellingBookingId(null);
    }
  }

  return (
    <MyBookingContext.Provider
      value={{
        filters,
        setFilters,
        mybookings,
        setMyBookings,
        loading,
        cancellingBookingId,
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
