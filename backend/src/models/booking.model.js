import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    facility: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Facility",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    slotIndex: {
      type: Number,
      required: true,
    },

    partySize: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    status: {
      type: String,
      enum: ["BOOKED", "CANCELLED", "COMPLETED"],
      default: "BOOKED",
    },
  },
  {
    timestamps: true,
  },
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
