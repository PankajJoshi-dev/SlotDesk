import { createContext, useContext, useState } from "react";
import {
  registerFacilityRequest,
  editFacilityRequest,
  deleteFacilityRequest,
  facilityDetailsRequest,
  getFacilityBookingsRequest,
} from "../api/facilityApi";

const FacilityContext = createContext();

const FacilityProvider = ({ children }) => {
  const [facilityDetails, setFacilityDetails] = useState(null);
  const [facilityBookings, setFacilityBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function registerFacility(facilityData) {
    setLoading(true);

    try {
      const res = await registerFacilityRequest(facilityData);
      setFacilityDetails(res?.data);
      return res;
    } finally {
      setLoading(false);
    }
  }

  async function getFacilityDetails(facilityId) {
    setLoading(true);

    try {
      const res = await facilityDetailsRequest(facilityId);
      setFacilityDetails(res?.data ?? res);
      return res;
    } finally {
      setLoading(false);
    }
  }

  async function editFacility(facilityId, facilityData) {
    setLoading(true);

    try {
      const res = await editFacilityRequest(facilityId, facilityData);
      setFacilityDetails(res?.data ?? res);
      return res;
    } finally {
      setLoading(false);
    }
  }

  async function deleteFacility(facilityId) {
    setDeleting(true);

    try {
      const res = await deleteFacilityRequest(facilityId);
      setFacilityDetails(null);
      return res;
    } finally {
      setDeleting(false);
    }
  }

  async function getFacilityBookings(facilityId) {
    setLoading(true);

    try {
      const res = await getFacilityBookingsRequest(facilityId);
      setFacilityBookings(res?.data ?? []);
      return res;
    } finally {
      setLoading(false);
    }
  }

  return (
    <FacilityContext.Provider
      value={{
        facilityDetails,
        setFacilityDetails,
        facilityBookings,
        setFacilityBookings,
        registerFacility,
        getFacilityDetails,
        editFacility,
        deleteFacility,
        getFacilityBookings,
        loading,
        setLoading,
        deleting,
        setDeleting,
      }}
    >
      {children}
    </FacilityContext.Provider>
  );
};

const useFacility = () => useContext(FacilityContext);

export { FacilityProvider, useFacility };
