const express = require('express');
const bodyParser = require('body-parser');
const authenticate= require('../authenticate');
const multer= require('multer');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images');    
    },

    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});

const imageFileFilter = (req,file,cb)=>{
    if(!file.originalname.match(/\.(jpg\jpeg\png\gif)$/)){
        return cb(new Error('Upload only image file'),false)
    }
    cb(null,true);
};

const upload =multer({storage:storage, fileFilter: imageFileFilter});

const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.route('/')

.get(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported ');
})

.put(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported o');
})

.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})

.post(authenticate.verifyUser,authenticate.verifyAdmin,upload.single('imagefile'),(req, res) => {
    res.statusCode=200;
    res.setHeader=('content-type','application/json');
    res.json(req.file);
})

module.exports = uploadRouter;
