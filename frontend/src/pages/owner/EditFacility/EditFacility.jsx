import EditFacilityForm from "./EditFacilityForm";
import getFacilityIcon from "../../../utils/FacilityIcons";
import { useFacility } from "../../../contexts/FacilityContext";
import { ArrowLeft, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function EditFacility() {
  const { facilityId } = useParams();

  const { facilityDetails, loading } = useFacility();

  const Icon = getFacilityIcon(facilityDetails?.category);

  return (
    <div>
      <div className="flex min-w-0 items-start gap-3 py-6 border-b border-border-light">
        <Link
          to="/owner"
          className="mt-1 rounded-md p-1.5 text-text-secondary hover:bg-surface hover:text-text"
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={19} />
        </Link>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Icon size={20} className="shrink-0 text-primary" />
            <h1 className="truncate text-2xl font-semibold">
              {loading ? "-" : facilityDetails?.name}
            </h1>
          </div>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-text-secondary">
            <MapPin size={15} />
            {loading ? "-" : facilityDetails?.address.city},{" "}
            {loading ? "-" : facilityDetails?.address.state}
          </p>
        </div>
      </div>
      <EditFacilityForm facilityId={facilityId} />
    </div>
  );
}

export default EditFacility;
