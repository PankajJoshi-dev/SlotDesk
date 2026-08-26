import { useFacility } from "../../../../contexts/FacilityContext";
import { CalendarDays, Users } from "lucide-react";

function FacilityStats({ loading, activeBookings }) {
  const { facilityDetails } = useFacility();

  const todayBookings = activeBookings.filter((booking) => {
    const today = new Date();
    const bookingDate = new Date(booking.date);
    return today.toDateString() === bookingDate.toDateString();
  });

  const stats = [
    ["Active bookings", loading ? "-" : activeBookings.length, CalendarDays],
    [
      "Today’s guests",
      loading
        ? "-"
        : todayBookings.reduce((sum, booking) => sum + booking.partySize, 0),
      Users,
    ],
    ["Guest capacity", loading ? "-" : facilityDetails?.capacity, Users],
  ];

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-3">
      {stats.map(([label, value, StatIcon]) => (
        <div
          key={label}
          className="rounded-2xl border border-border-light bg-card p-5"
        >
          <div className="flex items-center justify-between text-sm text-text-secondary">
            {label}
            <StatIcon size={18} className="text-primary" />
          </div>
          <p className="mt-3 text-3xl font-semibold">{value}</p>
        </div>
      ))}
    </div>
  );
}

export default FacilityStats;
