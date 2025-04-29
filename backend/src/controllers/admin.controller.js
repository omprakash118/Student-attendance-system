const asyncHandler = require("../utils/asyncHandler.js");
const ApiResponse = require("../utils/ApiResponse.js");
const ApiError = require("../utils/ApiError.js");
const Admin = require("../models/admin.model.js");

// Get all admins
const getAllAdmins = asyncHandler(async (req, res) => {
    const admins = await Admin.find().select("-password -refreshToken");
    return res.status(200).json(new ApiResponse(200, admins, "All admins fetched successfully"));
});

// Get admin by ID
const getAdminById = asyncHandler(async (req, res) => {
    const { adminId } = req.params;

    const admin = await Admin.findById(adminId).select("-password -refreshToken");
    if (!admin) {
        throw new ApiError(404, "Admin not found");
    }

    return res.status(200).json(new ApiResponse(200, admin, "Admin fetched successfully"));
});

// Update admin
const updateAdmin = asyncHandler(async (req, res) => {
    const { adminId } = req.params;
    const updateData = req.body;

    const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updateData, { new: true }).select("-password -refreshToken");
    if (!updatedAdmin) {
        throw new ApiError(404, "Admin not found or update failed");
    }

    return res.status(200).json(new ApiResponse(200, updatedAdmin, "Admin updated successfully"));
});

// Delete admin
const deleteAdmin = asyncHandler(async (req, res) => {
    const { adminId } = req.params;

    const deletedAdmin = await Admin.findByIdAndDelete(adminId);
    if (!deletedAdmin) {
        throw new ApiError(404, "Admin not found");
    }

    return res.status(200).json(new ApiResponse(200, {}, "Admin deleted successfully"));
});

module.exports = {
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
};
