import { createContext, useContext, useState, useEffect } from "react";
import { getMyBookingsRequest } from "../api/bookingApi";

const HomeContext = createContext();

const HomeProvider = ({ children }) => {
  const [todayBookings, setTodayBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getTodayBookings() {
    setLoading(true);

    try {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);

      const res = await getMyBookingsRequest({ date: today });
      setTodayBookings(res.data);
    } finally {
      setLoading(false);
    }
  }

  async function getUpcomingBookings() {
    setLoading(true);

    try {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);

      const res = await getMyBookingsRequest({ status: "BOOKED" });
      setUpcomingBookings(res.data.slice(0, 6)); // Only show at most 6 bookings on HomePage
    } finally {
      setLoading(false);
    }
  }

  return (
    <HomeContext
      value={{
        todayBookings,
        upcomingBookings,
        loading,
        getTodayBookings,
        getUpcomingBookings,
      }}
    >
      {children}
    </HomeContext>
  );
};

const useHome = () => useContext(HomeContext);

export { HomeProvider, useHome };
