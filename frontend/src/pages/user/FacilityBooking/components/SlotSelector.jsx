import { useEffect } from "react";
import { useFacility } from "../../../../contexts/FacilityContext";
import { useBooking } from "../../../../contexts/BookingContext";
import formatTime from "../../../../utils/formatTime";

import { LoaderCircle } from "lucide-react";

function SlotSelector() {
  const { facilityDetails } = useFacility();

  const {
    facilityId,
    bookingDate,
    slotIndex,
    setSlotIndex,
    errors,
    loading,
    slots,
    getFacilitySlots,
  } = useBooking();

  // Fetch slots
  useEffect(() => {
    if (!facilityId || !bookingDate) return;

    setSlotIndex(undefined); // Unselect selected slot

    const fetchSlots = async () => getFacilitySlots(facilityId, bookingDate);

    fetchSlots();
  }, [facilityId, bookingDate]);

  const slotCards = slots.map((slot, i) => {
    const startTime = Number(
      facilityDetails?.openingTime + facilityDetails?.slotDuration * i,
    );

    const isAvailable = slot.isAvailable;

    const isSelected = slotIndex === i;

    return (
      <button
        key={i}
        disabled={!isAvailable}
        onClick={() => setSlotIndex(i)}
        className={`shrink-0 rounded-xl border p-3 text-xs font-semibold transition-all
  ${
    isSelected
      ? errors?.slotIndex
        ? "border-red-500 bg-red-500"
        : "bg-primary/20  border-primary"
      : !isAvailable
        ? "bg-muted text-text-muted border-border opacity-50 cursor-not-allowed"
        : "bg-card hover:bg-card/80 border-border cursor-pointer"
  }
`}
      >
        {formatTime(startTime)}
      </button>
    );
  });

  return (
    <div className="space-y-2 ">
      <h1 className="text-lg font-semibold">Select Slot</h1>

      <div className="h-40 lg:h-60 overflow-y-auto">
        {loading ? (
          <LoaderCircle
            size={36}
            className="animate-spin text-text-secondary mx-auto h-6 content-center"
          />
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {slotCards}
          </div>
        )}
      </div>
      {errors?.slotIndex && (
        <p className="text-sm text-error">{errors.slotIndex}</p>
      )}
    </div>
  );
}

export default SlotSelector;
