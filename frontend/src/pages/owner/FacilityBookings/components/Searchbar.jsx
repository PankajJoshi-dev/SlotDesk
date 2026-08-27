import { useEffect, useState } from "react";
import { useFacility } from "../../../../contexts/FacilityContext";

function SearchBar() {
  const { filters, setFilters } = useFacility();
  const [keyWord, setKeyWord] = useState("");

  useEffect(() => {
    setKeyWord(filters.bookingId ?? "");
  }, [filters.bookingId]);

  const inputClass = `w-48 sm:w-60 md:w-72 border rounded px-3 py-2 transition-colors outline-none focus:border-white/80 focus:ring-1 focus:ring-white/80 text-text text-sm border-border`;

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingId = keyWord.trim();

    setFilters(() => {
      if (bookingId) {
        return { bookingId: bookingId };
      }
      return { bookingId: undefined };
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="shrink-0 items-center gap-2 space-x-2"
      autoComplete="off"
    >
      <input
        type="search"
        name="search"
        className={inputClass}
        placeholder="Enter BookingId (e.g: BK-A73F92C1)"
        value={keyWord}
        onChange={(e) => setKeyWord(e.target.value)}
      />

      <button
        type="submit"
        className="shrink-0 text-text text-sm rounded-md bg-primary px-3 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
