import api from "./axios";

// For debugging
const log = (data) => {
  if (import.meta.env.DEV) {
    console.log(data);
  }
};

const bookingRequest = async (facilityId, bookingData) => {
  const response = await api.post(`/bookings/${facilityId}`, bookingData);
  log(response.data);
  return response.data;
};

export { bookingRequest };
