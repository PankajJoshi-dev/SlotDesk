import api from "./axios";

// For debugging
const log = (data) => {
  if (import.meta.env.DEV) {
    console.log(data);
  }
};

const loginRequest = async (authData) => {
  const response = await api.post("/auth/login", authData);
  log(response.data);
  return response.data;
};

const registerRequest = async (userData) => {
  const response = await api.post("/auth/register", userData);
  log(response.data);
  return response.data;
};

const getUserRequest = async () => {
  const response = await api.get("/auth/getUser", { timeout: 60000 });
  log(response.data);
  return response.data;
};

const logoutRequest = async () => {
  const response = await api.post("/auth/logout");
  log(response.data);
  return response.data;
};

export { loginRequest, registerRequest, getUserRequest, logoutRequest };
