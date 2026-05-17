import z from "zod"
import { emailRejex } from "../../constants/rejex.js";

export const forgotPasswordSchema = z.object({
    email: z
        .string({ error: "Email is required." })
        .regex(emailRejex, { error: "Invalid email address." }),
});

export const resetPasswordSchema = z.object({
    password: z.string(),
    userId: z.string(),
    token: z.string(),
});