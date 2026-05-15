import z from "zod"
import { emailRejex, passwordRegex } from "../../constants/rejex.js";
import { userSchema } from "./user.schema.js";

export const loginSchema = z.object({
    email: z.string({ error: "Email is required" })
        .regex(emailRejex, { error: "Invalid email address" }).optional(),
    phone: z.string().optional(),

    password: z.string({ error: "Password is required" })
})
    .refine(data => data.email || data.phone, {
        message: "Either email or phone is required",
        path: ["email", "phone"], 
    });


export const registerSchema = userSchema;
