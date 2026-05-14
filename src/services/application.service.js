import Application from "../models/Application.js";

const applyJob = async (jobId, freelancerId, proposal) => {

  const existing = await Application.findOne({
    jobId,
    freelancerId,
  });

  if (existing) {
    throw new Error("You have already applied for this job");
  }

  const application = await Application.create({
    jobId,
    freelancerId,
    proposal,
  });

  return application;
};

const getApplications = async (jobId) => {
  return await Application.find({ jobId })
    .populate("freelancerId", "username email roles");
};

export default { applyJob, getApplications };