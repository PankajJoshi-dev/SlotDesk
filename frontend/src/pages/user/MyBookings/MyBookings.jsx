import BookingFilters from "./components/BokingFilters";
import BookingList from "./components/BookingList";

function MyBookings() {
  return (
    <div>
      <p className="text-lg font-semibold uppercase tracking-[0.16em] text-primary py-4 text-center">
        Your Bookings
      </p>
      <BookingFilters />
      <BookingList />
    </div>
  );
}

export default MyBookings;
