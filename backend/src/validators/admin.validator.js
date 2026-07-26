import * as z from "zod";

const getAllUsersSchema = z.object({
  fullName: z
    .string()
    .trim()
    .regex(
      /^[A-Za-z]+(?: [A-Za-z]+)*$/,
      "Name must contain only letters and spaces.",
    )
    .optional(),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email format.")
    .optional(),

  roles: z.enum(["user", "facilityOwner"]).optional(),
});

export { getAllUsersSchema };
