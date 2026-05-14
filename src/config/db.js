import mongoose from "mongoose";
import config from "./config.js";

const ConnectedDB=async()=>{
    try {
        await mongoose.connect(config.MONGO_URL);
        console.log('Connected to Datbase');
    } catch (error) {
        console.log(error.message)
    }
}

export default ConnectedDB;