import * as z from "zod";

const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .nonempty("Name is required.")
    .min(2, "Name must be atleast 2 characters.")
    .max(30, "Name too long.")
    .regex(
      /^[A-Za-z]+(?: [A-Za-z]+)*$/,
      "Name must contain only letters and spaces.",
    ),
  email: z
    .string()
    .trim()
    .nonempty("Email is required")
    .toLowerCase()
    .email("Invalid email format."),
  password: z
    .string()
    .trim()
    .nonempty("Password is required.")
    .min(6, "Password must be at least 6 characters."),
  confirmPassword: z
    .string()
    .trim()
    .nonempty("Please confirm the password")
    .min(6, "Confirmed password must be at least 6 characters."),
});

const loginSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email."),
  password: z.string().nonempty("Password is required."),
});
export { registerSchema, loginSchema };
