import * as z from "zod";

const FACILITY_TYPES = [
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

const facilitySchema = z.object({
  ownerEmail: z
    .string({ error: "Owner email is required." })
    .trim()
    .toLowerCase()
    .email("Invalid email format."),

  name: z
    .string({ error: "Facility name is required." })
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name is too long.")
    .regex(
      /^[A-Za-z0-9\s-]+$/,
      "Name can contain only letters, numbers, spaces and hyphens.",
    ),

  facilityType: z.enum(FACILITY_TYPES, {
    error: "Facility type is required.",
  }),

  location: z
    .string({ error: "Location is required." })
    .trim()
    .min(2, "Location must be at least 2 characters."),

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

  closedDates: z.array(z.coerce.date()).default([]),

  isActive: z.coerce.boolean().default(true).optional(),
});

const createFacilitySchema = facilitySchema.refine(
  (data) => data.closingTime > data.openingTime,
  {
    message: "Closing time must be after opening time.",
    path: ["closingTime"],
  },
);

const editFacilitySchema = facilitySchema
  .omit({
    ownerEmail: true,
  })
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

export { createFacilitySchema, editFacilitySchema };
