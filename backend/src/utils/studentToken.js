const Student = require('../models/student.models.js');
const ApiError = require('./ApiError.js');

const generateStudentTokens = async (studentId) => {
    try {
        const student = await Student.findById(studentId);
        if (!student) {
            throw new ApiError(404, "Student not found");
        }

        const accessToken = student.generateAccessToken();
        const refreshToken = student.generateRefreshToken();

        student.refreshToken = refreshToken;
        await student.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Error generating student tokens:", error);
        throw new ApiError(500, "Something went wrong while generating student tokens");
        
    }
};

module.exports = { generateStudentTokens };
