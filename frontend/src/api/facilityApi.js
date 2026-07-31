import api from "./axios";

// For debugging
const log = (data) => {
  if (import.meta.env.DEV) {
    console.log(data);
  }
};

const facilityDetailsRequest = async (facilityId) => {
  const response = await api.get(`/facilities/${facilityId}`);
  log(response.data);
  return response.data;
};

const geteSlotsRequest = async (facilityId, date) => {
  const response = await api.get(`/facilities/${facilityId}/slots`, {
    params: {
      date: date,
    },
  });
  log(response.data);
  return response.data;
};

export { facilityDetailsRequest, geteSlotsRequest };
