import {CloudinaryStorage} from "multer-storage-cloudinary";
import { v2 as cloudinary } from 'cloudinary'


cloudinary.config({
    cloud_name: 'gggarof',
    api_key: '757512262653573',
    api_secret: 'nXv3l6yhPd_pozurhbBbVAJWZ9I'
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'ecomm',
        allowedFormats: ['png', 'jpeg', 'jpg']
    }
});

export { storage, cloudinary}