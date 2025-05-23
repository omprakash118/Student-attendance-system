const Admin = require('../models/admin.model.js');
const ApiError = require('./ApiError.js');

const generateAdminTokens = async (adminId) => {
    try {
        const admin = await Admin.findById(adminId);
        if (!admin) {
            throw new ApiError(404, "Admin not found");
        }

        // console.log("Admin found: ", admin);
        const accessToken = admin.generateAccessToken();
        const refreshToken = admin.generateRefreshToken();

        admin.refreshToken = refreshToken;
        await admin.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Error in generateAdminTokens:", error);
        throw new ApiError(500, error.message || "Something went wrong while generating admin tokens");
    }
};

module.exports = { generateAdminTokens };
