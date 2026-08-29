import {
  createRazorpayOrderRequest,
  verifyRazorpayPaymentRequest,
} from "../../../../api/paymentApi";
import { toast } from "sonner";

/*
 Note: 
  Outer catch: Handles failure to create the order before the modal opens.
  Inner catch: Handles failure to verify the signature after the user completes the transaction.
*/

function CheckoutButton({ amount = 500, onSuccess }) {
  const handleCheckout = async () => {
    if (!window.Razorpay) {
      toast.error(
        "Payment system is taking longer to load. Check your internet connection and try again.",
      );
      return;
    }

    const orderData = { amount };

    try {
      const res = await createRazorpayOrderRequest(orderData);
      const order = res?.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_API_KEY,
        amount: order.amount,
        currency: order.currency || "INR",
        name: "Slot Booking",
        order_id: order.id,

        handler: async (response) => {
          try {
            const paymentData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: amount, // Rupees
            };

            const verificationResult =
              await verifyRazorpayPaymentRequest(paymentData);

            console.log(verificationResult);

            if (verificationResult.success && onSuccess) {
              onSuccess(verificationResult);
            }
          } catch (error) {
            console.log(error.response);
            toast.error(
              error.response?.data?.message || "Payment verification failed.",
            );
          }
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not initiate order.");
    }
  };

  return (
    <button
      className="w-full sm:w-auto bg-primary hover:bg-primary-hover transition-all duration-200 px-8 py-3 rounded-md font-semibold shadow hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
      onClick={handleCheckout}
    >
      {`Pay ₹${amount}`}
    </button>
  );
}

export default CheckoutButton;
