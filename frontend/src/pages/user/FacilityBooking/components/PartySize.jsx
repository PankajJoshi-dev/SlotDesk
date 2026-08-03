import React from "react";
import { useBooking } from "../../../../contexts/BookingContext";

function PartySize() {
  const { partySize, setPartySize, errors } = useBooking();

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="partySize" className="font-semibold text-lg">
        Party Size
      </label>

      <input
        type="number"
        id="partySize"
        name="partySize"
        className={`w-24 border rounded p-2 transition-colors outline-none focus:border-white/80 focus:ring-1 focus:ring-white/80 text-text text-sm ${errors?.partySize ? "border-red-500" : "border-border"}`}
        placeholder="Party Size"
        inputMode="numeric"
        max={9999}
        min={0}
        required
        value={partySize}
        onChange={(e) => setPartySize(Number(e.target.value) || 0)}
      />

      {errors?.partySize && (
        <p className="text-sm text-error">{errors.partySize}</p>
      )}
    </div>
  );
}

export default PartySize;
