import { useEffect, useState } from "react";
import { CalendarDays, CheckCircle, Clock3, Users2 } from "lucide-react";

import { useAuth } from "../../../contexts/AuthContext";
import {
  getMyFacilityRequest,
  getAllFacilityBookingsRequest,
} from "../../../api/facilityApi";
import formatDate from "../../../utils/formatDate";
import formatTime from "../../../utils/formatTIme";

import DashboardStats from "./components/DashboardStats";
import FacilitiesOverview from "./components/FacilitesOverview";
import UpcomingBookings from "./components/UpcomingBookings";

const getDayStart = (date = new Date()) => {
  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  return dayStart;
};

const isToday = (date) =>
  getDayStart(date).getTime() === getDayStart().getTime();

const getBookingTime = (booking) => {
  const facility = booking.facility;

  if (!facility) return "Time unavailable";

  return formatTime(
    facility.openingTime + booking.slotIndex * facility.slotDuration,
  );
};

function Dashboard() {
  const { user } = useAuth();

  const [facilities, setFacilities] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);

      try {
        const facilitiesRes = await getMyFacilityRequest();
        setFacilities(facilitiesRes.data);

        const bookingsRes = await getAllFacilityBookingsRequest();
        setBookings(bookingsRes.data);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const bookedBookings = bookings.filter(
    (booking) => booking.status === "BOOKED",
  );

  const todaysBookings = bookedBookings.filter((booking) =>
    isToday(booking.date),
  );

  const upcomingBookings = bookedBookings
    .filter((booking) => getDayStart(booking.date) >= getDayStart())
    .sort((first, second) => new Date(first.date) - new Date(second.date))
    .slice(0, 5);

  const totalGuestsToday = todaysBookings.reduce(
    (total, booking) => total + booking.partySize,
    0,
  );

  const stats = [
    ["Today's bookings", todaysBookings.length, CalendarDays],
    ["Guests today", totalGuestsToday, Users2],
    ["Upcoming bookings", upcomingBookings.length, Clock3],
    [
      "Active facilities",
      facilities.filter((facility) => facility.isActive).length,
      CheckCircle,
    ],
  ];

  return (
    <div className="pb-12">
      <div className="flex flex-col justify-between gap-3 border-b border-border-light py-8 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Hi, {user?.fullName?.split(" ")[0] ?? "there"}
          </h1>

          <p className="mt-1 text-sm text-text-secondary">
            Here's what's happening across your facilities today.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <CalendarDays size={16} className="text-primary" />
          <span>{formatDate(new Date())}</span>
        </div>
      </div>

      <DashboardStats stats={stats} loading={loading} />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <UpcomingBookings
          bookings={upcomingBookings}
          loading={loading}
          isToday={isToday}
          getBookingTime={getBookingTime}
        />

        <FacilitiesOverview facilities={facilities} loading={loading} />
      </div>
    </div>
  );
}

export default Dashboard;
