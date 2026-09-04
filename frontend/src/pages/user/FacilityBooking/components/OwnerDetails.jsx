import { User } from "lucide-react";
import { useFacility } from "../../../../contexts/FacilityContext";

function OwnerDetails() {
  const { facilityDetails, loading } = useFacility();

  return (
    <div className="flex flex-1 flex-row rounded-xl border border-border-light bg-card">
      <div className="flex items-center gap-2 border-r border-border-light px-4 py-3">
        <User className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-medium">Owner</h2>
      </div>

      <div className="flex flex-1 flex-col justify-center space-y-1 px-4 py-6">
        <p className="font-medium">
          {loading ? "-" : facilityDetails?.owner?.fullName}
        </p>

        <p className="break-all text-sm">
          {loading ? "-" : facilityDetails?.owner?.email}
        </p>
      </div>
    </div>
  );
}

export default OwnerDetails;
