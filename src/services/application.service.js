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

const getApplications = async (query) => {

  const limit = query.limit?? 10;

  const offset = query.offset?? 0;

  const filters = {};

  let sort = {};

  const { status, jobId } = query;

  // FILTER BY STATUS
  if (status) {

    filters.status = status;
  }

  // FILTER BY JOB
  if (jobId) {

    filters.jobId = jobId;
  }

  // SORT
  if (query.sort === "latest") {
    sort = { createdAt: -1 };
  }

  if (query.sort === "oldest") {
    sort = { createdAt: 1 };
  }

  return await Application.find(filters)
    .sort(sort)
    .limit(limit)
    .skip(offset)
    .populate("freelancerId", "name email roles")
    .populate("jobId", "title budget");
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