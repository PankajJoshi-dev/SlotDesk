import * as z from "zod";

const registerSchema = z.object({
  fullName: z
    .string({ error: "Full Name is required." })
    .trim()
    .min(2, "Name must be atleast 2 characters.")
    .max(30, "Name too long.")
    .regex(
      /^[A-Za-z]+(?: [A-Za-z]+)*$/,
      "Name must contain only letters and spaces.",
    ),
  email: z
    .string({ error: "Email is required." })
    .trim()
    .toLowerCase()
    .email("Invalid email format."),
  address: z.object(
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
  ),
  password: z
    .string({ error: "Password is required." })
    .trim()
    .min(6, "Password must be at least 6 characters."),
  confirmPassword: z
    .string({ error: "Please confirm your password." })
    .trim()
    .min(6, "Confirmed password must be at least 6 characters."),
});

const loginSchema = z.object({
  email: z.string({ error: "Email is required." }).email("Invalid email."),
  password: z.string({ error: "Password is required." }),
});
export { registerSchema, loginSchema };
