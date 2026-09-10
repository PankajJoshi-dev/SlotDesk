import { useEffect, useState } from "react";
import { ArrowLeft, Edit3, MapPin, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useFacility } from "../../../contexts/FacilityContext";
import getFacilityIcon from "../../../utils/FacilityIcons";

import FacilityStats from "./components/FacilityStats";
import RecentBoookings from "./components/RecentBookings";
import FacilityDetails from "./components/FacilityDetails";
import { useAuth } from "../../../contexts/AuthContext";

function ManageFacility() {
  const { checkAuth } = useAuth();
  const { facilityId } = useParams();
  const navigate = useNavigate();
  const {
    facilityDetails,
    facilityBookings,
    getFacilityDetails,
    getFacilityBookings,
    deleteFacility,
    deleting,
  } = useFacility();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFacility() {
      setLoading(true);
      try {
        await Promise.all([
          getFacilityDetails(facilityId),
          getFacilityBookings(facilityId),
        ]);
      } catch {
      } finally {
        setLoading(false);
      }
    }

    loadFacility();
  }, [facilityId]);

  const activeBookings = facilityBookings.filter(
    (booking) => booking.status === "BOOKED",
  );

  const Icon = getFacilityIcon(facilityDetails?.category);

  const handleDelete = async () => {
    if (
      !window.confirm("Delete this facility? This action cannot be undone.")
    ) {
      return;
    }

    try {
      await deleteFacility(facilityId);

      await checkAuth();

      navigate("/owner");
    } catch {
      setError("The facility could not be deleted. Please try again.");
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-border-light py-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
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
        <div className="flex justify-end gap-2 ml-4 sm:shrink-0">
          <Link
            to={`/owner/facilities/${facilityId}/edit`}
            className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-surface"
          >
            <Edit3 size={16} /> Edit
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading || deleting}
            className="flex items-center gap-2 rounded-md border border-red-600/50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-error/10 disabled:opacity-50"
          >
            <Trash2 size={16} /> {deleting ? "Deleting" : "Delete"}
          </button>
        </div>
      </div>

      <FacilityStats activeBookings={activeBookings} loading={loading} />

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <FacilityDetails loading={loading} />
        <RecentBoookings
          facilityId={facilityId}
          activeBookings={activeBookings}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default ManageFacility;
