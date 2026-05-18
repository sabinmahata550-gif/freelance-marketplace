import Job from "../models/Job.js";

const createJob = async (data, id) => {
  return await Job.create({
    ...data,
    clientId: id,
  });
};

const getAllJobs = async (query) => {
  // -1 decending order and 1 accendingoerder
  const limit = query.limit ?? 10
  const offset = query.offset ?? 0
  const filters = {};
  const { budget, title, min, max } = query;
  let sort = {};
  if (query.sort === "latest") {
    sort = { createdAt: -1 };
  }
  if (query.sort === "oldest") {
    sort = { createdAt: 1 };
  }
  if (title) filters.title = { $regex: title, $options: "i" };
  if (min) filters.budget = { $gte: min }
  if (max) filters.budget = { ...filters.budget, $lte: max }

  return await Job.find(filters)
    .sort(sort).limit(limit).skip(offset)
    .populate("clientId", "name email phone roles");

};
const getSingleJob = async (id) => {
  const job = await Job.findById(id).populate("clientId", "name email address ph");

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

// | `_id` value | Meaning                 |
// | ----------- | ----------------------- |
// | `"$jobId"`  | group by job            |
// | `"$status"` | group by status         |
// | `null`      | all documents one group |

const getAverageBudget = async () => {
  return await Job.aggregate([
// same value haru eutai thau ma rakha
    {
      $group: {

        _id: null,

        averageBudget: {
          $avg: "$budget"
        }

      }
    }

  ]);

};

export default {
  getAverageBudget,
  createJob,
  getAllJobs,
  getSingleJob,
  updateJob,
  deleteJob,
};