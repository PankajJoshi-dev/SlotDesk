import * as z from "zod";

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
