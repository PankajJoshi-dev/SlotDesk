import React, { useState } from "react";
import { useSearch } from "../../../../contexts/SearchContext";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();

  const { filters, setFilters } = useSearch();
  const [keyWord, setKeyWord] = useState(filters.search ?? "");

  const inputClass = `w-48 sm:w-60 md:w-72 border rounded px-3 py-2 transition-colors outline-none focus:border-white/80 focus:ring-1 focus:ring-white/80 text-text text-sm border-border`;

  const handleSubmit = (e) => {
    e.preventDefault();

    setFilters((prev) => ({
      ...prev,
      search: keyWord.trim(),
    }));

    navigate("/facilities");
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
        placeholder="Search facilities..."
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
