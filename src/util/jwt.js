import config from "../config/config.js"
import jwt from "jsonwebtoken"
const generateToken = async (data) => {
    try {
        const token = jwt.sign(data, config.JWT_SECRETS, { expiresIn: '1d' })
        return token
    } catch (error) {
        console.log(error.message)
        throw error;
    }
}

const verifyToken = async (token) => {
    try {
        const decoded = jwt.verify(token, config.JWT_SECRETS);
        return decoded;
    } catch (error) {
        console.error("Token Verification Failed:", error.message);

        throw {
            status: 401,
            message: "Invalid or expired token"
        };
    }
}

export default { generateToken, verifyToken }