import { useBooking } from "../../../../contexts/BookingContext";
import { useFacility } from "../../../../contexts/FacilityContext";

function DateSelector() {
  const { facilityDetails } = useFacility();
  const { bookingDate, setBookingDate, errors } = useBooking();

  const dates = [];

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  // Generate today and the next 6 dates
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }

  const dateCards = dates.map((date, idx) => {
    const day = date.toLocaleDateString("en-IN", {
      weekday: "long",
    });

    // Until facility details arrive, all dates remain disabled
    const isClosed = !facilityDetails?.workingDays?.includes(day);

    const monthDay = date.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    });

    const weekDay =
      idx === 0
        ? "TODAY"
        : date
            .toLocaleDateString("en-IN", {
              weekday: "short",
            })
            .toUpperCase();

    const isSelected =
      !isClosed && bookingDate && date.getTime() === bookingDate.getTime();

    return (
      <button
        key={date.toISOString()}
        onClick={() => setBookingDate(date)}
        disabled={isClosed}
        className={`shrink-0 rounded-xl border p-3 transition-all cursor-pointer
          disabled:bg-muted
          disabled:text-text-muted
          disabled:border-border
          disabled:opacity-50
          disabled:cursor-not-allowed
          ${
            isSelected
              ? errors?.date
                ? "border-red-500 bg-red-500"
                : "bg-primary/20  border-primary"
              : "bg-card hover:bg-card/80"
          }`}
      >
        <p className="text-xs font-semibold">{weekDay}</p>
        <p className="mt-1 text-xs font-bold">{monthDay}</p>
      </button>
    );
  });

  return (
    <div className="space-y-2">
      <h1 className="text-lg font-bold">Select Date</h1>

      <div className="w-full grid grid-cols-4 lg:grid-cols-7 gap-2">
        {dateCards}
      </div>

      {errors?.date && <p className="text-sm text-error">{errors.date}</p>}
    </div>
  );
}

export default DateSelector;
