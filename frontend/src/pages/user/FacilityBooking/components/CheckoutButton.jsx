import {
  createRazorpayOrderRequest,
  verifyRazorpayPaymentRequest,
} from "../../../../api/paymentApi";
import { toast } from "sonner";
import { useBooking } from "../../../../contexts/BookingContext";
import { useFacility } from "../../../../contexts/FacilityContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";

/*
  Note:
  Outer catch: Handles failure while creating the Razorpay order
  before the checkout modal opens.

  Inner catch: Handles failure while sending the completed payment
  details to the backend for verification.
*/

function CheckoutButton({ handleBooking, isVerifying, setIsVerifying }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useAuth();
  const { partySize, isBooking } = useBooking();
  const { facilityDetails } = useFacility();

  const handleCheckout = async (booking) => {
    if (!window.Razorpay) {
      toast.error(
        "Payment system is taking longer to load. Check your internet connection and try again.",
      );
      return;
    }

    const orderData = {
      bookingId: booking._id,
    };

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
            setIsVerifying(true);
            const paymentData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: booking._id,
            };

            const verificationResult =
              await verifyRazorpayPaymentRequest(paymentData);

            if (verificationResult.success) {
              navigate("/booking-success", {
                state: {
                  booking: verificationResult.data?.confirmedBooking,
                },
              });
            }
          } catch (error) {
            toast.error(
              error.response?.data?.message || "Payment verification failed.",
            );
          } finally {
            setIsVerifying(false);
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
      className="w-full sm:w-auto bg-primary hover:bg-primary-hover transition-all duration-200 px-8 py-3 rounded-md font-medium shadow hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
      onClick={async () => {
        if (!user) {
          toast.info("Please log in to continue with your booking.");
          navigate("/login", {
            state: { from: location },
          });
          return;
        }

        const booking = await handleBooking();
        if (!booking) return;

        await handleCheckout(booking);
      }}
      disabled={isBooking || isVerifying}
    >
      {`Pay ₹${facilityDetails?.slotPrice * partySize || "-"}`}
    </button>
  );
}

export default CheckoutButton;
