const Teacher = require('../models/teacher.models.js');
const ApiError = require('./ApiError.js');

const generateTeacherTokens = async (teacherId) => {
    try {
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            throw new ApiError(404, "Teacher not found");
        }

        const accessToken = teacher.generateAccessToken();
        const refreshToken = teacher.generateRefreshToken();

        teacher.refreshToken = refreshToken;
        await teacher.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating teacher tokens");
    }
};

module.exports = { generateTeacherTokens };
