import React from "react";
import { useHome } from "../../../../contexts/HomeContext";
import formatTime from "../../../../utils/formatTIme";

function Schedule() {
  const { todayBookings } = useHome();

  const statusStyles = {
    BOOKED: "bg-green-300 text-green-700 border-green-200",
    TODAY: "bg-orange-300 text-orange-700 border-orange-200",
    COMPLETED: "bg-blue-300 text-blue-700 border-blue-200",
    CANCELLED: "bg-gray-300 text-gray-600 border-gray-200",
  };

  return todayBookings.map((booking) => {
    const time =
      booking?.facility?.openingTime +
      booking?.slotIndex * booking?.facility?.slotDuration;

    return (
      <div
        key={booking._id}
        className="grid grid-cols-[2fr_1fr_1fr] items-center px-6 py-4 border-b border-border hover:bg-border/50 transition-colors"
      >
        <span className="truncate font-medium">{booking?.facility?.name}</span>

        <span className="text-center text-text-muted">{formatTime(time)}</span>

        <div className="flex justify-end">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold border ${statusStyles[booking?.status]}`}
          >
            {booking?.status}
          </span>
        </div>
      </div>
    );
  });
}

export default Schedule;
