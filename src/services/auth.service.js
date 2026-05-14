import User from "../models/User.js";
import bcrypt from "bcrypt";

const Register = async (data) => {
    const user = await User.findOne({ email: data.email });

    if (user) {
        throw {
            status: 400,
            message: "User already exists"
        };
    }

    const hashPassword = await bcrypt.hash(data.password, 10);
    const newUser = await User.create({ ...data, password: hashPassword });

    return {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        address: newUser.address,
        roles: newUser.roles
    };;
};

const Login = async (data) => {
    const user = await User.findOne({
        $or: [
            { email: data.email },
            { phonenumber: data.phonenumber }
        ]
    });
    if (!user) {
        throw {
            status: 400,
            message: "User does not exist"
        };
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
  

    if (!isMatch) {
        throw {
            status: 401,
            message: "Invalid  password"
        };
    }

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        roles: user.roles
    };
};

export default { Register, Login };