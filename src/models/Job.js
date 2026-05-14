import mongoose from "mongoose";
import { STATUS_COMPLETED, STATUS_IN_PROGRESS, STATUS_OPEN } from "../constants/roles.js";

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "title is required"],
            trim: true,
        },

        description: {
            type: String,
            required: [true, "description is required"],
            trim: true,
        },

        budget: {
            type: Number,
            required: [true, "budget is required"],
        },

        skills: [
            {
                type: String,
            },
        ],

        status: {
            type: String,
            enum: [STATUS_OPEN, STATUS_IN_PROGRESS, STATUS_COMPLETED],
            default: STATUS_OPEN
        },

        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;