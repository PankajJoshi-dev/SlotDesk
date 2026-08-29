import axios from "axios";
import api from "./axios";

// For debugging
const log = (data) => {
  if (import.meta.env.DEV) {
    console.log(data);
  }
};

const createRazorpayOrderRequest = async (orderData) => {
  const response = await api.post("/payments/create-order", orderData);
  log(response.data);
  return response.data;
};

const verifyRazorpayPaymentRequest = async (paymentData) => {
  const response = await api.post("payments/verify-payment", paymentData);
  log(response.data);
  return response.data;
};

export { createRazorpayOrderRequest, verifyRazorpayPaymentRequest };
