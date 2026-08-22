import api from "./axios";

// For debugging
const log = (data) => {
  if (import.meta.env.DEV) {
    console.log(data);
  }
};

const filterFacilitiesRequest = async (filters) => {
  const response = await api.get("/facilities", {
    params: filters,
  });
  log(response.data);
  return response.data;
};

const getAvailableCategoriesRequest = async () => {
  const response = await api.get("/facilities/availableCategories");
  log(response.data);
  return response.data;
};

const getAvailableLocationsRequest = async () => {
  const response = await api.get("/facilities/availableLocations");
  log(response.data);
  return response.data;
};

export {
  filterFacilitiesRequest,
  getAvailableCategoriesRequest,
  getAvailableLocationsRequest,
};
