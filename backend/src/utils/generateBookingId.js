import crypto from "crypto";

const generateBookingId = () => {
  const randomPart = crypto.randomBytes(4).toString("hex").toUpperCase();
  return `BK-${randomPart}`;
};

export default generateBookingId;
