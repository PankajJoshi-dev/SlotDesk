import React from "react";
import { useFacility } from "../../../../contexts/FacilityContext";
import { useBooking } from "../../../../contexts/BookingContext";

function SlotSelector() {
  const { facilityDetails, slots } = useFacility();
  const { slotIndex, setSlotIndex, errors, loading } = useBooking();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        Loading...
      </div>
    );
  }

  const slotCards = slots.map((slot, i) => {
    const startTime = Number(
      facilityDetails?.openingTime + facilityDetails?.slotDuration * i,
    );

    let hours = Math.floor(startTime / 60);
    const mins = String(Math.floor(startTime % 60)).padStart(2, "0");

    const period = hours >= 12 ? "PM" : "AM";
    hours = String(hours % 12).padStart(2, "0");

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
        : "bg-primary/20 text-primary-foreground border-primary"
      : !isAvailable
        ? "bg-muted text-muted-foreground border-border opacity-50 cursor-not-allowed"
        : "bg-card hover:bg-card/80 border-border cursor-pointer"
  }
`}
      >
        {hours}:{mins} {period}
      </button>
    );
  });

  return (
    <div className="space-y-2">
      <h1 className="text-lg font-semibold">Select Slot</h1>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {slotCards}
      </div>

      {errors?.slotIndex && (
        <p className="text-sm text-error">{errors.slotIndex}</p>
      )}
    </div>
  );
}

export default SlotSelector;
