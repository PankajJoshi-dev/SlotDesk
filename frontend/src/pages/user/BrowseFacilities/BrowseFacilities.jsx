import React, { useEffect, useState } from "react";
import { useSearch } from "../../../contexts/SearchContext";
import FilterSection from "./components/FilterSection";
import FacilityCard from "./components/FacilityCard";

function BrowseFacilities() {
  const { facilities } = useSearch();

  const facilityCards = facilities.map((facility) => (
    <FacilityCard key={facility._id} facility={facility} />
  ));

  return (
    <>
      <FilterSection />
      <div className="flex flex-row justify-center scroll-auto"></div>
      <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4 p-4">
        {facilityCards}
      </div>
    </>
  );
}

export default BrowseFacilities;
