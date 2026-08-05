import { createContext, useContext, useState } from "react";
import { getMyBookingsRequest } from "../api/bookingApi";

const MyBookingContext = createContext();

const MyBookingProvider = ({ children }) => {
  const [filters, setFilters] = useState({});
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

  return (
    <MyBookingContext.Provider
      value={{
        filters,
        setFilters,
        mybookings,
        loading,
        getMyBookings,
      }}
    >
      {children}
    </MyBookingContext.Provider>
  );
};

const useMyBooking = () => useContext(MyBookingContext);

export { MyBookingProvider, useMyBooking };
