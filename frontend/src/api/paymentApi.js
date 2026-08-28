import api from "./axios";

// For debugging
const log = (data) => {
  if (import.meta.env.DEV) {
    console.log(data);
  }
};

const createRazorpayOrderRequest = async (paymentData) => {
  const response = await api.post("/payments/create-order", paymentData);
  log(response.data);
  return response.data;
};

export { createRazorpayOrderRequest };
