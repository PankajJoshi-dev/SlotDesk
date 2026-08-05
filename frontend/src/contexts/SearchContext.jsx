import { createContext, useContext, useState } from "react";
import { filterFacilitiesRequest } from "../api/searchApi";

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

  return (
    <SearchContext.Provider
      value={{
        filters,
        setFilters,
        facilities,
        setFacilities,
        fetchFacilities,
        loading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => useContext(SearchContext);

export { SearchProvider, useSearch };
