import FacilityDetails from "./components/FacilityDetails";
import BookSlot from "./components/BookSlot";
import { useParams } from "react-router-dom";
import OwnerDetails from "./components/OwnerDetails";

function FacilityBooking() {
  const { facilityId } = useParams();
  return (
    <>
      <div className="w-full grid grid-cols-1 gap-x-8 gap-y-0 md:grid-cols-2">
        <div>
          <FacilityDetails facilityId={facilityId} />
        </div>

        <div>
          <BookSlot facilityId={facilityId} />
          <OwnerDetails />
        </div>
      </div>
    </>
  );
}

export default FacilityBooking;
