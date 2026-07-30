import React from "react";

function InfoCard({ title, value }) {
  return (
    <div className="bg-card rounded-lg border p-4">
      <p className="text-sm">{title}</p>
      <p className="text-lg font-semibold mt-1">{value}</p>
    </div>
  );
}

export default InfoCard;
