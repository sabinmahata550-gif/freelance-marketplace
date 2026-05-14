import dotenv from "dotenv"
dotenv.config();
const config = {
    MONGO_URL: process.env.MONGO_URL || "",
    port: process.env.PORT || "",
    JWT_SECRETS: process.env.JWT_SECRETS || "",

}

export default config