import * as z from "zod";
import { dateSchema } from "./common.validator.js";

const CATEGORIES = [
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
];

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const STATES = [
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
];

const facilitySchema = z.object({
  name: z
    .string({ error: "Facility name is required." })
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name is too long.")
    .regex(
      /^[A-Za-z0-9\s-]+$/,
      "Name can contain only letters, numbers, spaces and hyphens.",
    ),

  category: z.enum(CATEGORIES, {
    error: "State is required.",
  }),

  address: z.object(
    {
      city: z
        .string({ error: "City is required." })
        .trim()
        .regex(
          /^[A-Za-z]+(?: [A-Za-z]+)*$/,
          "City name must contain only letters and spaces.",
        ),

      pinCode: z
        .string()
        .length(6, { message: "PIN code must be exactly 6 digits." })
        .regex(/^\d+$/, { message: "PIN code must contain only numbers." }),

      state: z.enum(STATES, {
        error: "State is required.",
      }),
    },
    { error: "Address is required." },
  ),

  capacity: z.coerce
    .number({ error: "Capacity is required." })
    .int("Capacity must be a whole number.")
    .min(1, "Capacity must be at least 1."),

  openingTime: z.coerce
    .number({ error: "Opening time is required." })
    .int()
    .min(0, "Opening time must be between 0 and 1439.")
    .max(1439, "Opening time must be between 0 and 1439."),

  closingTime: z.coerce
    .number({ error: "Closing time is required." })
    .int()
    .min(1, "Closing time must be between 1 and 1440.")
    .max(1440, "Closing time must be between 1 and 1440."),

  slotDuration: z.coerce
    .number({ error: "Slot duration is required." })
    .int()
    .min(15, "Slot duration must be at least 15 minutes.")
    .max(60, "Slot duration cannot exceed 60 minutes."),

  workingDays: z
    .array(z.enum(DAYS))
    .default(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]),

  closedDates: z.array(dateSchema).default([]),

  isActive: z.preprocess((value) => {
    if (value === undefined || value === "") return undefined;
    if (value === "true") return true;
    if (value === "false") return false;
    return value;
  }, z.boolean().default(true)),
});

const createFacilitySchema = facilitySchema.refine(
  (data) => data.closingTime > data.openingTime,
  {
    message: "Closing time must be after opening time.",
    path: ["closingTime"],
  },
);

const editFacilitySchema = facilitySchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update.",
  })
  .refine(
    (data) => {
      if (data.openingTime !== undefined && data.closingTime !== undefined) {
        return data.closingTime > data.openingTime;
      }
      return true;
    },
    {
      message: "Closing time must be after opening time.",
      path: ["closingTime"],
    },
  );

const filterFacilitiesSchema = z.object({
  category: z.enum(CATEGORIES).optional(),

  address: z
    .object(
      {
        city: z
          .string({ error: "City is required." })
          .trim()
          .regex(
            /^[A-Za-z]+(?: [A-Za-z]+)*$/,
            "City name must contain only letters and spaces.",
          ),
      },
      { error: "Address is required." },
    )
    .optional(),
  search: z
    .string({ error: "Search is required." })
    .trim()
    .max(100, "Search is too long.")
    .optional(),
});

const getFacilitySlotsSchema = z.object({
  date: dateSchema,
});

export {
  createFacilitySchema,
  editFacilitySchema,
  filterFacilitiesSchema,
  getFacilitySlotsSchema,
};
