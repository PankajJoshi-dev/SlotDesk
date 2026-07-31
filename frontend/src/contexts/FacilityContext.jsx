import { createContext, useContext, useState, useEffect } from "react";
import { facilityDetailsRequest, geteSlotsRequest } from "../api/facilityApi";

const FacilityContext = createContext();

const FacilityProvider = ({ children }) => {
  const [facilityDetails, setFacilityDetails] = useState(null);

  const [slots, setSlots] = useState([]);

  async function getFacilityDetails(facilityId) {
    try {
      const res = await facilityDetailsRequest(facilityId);
      setFacilityDetails(res.data);
    } catch (error) {}
  }

  async function getFacilitySlots(facilityId, date) {
    try {
      const res = await geteSlotsRequest(facilityId, date);
      setSlots(res.data);
    } catch (error) {}
  }

  return (
    <FacilityContext
      value={{
        facilityDetails,
        setFacilityDetails,
        getFacilityDetails,
        slots,
        setSlots,
        getFacilitySlots,
      }}
    >
      {children}
    </FacilityContext>
  );
};

const useFacility = () => useContext(FacilityContext);

export { FacilityProvider, useFacility };
