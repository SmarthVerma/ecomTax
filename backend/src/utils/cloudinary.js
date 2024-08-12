import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECERT // Cl 
});

const uploadOnCloudinary = async (localFilePath) => {
    if(!localFilePath) return null
    try {
        const response = await cloudinary.uploader.upload(localFilePath, {resource_type: "auto"})

        return response

    } catch (error) {
        console.log('error in cloudinary util', error)
        return null
    }
}

export {uploadOnCloudinary}