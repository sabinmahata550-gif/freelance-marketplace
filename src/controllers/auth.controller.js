import authService from "../services/auth.service.js";
import jwt from "../util/jwt.js";
const Register = async (req, res) => {
    try {
        const user = await authService.Register(req.body);
         const token = await jwt.generateToken(user);
        res.cookie("token",token,{
            maxAge:86400*1000
        })
        res.status(200).json({ message: "user register in successsfully", user })
    } catch (error) {
        res.status(400).json({ error: error.message })

    }
}

const Login = async (req, res) => {
    try {
        const user = await authService.Login(req.body);
        const token = await jwt.generateToken(user);
        res.cookie("token",token,{
            maxAge:86400*1000
        })
        res.status(200).json({ message: "user login in successsfully", user, token })
    } catch (error) {
        res.status(400).json({ error: error.message })

    }
}


export default { Register, Login }