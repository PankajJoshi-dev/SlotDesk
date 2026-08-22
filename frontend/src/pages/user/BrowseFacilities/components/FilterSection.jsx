import React, { useEffect, useState } from "react";
import { getAvailableCategoriesRequest } from "../../../../api/searchApi";
import { useSearch } from "../../../../contexts/SearchContext";

function FilterSection() {
  const { filters, setFilters } = useSearch();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchAvailabeCategories = async () => {
      try {
        const res = await getAvailableCategoriesRequest();
        setCategories(res.data);
      } catch (err) {
        // Errors are handled globally
      }
    };

    fetchAvailabeCategories();
  }, []);

  const handleClick = (cat) => {
    setFilters((prev) => ({
      ...prev,
      category: cat,
    }));
  };

  const filterClass = (category) =>
    `self-start shrink-0 rounded-full px-3 py-1 text-md text-text transition-all ${
      filters.category === category
        ? "bg-primary"
        : "bg-primary/20 hover:bg-primary/30 hover:scale-102"
    }`;

  const catPills = categories.map((cat) => (
    <span
      key={cat}
      onClick={() => handleClick(cat)}
      className={filterClass(cat)}
    >
      {cat}
    </span>
  ));

  return (
    <div className="overflow-x-auto p-4 border-b border-border">
      <div className="flex flex-row justify-center-safe content-center gap-4">
        {catPills}
      </div>
    </div>
  );
}

export default FilterSection;
