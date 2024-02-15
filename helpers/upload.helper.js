require("dotenv").config();
const multer = require('multer');
const path = require('path')

const storage= multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'Storage');
    },
    filename: (req, file, cb)=>{
        console.log('file');
        console.log(file);
        console.log(file.originalname);
        console.log(path.extname(file.originalname));

        cb(null, Date.now() + '-' +file.originalname);
    }
})


const upload = multer({
    storage: storage
})


module.exports = upload;