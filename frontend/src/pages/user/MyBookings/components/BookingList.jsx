import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { useMyBooking } from "../../../../contexts/MyBookingContext";

import BookingCard from "./BookingCard";

function BookingList() {
  const { bookingId } = useParams();

  const { filters, getMyBookings, loading, mybookings, setMyBookings } =
    useMyBooking();
  const [fetchError, setFetchError] = useState(null);

  // Fetch bookings whenever filters are changed
  useEffect(() => {
    const fetchBookings = async () => {
      setFetchError(null);

      try {
        await getMyBookings();
      } catch (error) {
        const message =
          error.response?.data?.message || "Unable to fetch bookings.";
        setMyBookings([]);
        setFetchError(message);
        toast.error(message);
      }
    };

    fetchBookings();
  }, [filters]);

  // Scroll into view
  useEffect(() => {
    if (!bookingId || !mybookings?.length) return;

    const element = document.getElementById(bookingId);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [bookingId, mybookings]);

  if (loading) {
    return (
      <p className="py-10 text-center text-sm text-text-secondary">
        Loading...
      </p>
    );
  }

  if (fetchError) {
    return (
      <p className="py-10 text-center text-sm text-text-secondary">
        {fetchError}
      </p>
    );
  }

  if (!mybookings?.length) {
    return (
      <p className="py-10 text-center text-sm text-text-secondary">
        {bookingId
          ? "The requested booking was not found."
          : "No bookings found."}
      </p>
    );
  }

  return (
    <div className="mt-4 flex flex-col gap-4">
      {mybookings.map((booking) => {
        const isSelected = booking._id === bookingId;

        return (
          <div
            key={booking._id}
            id={booking._id}
            className={isSelected ? "ring-2 ring-primary rounded-2xl" : ""}
          >
            <BookingCard booking={booking} />
          </div>
        );
      })}
    </div>
  );
}

export default BookingList;
