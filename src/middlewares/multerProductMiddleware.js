const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/products'))
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        // const filename = path.basename(file.originalname, ext);
        // cb(null, `${filename}-${Date.now()}${ext}`)
        cb(null, `${file.fieldname}-${Date.now()}${ext}`)
    }
});
const uploadProduct = multer({ storage });

module.exports = uploadProduct;