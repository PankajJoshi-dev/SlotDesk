import { createContext, useContext, useState } from "react";
import { facilityDetailsRequest } from "../api/facilityApi";

const FacilityContext = createContext();

const FacilityProvider = ({ children }) => {
  const [facilityDetails, setFacilityDetails] = useState(null);

  const [loading, setLoading] = useState(false);

  async function getFacilityDetails(facilityId) {
    setLoading(true);

    try {
      const res = await facilityDetailsRequest(facilityId);
      setFacilityDetails(res.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <FacilityContext
      value={{
        facilityDetails,
        setFacilityDetails,
        getFacilityDetails,
        loading,
        setLoading,
      }}
    >
      {children}
    </FacilityContext>
  );
};

const useFacility = () => useContext(FacilityContext);

export { FacilityProvider, useFacility };
