import express from 'express';

import asyncHandler from '../middleware/asynchandler.js'
import { 
    getProducts, 
    getById, 
    createProduct, 
    updateProduct,
    deleteProduct,
    createReview,
    getTopProducts
} from '../controller/productController.js';

import {protect, admin} from '../middleware/authMiddleware.js'
import { multerPost } from '../config/multer.js';

const router = express.Router();

//create product
router.post('/', protect, admin, asyncHandler(createProduct))

// get top products
router.get('/top', asyncHandler(getTopProducts))

// create review
router.post('/:id/reviews', protect, asyncHandler(createReview))

// fetch all
router.get('/', asyncHandler(getProducts))

// fetch sigle product by id
router.get('/:id', asyncHandler(getById))

// update product
router.put('/:id', protect, admin, multerPost, asyncHandler(updateProduct))

// delete product
router.delete('/:id', protect, admin, asyncHandler(deleteProduct))


export default router;