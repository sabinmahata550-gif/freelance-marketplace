import applicationService from "../services/application.service.js";

const applyJob = async (req, res) => {
  try {

    const application = await applicationService.applyJob(
      req.body.jobId,
      req.user.id,
      req.body.proposal
    );

    res.status(201).json({
      message: "Applied successfully",
      application,
    });

  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};


const getApplications = async (req, res) => {
  try {

    const applications = await applicationService.getApplications(
      req.params.jobId
    );

    res.status(200).json({
      message: "Applications fetched successfully",
      applications,
    });

  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export default { applyJob, getApplications };