import mongoose from "mongoose";

const facilitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    facilityImage: {
      imageUrl: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
        required: true,
      },
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Sports",
        "Fitness",
        "Recreation",
        "Academic",
        "Study",
        "Meeting",
        "Events",
        "Arts",
        "Workspace",
        "Dining",
        "Parking",
        "Other",
      ],
    },

    address: {
      city: {
        type: String,
        required: true,
        trim: true,
      },
      pinCode: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        enum: [
          "Andhra Pradesh",
          "Arunachal Pradesh",
          "Assam",
          "Bihar",
          "Chhattisgarh",
          "Goa",
          "Gujarat",
          "Haryana",
          "Himachal Pradesh",
          "Jharkhand",
          "Karnataka",
          "Kerala",
          "Madhya Pradesh",
          "Maharashtra",
          "Manipur",
          "Meghalaya",
          "Mizoram",
          "Nagaland",
          "Odisha",
          "Punjab",
          "Rajasthan",
          "Sikkim",
          "Tamil Nadu",
          "Telangana",
          "Tripura",
          "Uttar Pradesh",
          "Uttarakhand",
          "West Bengal",
        ],
      },
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
