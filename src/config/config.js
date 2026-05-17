import dotenv from "dotenv"
dotenv.config();
const config = {
    MONGO_URL: process.env.MONGO_URL || "",
    port: process.env.PORT || "",
    JWT_SECRETS: process.env.JWT_SECRETS || "",
    cloudinary: {
        CLOUDINARY_NAME: process.env.CLOUDINARY_NAME || "",
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
        CLOUDINARY_API_SECRECT: process.env.CLOUDINARY_API_SECRECT || "",

    },
    appiUrl: process.env.API_URL || "",
    resendEmailApiKey: process.env.RESEND_EMAIL_KEY || ""

}


export default config