const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '/uploads/photos')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const getExtension = (file) => {
    return file.originalname.substr(file.originalname.lastIndexOf('.') + 1,
        file.originalname.length);
};

const upload = multer({
    fileFilter: function(req, file, next) {
        const filetypes = /jpeg|jpg|png/;
        let mimetype = filetypes.test(file.mimetype);
        let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return next(null, true);
        }
        next(new Error('Unsupported Media Type'));
    },
    storage: storage,
});

module.exports = upload;