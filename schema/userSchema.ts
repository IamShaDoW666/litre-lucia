import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  profile: z
    .any()
    .refine((file) => file instanceof File, "Image is required.")
    .optional(),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-()]{7,15}$/, {
      message: "Invalid phone number",
    })
    .optional(),
});

export type UserSchema = z.infer<typeof userSchema>;
