import mongoose from "mongoose";
import { STATUS_ACCEPTED, STATUS_COMPLETED, STATUS_PENDING, STATUS_REJECTED } from "../constants/roles.js";

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    proposal: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [STATUS_PENDING, STATUS_ACCEPTED, STATUS_REJECTED],
      default: STATUS_PENDING,
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;