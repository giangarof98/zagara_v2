import path from 'path'
import express from 'express'
import multer from 'multer'
import { multerPost } from '../config/multer.js';
const router = express.Router()


router.post('/', multerPost, (req,res) => {
    res.send({
        message:'Image Uploaded',
        image: req.files[0].path
    })
})

export default router;

