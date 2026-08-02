import { createContext, useContext, useState, useEffect } from "react";
import { facilityDetailsRequest, geteSlotsRequest } from "../api/facilityApi";

const FacilityContext = createContext();

const FacilityProvider = ({ children }) => {
  const [facilityDetails, setFacilityDetails] = useState(null);

  const [slots, setSlots] = useState([]);

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

  async function getFacilitySlots(facilityId, date) {
    setLoading(true);

    try {
      const res = await geteSlotsRequest(facilityId, date);
      setSlots(res.data);
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
        slots,
        setSlots,
        getFacilitySlots,
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
