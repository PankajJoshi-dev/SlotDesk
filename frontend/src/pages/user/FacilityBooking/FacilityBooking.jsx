import FacilityDetails from "./components/FacilityDetails";
import BookSlot from "./components/BookSlot";
import { useParams } from "react-router-dom";
import OwnerDetails from "./components/OwnerDetails";
import { useState } from "react";
import PaymentVerificationOverlay from "./components/PaymentVerificationOverlay";
import LoadingOverlay from "../../../components/common/LoadingOverlay";

function FacilityBooking() {
  const { facilityId } = useParams();
  const [initializing, setInitializing] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  return (
    <>
      <div className="w-full grid grid-cols-1 gap-x-8 gap-y-0 md:grid-cols-2">
        <div>
          <FacilityDetails facilityId={facilityId} />
        </div>

        <div>
          <BookSlot
            facilityId={facilityId}
            isVerifying={isVerifying}
            setIsVerifying={setIsVerifying}
            initializing={initializing}
            setInitializing={setInitializing}
          />
          <OwnerDetails />
        </div>
      </div>

      {initializing && <LoadingOverlay message={"Initializing pyment...."} />}
      {isVerifying && <PaymentVerificationOverlay />}
    </>
  );
}

export default FacilityBooking;
