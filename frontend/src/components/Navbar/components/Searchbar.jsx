import React, { useState } from "react";
import { useSearch } from "../../../contexts/SearchContext";

function SearchBar() {
  const { filters, setFilters } = useSearch();
  const [keyWord, setKeyWord] = useState(filters.search ?? "");

  const inputClass = `border rounded p-2 transition-colors outline-none   focus:border-white/80 focus:ring-2 focus:ring-white/80`;

  const handleSubmit = (e) => {
    e.preventDefault();

    setFilters((prev) => ({
      ...prev,
      search: keyWord,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row gap-2"
      autoComplete="off"
    >
      <input
        type="search"
        name="search"
        className={inputClass}
        placeholder="Search facilities..."
        value={keyWord}
        onChange={(e) => setKeyWord(e.target.value)}
      />

      <button
        type="submit"
        className="bg-primary transition-colors hover:bg-primary-hover px-3 py-2 rounded-sm font-semibold"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
