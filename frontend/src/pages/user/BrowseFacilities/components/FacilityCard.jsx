import { useNavigate } from "react-router-dom";

function FacilityCard({ facility }) {
  const navigate = useNavigate();

  return (
    <div
      className="h-36 flex flex-row gap-4 p-3 bg-card rounded-lg shadow-lg hover:scale-[1.01] transition-all cursor-pointer"
      onClick={() => navigate(`/facilities/${facility._id}`)}
    >
      <img
        src={facility?.facilityImage?.imageUrl}
        alt="Facility"
        className="h-full aspect-square rounded-md object-cover shrink-0 bg-primary/20"
      />

      <div className="flex-1 min-w-0 flex flex-col">
        <h1 className="text-lg font-semibold text-text line-clamp-2 warp-break">
          {facility?.name}
        </h1>

        <p className="mt-1 text-xs text-text-secondary truncate">
          {facility?.centerDistance || "2.4 km"} • {facility?.address?.city}
        </p>

        <div className="mt-auto">
          <span className="inline-flex rounded-full bg-primary/20 px-2 py-1 text-xs text-text">
            {facility?.category}
          </span>
        </div>
      </div>
    </div>
  );
}

export default FacilityCard;
