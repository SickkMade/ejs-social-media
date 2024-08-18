const multer = require('multer')
const path = require('path')

module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        ext = path.extname(file.originalname)
        if(ext !== '.jpg' && ext !== '.png' && ext !== 'jpeg'){
            cb(new Error('filetype is not supported'), false)
            return
        }
        cb(null, true)
    }
})