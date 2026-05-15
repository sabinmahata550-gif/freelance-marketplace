import { v2 as cloudinary } from "cloudinary";

const uploadFile = async (files) => {
    const uploadedFiles = [];
    for (const file of files) {
        const result = await new Promise((resolve, reject) => {

            cloudinary.uploader.upload_stream(
                {
                    folder: "my_profile",
                    allowed_formats: ["jpg", "png", "webp"],
                },

                (error, data) => {

                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                }

            ).end(file.buffer);

        });

        uploadedFiles.push(result);
    }

    return uploadedFiles;
};

export default uploadFile;