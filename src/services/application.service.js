import Application from "../models/Application.js";
import Job from "../models/Job.js";
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


const updateApplicationStatus = async (
  applicationId,
  status,
  userId
) => {

  // application find
  const application = await Application.findById(applicationId);

  if (!application) {
    throw new Error("Application not found");
  }

  // job find
  const job = await Job.findById(application.jobId);

  if (!job) {
    throw new Error("Job not found");
  }  
  
  if (job.clientId.toString() !== userId) {
    throw new Error("Access denied");
  }


  // update status
  application.status = status;

  await application.save();

  return application;
};


export default { applyJob, getApplications, updateApplicationStatus };