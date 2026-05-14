import Job from "../models/Job.js";

const createJob = async (data, id) => {
    console.log(id)
  return await Job.create({
    ...data,
    clientId: id,
  });
};

const getAllJobs = async () => {
  return await Job.find().populate("clientId","name email ph roles");
};

const getSingleJob = async (id) => {
  const job = await Job.findById(id).populate("clientId","name email address ph");

  if (!job) {
    throw new Error("Job not found");
  }

  return job;
};

const updateJob = async (id, data) => {
  return await Job.findByIdAndUpdate(id, data, {
    new: true,
  });
};

const deleteJob = async (id) => {
  return await Job.findByIdAndDelete(id);
};

export default {
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
};