import jobService from "../services/job.service.js";

const createJob = async (req, res) => {
  try {
    const job = await jobService.createJob(
      req.body,
      req.user.id
    );

    res.status(201).json({
      message: "Job created successfully",
      job,
    });

  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await jobService.getAllJobs(req.query);

    res.status(200).json({
      message: "All jobs fetched successfully",
      jobs,
    });

  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getSingleJob= async (req, res) => {
  try {
    const job = await jobService.getSingleJob(req.params.id);

    res.status(200).json({
      message: "jobs fetched successfully",
      job,
    });

  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const updateJob = async (req, res) => {
  try {
    const job = await jobService.updateJob(
      req.params.id,
      req.body
    );

    res.status(200).json({
      message: "Job updated successfully",
      job,
    });

  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    await jobService.deleteJob(req.params.id);

    res.status(200).json({
      message: "Job deleted successfully",
    });

  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getAverageBudget =async (req, res) => {
 try {

    const averageBudget = await jobService.getAverageBudget();

    res.status(200).json({
      averageBudget,
    });

  } catch (error) {

    res.status(400).json({
      error: error.message,
    });

  }

};

export default {
  getAverageBudget,
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
};