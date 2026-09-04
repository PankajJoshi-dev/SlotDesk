import { useNavigate } from "react-router-dom";
import { MapPin, ArrowUpRight } from "lucide-react";

function FacilityCard({ facility }) {
  const navigate = useNavigate();

  return (
    <div
      className="h-36 flex flex-row gap-4 p-3 bg-card rounded-2xl shadow-lg hover:scale-[1.01] transition-all cursor-pointer"
      onClick={() => navigate(`/facilities/${facility._id}`)}
    >
      <img
        src={facility?.facilityImage?.imageUrl}
        alt="Facility-Image"
        className="h-full aspect-square rounded-md object-cover shrink-0 bg-primary/20"
      />

      <div className="flex-1 min-w-0 flex flex-col group transition-all">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-lg font-semibold text-text line-clamp-2">
            {facility?.name}
          </h2>

          <ArrowUpRight
            size={18}
            className="shrink-0 text-text-secondary opacity-0 group-hover:opacity-100 transition-all"
          />
        </div>

        <p className="mt-1 flex items-center gap-1 text-xs text-text-secondary truncate">
          <MapPin size={14} />
          {facility?.address?.city}
        </p>

        <div className="mt-auto">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-2 py-1 text-xs text-text">
            {facility?.category}
          </span>
        </div>
      </div>
    </div>
  );
}

export default FacilityCard;
