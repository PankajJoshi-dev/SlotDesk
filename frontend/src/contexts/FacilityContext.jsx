import { createContext, useContext, useState } from "react";
import {
  registerFacilityRequest,
  editFacilityRequest,
  deleteFacilityRequest,
  facilityDetailsRequest,
  getFacilityBookingsRequest,
} from "../api/facilityApi";
import { checkInRequest } from "../api/bookingApi";

const FacilityContext = createContext();

const FacilityProvider = ({ children }) => {
  const [facilityDetails, setFacilityDetails] = useState(null);

  const [filters, setFilters] = useState({});
  const [facilityBookings, setFacilityBookings] = useState([]);

  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [checkingIn, setCheckingIn] = useState(false);

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

  async function getFacilityBookings(facilityId, filters) {
    setLoading(true);

    try {
      const res = await getFacilityBookingsRequest(facilityId, filters);
      setFacilityBookings(res?.data ?? []);
      return res;
    } finally {
      setLoading(false);
    }
  }

  async function checkIn(bookingId) {
    setCheckingIn(true);

    try {
      const res = await checkInRequest(bookingId);

      const updatedBooking = res?.data;
      setFacilityBookings((prev) =>
        prev.map((booking) =>
          booking._id === updatedBooking._id ? updatedBooking : booking,
        ),
      );

      return res;
    } finally {
      setCheckingIn(false);
    }
  }

  return (
    <FacilityContext.Provider
      value={{
        facilityDetails,
        setFacilityDetails,
        filters,
        setFilters,
        facilityBookings,
        setFacilityBookings,
        registerFacility,
        getFacilityDetails,
        editFacility,
        deleteFacility,
        getFacilityBookings,
        checkIn,
        loading,
        setLoading,
        deleting,
        setDeleting,
        checkingIn,
        setCheckingIn,
      }}
    >
      {children}
    </FacilityContext.Provider>
  );
};

const useFacility = () => useContext(FacilityContext);

export { FacilityProvider, useFacility };
