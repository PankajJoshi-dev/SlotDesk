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

const getMyBookingsRequest = async (filters) => {
  const response = await api.get(`/bookings/me`, {
    params: filters,
  });
  log(response.data);
  return response.data;
};

const getSingleBookingRequest = async (bookingId) => {
  const response = await api.get(`/bookings/${bookingId}`);
  log(response.data);
  return response.data;
};

const cancelBookingRequest = async (bookingId) => {
  const response = await api.patch(`/bookings/${bookingId}`);
  log(response.data);
  return response.data;
};

export {
  bookingRequest,
  getMyBookingsRequest,
  getSingleBookingRequest,
  cancelBookingRequest,
};
