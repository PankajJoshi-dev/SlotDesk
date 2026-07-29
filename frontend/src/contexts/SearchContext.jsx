import { createContext, useContext, useState, useEffect } from "react";
import {
  filterFacilitiesRequest,
  getAvailableTypes,
  getAvailableLocations,
} from "../api/searchApi";

import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({});
  const [facilities, setFacilities] = useState([]);

  async function fetchFacilities() {
    try {
      const res = await filterFacilitiesRequest(filters);
      setFacilities(res.data);
      navigate("/facilities");
    } catch (err) {
      // Errors are handled globally
      console.log(err.response);
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
