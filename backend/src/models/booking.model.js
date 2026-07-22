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

    startTime: {
      type: Number, // Minutes since midnight
      required: true,
      min: 0,
      max: 1439,
    },

    endTime: {
      type: Number, // Minutes since midnight
      required: true,
      min: 1,
      max: 1440,
    },

    partySize: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    status: {
      type: String,
      enum: ["BOOKED", "CANCELLED", "COMPLETED", "NO_SHOW"],
      default: "BOOKED",
    },
  },
  {
    timestamps: true,
  },
);

export const Booking = mongoose.model("Booking", bookingSchema);
