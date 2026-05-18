import adminService from "../services/admin.service.js";

const getDashboardSummary =async (req, res) => {

  try {

    const summary =await adminService.getDashboardSummary();

    res.status(200).json({
      summary,
    });

  } catch (error) {

    res.status(400).json({
      error: error.message,
    });

  }

};

export default {
  getDashboardSummary
};