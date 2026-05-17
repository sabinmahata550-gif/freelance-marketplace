import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/User.js";
import ResetPassword from "../models/resetPassword.js";
import config from "../config/config.js";
import sendEmail from "../util/email.js";

// FORGOT PASSWORD
const forgotPassword = async (email) => {

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }

    // GENERATE TOKEN
    const token = crypto.randomUUID();

    // SAVE TOKEN
    await ResetPassword.create({
        userId: user._id,
        token,
    });

    // RESET LINK
    const link = `${config.appUrl}/reset-password?userId=${user._id}&token=${token}`;
    sendEmail({
        recipient: email,
        subject: "Reset password link.",
        html: `
<div
  style="
    padding:20px;
    font-family:sans-serif;
  "
>

  <h2>
    Reset Your Password
  </h2>

  <p>
    Click the button below
    to reset your password.
  </p>

  <a
    href="${link}"
    style="
      background:black;
      color:white;
      padding:12px 20px;
      text-decoration:none;
      border-radius:5px;
      display:inline-block;
    "
  >
    Reset Password
  </a>

  <p style="margin-top:20px;color:gray;">
    This link expires in 1 hour.
  </p>

</div>
`
    })

    return {
        message: "Reset password link sent to your email.",
    };
};

// RESET PASSWORD
const resetPassword = async (input) => {
    const data = await ResetPassword.findOne({
        userId: input.userId,
        expiresAt: { $gt: Date.now() }
    }).sort({ createdAt: -1 });

    if (!data || data.token != input.token) {
        throw {
            status: 400,
            message: "Invalid or expired link."
        }
    }
    if (data.isUsed) {
        throw {
            status: 400,
            message: "Iike already used."
        }
    }

    const hashPassword = await bcrypt.hash(input.password, 10);

    await User.findByIdAndUpdate(input.userId, {
        password: hashPassword,
    })
    await ResetPassword.findByIdAndUpdate(data._id, {
        isUsed: true,
    })
    return { message: "password reset successful." };

}
export default {
    forgotPassword,
    resetPassword
};