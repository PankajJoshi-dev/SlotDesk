import mongoose from "mongoose";

const facilitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    facilityType: {
      type: String,
      enum: [
        "Sports",
        "Gym",
        "Swimming Pool",
        "Auditorium",
        "Classroom",
        "Laboratory",
        "Library",
        "Meeting Room",
        "Event Hall",
        "Music Room",
        "Dance Studio",
        "Coworking Space",
        "Court",
        "Gaming Room",
        "Medical Facility",
        "Parking",
        "Workspace",
        "Club Room",
        "Multipurpose Hall",
        "Other",
      ],
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
    },

    openingTime: {
      type: Number, // Minutes since midnight
      required: true,
      min: 0,
      max: 1439,
    },

    closingTime: {
      type: Number, // Minutes since midnight
      required: true,
      min: 1,
      max: 1440,
    },

    slotDuration: {
      type: Number, // Minutes
      required: true,
      min: 15,
      default: 60,
    },

    workingDays: {
      type: [
        {
          type: String,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
        },
      ],
      default: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },

    closedDates: [
      {
        type: Date,
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Facility = mongoose.model("Facility", facilitySchema);

export default Facility;
