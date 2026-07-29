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

  const typePills = facilityTypes.map((type) => (
    <span
      key={type}
      onClick={() => handleClick(type)}
      className="self-start rounded-full bg-primary/20 px-4 py-2 text-xl"
    >
      {type}
    </span>
  ));

  return (
    <div>
      <h1 className="text-2xl font-bold m-4">Categories</h1>
      <div className="flex flex-row justify-start gap-4 m-4">{typePills}</div>
    </div>
  );
}

export default FilterSection;
