import mongoose from "mongoose";
import { ROLE_ADMIN, ROLE_CLIENT, ROLE_FREELANCER } from "../constants/roles.js";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"],
            trim: true,
        },

        email: {
            type: String,
            required: [true, "email is required"],
            trim: true,
            unique: true,
        },

        password: {
            type: String,
            required: [true, "password is required"],
            trim: true,
        },


        phone: {
            type: String,
            required: [true, "phone number is required"],
            trim: true,
        },

        address: {
            street: {
                type: String,

            },
            province: {
                type: String,
            },
            district: {
                type: String,

            },
            city: {
                type: String,
            },
            country: {
                type: String,
                default: "Nepal"
            }
        },

        roles: {
            type: [String],
            enum: [ROLE_CLIENT, ROLE_FREELANCER,ROLE_ADMIN],
            default: ROLE_FREELANCER,
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;