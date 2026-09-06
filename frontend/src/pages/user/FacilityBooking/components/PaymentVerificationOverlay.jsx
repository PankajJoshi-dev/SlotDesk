import { Check, LoaderCircle } from "lucide-react";

function PaymentVerificationOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="rounded-xl bg-background p-6 text-center shadow-lg">
        <Check className="mx-auto mb-3 text-green-500" size={24} />
        <p className="font-medium">Payment Received</p>
        <div className="mt-3 flex items-center justify-center gap-2 text-sm text-text-secondary">
          <LoaderCircle className="animate-spin" size={16} />
          <span>Verifying your booking...</span>
        </div>
      </div>
    </div>
  );
}

export default PaymentVerificationOverlay;
