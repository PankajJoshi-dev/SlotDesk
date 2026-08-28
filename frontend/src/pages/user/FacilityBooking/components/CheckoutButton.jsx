import { createRazorpayOrderRequest } from "../../../../api/paymentApi";
import { toast } from "sonner";

function CheckoutButton({ amount = 500, onSuccess }) {
  const handleCheckout = async () => {
    if (!window.Razorpay) {
      // If razorpay checkout modal script not loaded.
      toast.error(
        "Payment system is taking longer to load. Check your internet connection and try again.",
      );
      return;
    }

    const paymentData = { amount: amount };

    try {
      const res = await createRazorpayOrderRequest(paymentData);
      const order = res?.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_API_KEY,
        amount: order.amount,
        currency: order.currency || "INR",
        name: "Slot Booking",
        order_id: order.id,

        handler: (response) => {
          // Response tokens captured: razorpay_order_id, razorpay_payment_id, razorpay_signature
          console.log(response);
          toast.success("Payment authorized successfully!");

          if (onSuccess) {
            onSuccess();
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
