import api from "./axios";

// For debugging
const log = (data) => {
  if (import.meta.env.DEV) {
    console.log(data);
  }
};

const registerFacilityRequest = async (facilityData) => {
  const response = await api.post("/facilities", facilityData);
  log(response.data);
  return response.data;
};

const editFacilityRequest = async (facilityId, facilityData) => {
  const response = await api.patch(`/facilities/${facilityId}`, facilityData);
  log(response.data);
  return response.data;
};

const deleteFacilityRequest = async (facilityId) => {
  const response = await api.delete(`/facilities/${facilityId}`);
  log(response.data);
  return response.data;
};

const facilityDetailsRequest = async (facilityId) => {
  const response = await api.get(`/facilities/${facilityId}`);
  log(response.data);
  return response.data;
};

const getFacilityBookingsRequest = async (facilityId) => {
  const response = await api.get(`/facilities/${facilityId}/bookings`);
  log(response.data);
  return response.data;
};

const getSlotsRequest = async (facilityId, date) => {
  const response = await api.get(`/facilities/${facilityId}/slots`, {
    params: {
      date,
    },
  });
  log(response.data);
  return response.data;
};

export {
  registerFacilityRequest,
  editFacilityRequest,
  deleteFacilityRequest,
  facilityDetailsRequest,
  getFacilityBookingsRequest,
  getSlotsRequest,
};
