const asyncHandler = require('../utils/asyncHandler.js');


const registerUser = asyncHandler( async (req,res) =>{
    res.status(200).json({
        message : "Good"
    });
})


module.exports = {
    registerUser
}