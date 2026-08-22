import { useEffect } from "react";

import { useSearch } from "../../../../contexts/SearchContext";

import FacilityCard from "./FacilityCard";

function FacilityList() {
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {facilities.map((facility) => (
        <FacilityCard key={facility._id} facility={facility} />
      ))}
    </div>
  );
}
export default FacilityList;
