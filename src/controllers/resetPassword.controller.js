import resetPasswordServices from "../services/resetPassword.services.js";

// FORGOT PASSWORD
const forgotPassword = async (req, res) => {

    try {

        const data =await resetPasswordServices.forgotPassword(req.body.email);

        res.status(200).json(
            data,
        );

    } catch (error) {

        res.status(error.status||400).json({
            error: error.message,
        });
    }
};


// RESET PASSWORD
const resetPassword = async (req, res) => {

    try {

        await resetPasswordServices.resetPassword(req.body)

        res.status(200).json({
            message: "Password reset successfully",
        });

    } catch (error) {

        res.status(error.status||400).json({
            error: error.message,
        });
};

}


export default {
    forgotPassword,
    resetPassword,
};