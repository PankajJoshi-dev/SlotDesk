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

  role: z.enum(["user", "facilityOwner", "admin"]).optional(),
});

const changeUserRoleSchema = z.object({
  role: z.enum(["user", "facilityOwner", "admin"]),
});

export { getAllUsersSchema, changeUserRoleSchema };
