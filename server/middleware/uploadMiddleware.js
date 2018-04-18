const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/photos')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + getExtension(file))
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
        if (!(mimetype && extname)) {
            next(new Error('Unsupported Media Type'));
        }
        return next(null, true);
    },
    storage: storage,
});

module.exports = upload;