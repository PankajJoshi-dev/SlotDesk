import React, { useEffect } from "react";
import SearchBar from "./components/Searchbar";
import { useSearch } from "../../../contexts/SearchContext";
import FilterSection from "./components/FilterSection";
import FacilityCard from "./components/FacilityCard";

function BrowseFacilities() {
  const { filters, facilities, loading, fetchFacilities } = useSearch();

  // Fetch facilities whenever the filter changes
  useEffect(() => {
    fetchFacilities();
  }, [filters]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        Loading...
      </div>
    );
  }

  const facilityCards = facilities.map((facility) => (
    <FacilityCard key={facility._id} facility={facility} />
  ));

  return (
    <div>
      <div className="flex flex-row justify-center items-center mt-4">
        <SearchBar />
      </div>
      <FilterSection />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {facilityCards}
      </div>
    </div>
  );
}

export default BrowseFacilities;
