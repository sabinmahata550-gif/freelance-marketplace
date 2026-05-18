import User from "../models/User.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";

const getDashboardSummary = async () => {

    // TOTAL USERS
    const totalUsers = await User.countDocuments();

    // TOTAL JOBS
    const totalJobs = await Job.countDocuments();

    // TOTAL APPLICATIONS
    const totalApplications = await Application.countDocuments();

    // AVERAGE BUDGET
    const averageBudgetResult = await Job.aggregate([

        {
            $group: {

                _id: null,

                averageBudget: {
                    $avg: "$budget"
                }

            }
        }

    ]);

    return {

        totalUsers,

        totalJobs,

        totalApplications,
        // averageBudget xa vane deu natra 0 deu
        averageBudget: averageBudgetResult[0]?.averageBudget || 0

    };

};

export default {
    getDashboardSummary
};