import { createContext, useContext, useState, useEffect } from "react";
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
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  }

  // Call fetchFacilities on mount
  useEffect(() => {
    getMyBookings();
  }, [filters]);

  return (
    <MyBookingContext.Provider
      value={{
        filters,
        setFilters,
        mybookings,
        loading,
      }}
    >
      {children}
    </MyBookingContext.Provider>
  );
};

const useMyBooking = () => useContext(MyBookingContext);

export { MyBookingProvider, useMyBooking };
