const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination : function (req,file,cb){
        cb(null , './public/temp')
    },
    filename: function(req,file,cb){
        const timestamp = Date.now();
        const originalName = file.originalname;
        const ext = path.extname(originalName);  // Get file extension
        const baseName = path.basename(originalName, ext); // Get file name without extension

        cb(null, `${timestamp}-${baseName}${ext}`); // Save file with timestamp
    }
});

const upload = multer({
    storage: storage,
})

module.exports = upload;