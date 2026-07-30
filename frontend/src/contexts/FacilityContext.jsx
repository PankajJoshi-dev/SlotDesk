import { createContext, useContext, useState, useEffect } from "react";
import { facilityDetailsRequest } from "../api/facilityApi";

const FacilityContext = createContext();

const FacilityProvider = ({ children }) => {
  const [facilityDetails, setFacilityDetails] = useState(null);

  async function getFacilityDetails(facilityId) {
    try {
      const res = await facilityDetailsRequest(facilityId);
      setFacilityDetails(res.data);
    } catch (error) {}
  }

  return (
    <FacilityContext
      value={{
        facilityDetails,
        setFacilityDetails,
        getFacilityDetails,
      }}
    >
      {children}
    </FacilityContext>
  );
};

const useFacility = () => useContext(FacilityContext);

export { FacilityProvider, useFacility };
