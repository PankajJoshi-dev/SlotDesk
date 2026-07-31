import React from "react";
import DateSelector from "./DateSelector";
import SlotSelector from "./SlotSelector";

function BookSlot() {
  return (
    <div className="w-full mx-auto p-6 space-y-6">
      <DateSelector />
      <SlotSelector />
    </div>
  );
}

export default BookSlot;
