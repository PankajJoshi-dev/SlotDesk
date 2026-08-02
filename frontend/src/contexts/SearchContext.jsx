import { createContext, useContext, useState, useEffect } from "react";
import {
  filterFacilitiesRequest,
  getAvailableTypes,
  getAvailableLocations,
} from "../api/searchApi";

import { toast } from "sonner";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [filters, setFilters] = useState({});
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchFacilities() {
    setLoading(true);

    try {
      const res = await filterFacilitiesRequest(filters);
      setFacilities(res.data);
    } finally {
      setLoading(false);
    }
  }

  // Call fetchFacilities on mount
  useEffect(() => {
    fetchFacilities();
  }, [filters]);

  return (
    <SearchContext.Provider
      value={{ filters, setFilters, facilities, setFacilities }}
    >
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => useContext(SearchContext);

export { SearchProvider, useSearch };
