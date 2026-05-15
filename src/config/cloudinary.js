import { v2 as cloudinary } from 'cloudinary';
import config from './config.js';
function connectCloudinary() {
    // Configuration
    cloudinary.config({
        cloud_name: config.cloudinary.CLOUDINARY_NAME,
        api_key: config.cloudinary.CLOUDINARY_API_KEY,
        api_secret: config.cloudinary.CLOUDINARY_API_SECRECT,// Click 'View API Keys' above to copy your API secret
    });
}

export default connectCloudinary;