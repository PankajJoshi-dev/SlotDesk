import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Send cookies
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response.status;
    if (status === 400 || status === 401) {
      return Promise.reject(error);
    }

    let message = "Something went wrong.";

    if (error.response) {
      message = error.response.data?.message || message;
    } else if (error.request) {
      message = "Couldn't connect to the server.";
    }

    toast.error(message);
    return Promise.reject(error);
  },
);

export default api;
