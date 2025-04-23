const cloudinary = require('cloudinary').v2;

const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
});


const uploadCloudinary = async (localFilePath) =>{
    try{
        if(!localFilePath) return null;

        // upload the file on cloudinary
        const responce = await cloudinary.uploader.upload(localFilePath, {
            resource_type : "auto"
        });

        // file uploaded successfully

        // console.log("File uploaded successfully to cloudinary" , responce.url)

        fs.unlinkSync(localFilePath);
        return responce;

    }
    catch(err){
        fs.unlinkSync(localFilePath); // Remove the locally saved file as the upload opration got failed
        return null;
    }
}

module.exports = uploadCloudinary;