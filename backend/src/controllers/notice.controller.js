const asyncHandler = require('../utils/asyncHandler.js');
const ApiError = require('../utils/ApiError.js');
const ApiResponse = require('../utils/ApiResponse.js');
const Notice = require('../models/notice.models.js');
const uploadCloudinary = require('../utils/Cloudinary.js');



const createNotice = asyncHandler(async (req, res) => {
    const { Title, audience , description} = req.body;

    console.log("Request body", req.body);

    if (!Title || !audience) {
        throw new ApiError(400, "Title and audience are required");
    }

    // Step 1: Get file from multer
    // const fileLocalPath = req.files?.file?.[0]?.path;

    const fileLocalPath = req.files?.files[0]?.path;

    console.log("File local path", fileLocalPath);
    // Step 2: Validate file
    if (!fileLocalPath) {
        throw new ApiError(400, "File is required for notice");
    }

    // Step 3: Upload file to cloudinary
    const uploadedFile = await uploadCloudinary(fileLocalPath);

    // console.log("Uploaded file", uploadedFile);

    if (!uploadedFile) {
        throw new ApiError(400, "File upload failed");
    }

    console.log("File uploaded successfully to cloudinary", uploadedFile.url);

    const newNotice = await Notice.create({
        Title,
        audience,
        description,
        dateIssued: new Date(),
        files : [
            {
                fileName: uploadedFile.original_filename,
                fileUrl: uploadedFile.secure_url
            }
        ]
    });

    return res.status(201).json(
        new ApiResponse(201, newNotice, "Notice created successfully")
    );
});

const getAllNotices = asyncHandler(async (req, res) => {
    const notices = await Notice.find().sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, notices, "Notices fetched successfully")
    );
});

const getNoticeById = asyncHandler(async (req, res) => {
    const { noticeId } = req.params;

    const notice = await Notice.findById(noticeId);
    if (!notice) {
        throw new ApiError(404, "Notice not found");
    }

    return res.status(200).json(
        new ApiResponse(200, notice, "Notice fetched successfully")
    );
});

const deleteNotice = asyncHandler(async (req, res) => {
    const { noticeId } = req.params;

    const deletedNotice = await Notice.findByIdAndDelete(noticeId);
    if (!deletedNotice) {
        throw new ApiError(404, "Notice not found");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Notice deleted successfully")
    );
});

module.exports = {
    createNotice,
    getAllNotices,
    getNoticeById,
    deleteNotice
};
