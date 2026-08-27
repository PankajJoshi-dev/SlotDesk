import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSearch } from "../../../../contexts/SearchContext";
import FacilityCard from "./FacilityCard";

function FacilityList() {
  const { filters, facilities, loading, fetchFacilities, setFacilities } =
    useSearch();
  const [fetchError, setFetchError] = useState(null);

  // Fetch facilities whenever the filter changes
  useEffect(() => {
    const loadFacilities = async () => {
      setFetchError(null);

      try {
        await fetchFacilities();
      } catch (error) {
        const message =
          error.response?.data?.message || "Unable to fetch facilities.";
        setFacilities([]);
        setFetchError(message);
        toast.error(message);
      }
    };

    loadFacilities();
  }, [filters]);

  if (loading) {
    return (
      <p className="py-10 text-center text-sm text-text-secondary">
        Loading...
      </p>
    );
  }

  if (fetchError) {
    return (
      <p className="py-10 text-center text-sm text-text-secondary">
        {fetchError}
      </p>
    );
  }

  if (!facilities?.length) {
    return (
      <p className="py-10 text-center text-sm text-text-secondary">
        {filters.search
          ? `No facilities found for "${filters.search}".`
          : "No facilities found."}
      </p>
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
