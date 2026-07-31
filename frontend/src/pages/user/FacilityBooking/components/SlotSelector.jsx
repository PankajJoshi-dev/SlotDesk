import React from "react";
import { useFacility } from "../../../../contexts/FacilityContext";
import { useBooking } from "../../../../contexts/BookingContext";

function SlotSelector() {
  const { facilityDetails, slots } = useFacility();
  const { slotIndex, setSlotIndex } = useBooking();

  const slotCards = slots.map((slot, i) => {
    const startTime = Number(
      facilityDetails?.openingTime + facilityDetails?.slotDuration * i,
    );

    let hours = Math.floor(startTime / 60);
    const mins = String(Math.floor(startTime % 60)).padStart(2, "0");

    const period = hours >= 12 ? "PM" : "AM";
    hours = String(hours % 12).padStart(2, "0");

    const isSelected = slotIndex === i;

    return (
      <button
        key={i}
        onClick={() => setSlotIndex(i)}
        className={`shrink-0 rounded-xl border p-3 transition-all cursor-pointer ${isSelected ? "bg-primary/20 border-primary" : "bg-card hover:bg-card/80"}`}
      >
        {hours} : {mins} {period}
      </button>
    );
  });

  return (
    <>
      <h1 className="text-2xl font-bold">Select Slot</h1>
      <div className="w-full grid grid-cols-4 gap-2">{slotCards}</div>
    </>
  );
}

export default SlotSelector;
