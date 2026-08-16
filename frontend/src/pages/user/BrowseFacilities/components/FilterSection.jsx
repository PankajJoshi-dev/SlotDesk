import React, { useEffect, useState } from "react";
import { getAvailableTypes } from "../../../../api/searchApi";
import { useSearch } from "../../../../contexts/SearchContext";

function FilterSection() {
  const { filters, setFilters } = useSearch();

  const [facilityTypes, setFacilityTypes] = useState([]);

  useEffect(() => {
    const fetchAvailabeTypes = async () => {
      try {
        const res = await getAvailableTypes();
        setFacilityTypes(res.data);
      } catch (err) {
        // Errors are handled globally
      }
    };

    fetchAvailabeTypes();
  }, []);

  const handleClick = (type) => {
    setFilters((prev) => ({
      ...prev,
      facilityType: type,
    }));
  };

  const filterClass = (facilityType) =>
    `self-start shrink-0 rounded-full px-3 py-1 text-md text-text transition-all ${
      filters.facilityType === facilityType
        ? "bg-primary"
        : "bg-primary/20 hover:bg-primary/30 hover:scale-102"
    }`;

  const typePills = facilityTypes.map((type) => (
    <span
      key={type}
      onClick={() => handleClick(type)}
      className={filterClass(type)}
    >
      {type}
    </span>
  ));

  return (
    <div className="overflow-x-auto p-4 border-b border-border">
      <div className="flex flex-row justify-start content-center gap-4">
        {typePills}
      </div>
    </div>
  );
}

export default FilterSection;
