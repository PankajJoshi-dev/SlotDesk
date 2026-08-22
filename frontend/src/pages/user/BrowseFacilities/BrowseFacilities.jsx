import React, { useEffect } from "react";
import SearchBar from "./components/Searchbar";
import { useSearch } from "../../../contexts/SearchContext";
import FilterSection from "./components/FilterSection";
import FacilityCard from "./components/FacilityCard";
import FacilityList from "./components/FacilityList";

function BrowseFacilities() {
  return (
    <div>
      <div className="flex flex-row justify-center items-center mt-4">
        <SearchBar />
      </div>
      <FilterSection />
      <FacilityList />
    </div>
  );
}

export default BrowseFacilities;
