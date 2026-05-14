import jwt from "../util/jwt.js";
const auth = async (req, res, next) => {
    try {

        const token = req.cookies.token; 
        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" })
        }

        const decode = await jwt.verifyToken(token);
        req.user = decode;

        next()
    } catch (error) {
        res.status(401).json({ message: "Token is not valid" });
    }

}

export default auth