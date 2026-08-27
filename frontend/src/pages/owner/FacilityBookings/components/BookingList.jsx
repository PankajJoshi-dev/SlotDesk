import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useFacility } from "../../../../contexts/FacilityContext";
import BookingCard from "./BookingCard";

function BookingList() {
  const { facilityId } = useParams();

  const {
    filters,
    getFacilityBookings,
    loading,
    facilityBookings,
    setFacilityBookings,
  } = useFacility();
  const [fetchError, setFetchError] = useState(null);

  // Fetch bookings whenever facility or filters change
  useEffect(() => {
    const fetchBookings = async () => {
      setFetchError(null);

      try {
        await getFacilityBookings(facilityId, filters);
      } catch (error) {
        const message =
          error.response?.data?.message || "Unable to fetch bookings.";
        setFacilityBookings([]);
        setFetchError(message);
        toast.error(message);
      }
    };

    fetchBookings();
  }, [facilityId, filters]);

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

  if (!facilityBookings?.length) {
    return (
      <p className="py-10 text-center text-sm text-text-secondary">
        {filters.bookingId
          ? `No booking found for ${filters.bookingId}.`
          : "No bookings found."}
      </p>
    );
  }

  return (
    <div className="mt-4 flex flex-col gap-4">
      {facilityBookings.map((booking) => (
        <div key={booking._id} id={booking._id}>
          <BookingCard booking={booking} />
        </div>
      ))}
    </div>
  );
}

export default BookingList;
