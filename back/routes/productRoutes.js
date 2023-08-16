import express from 'express';

import asyncHandler from '../middleware/asynchandler.js'
import { 
    getProducts, 
    getById, 
    createProduct, 
    updateProduct 
} from '../controller/productController.js';

import {protect, admin} from '../middleware/authMiddleware.js'

const router = express.Router();

//create product
router.post('/', protect, admin, asyncHandler(createProduct))

// fetch all
router.get('/', asyncHandler(getProducts))

// fetch sigle product by id
router.get('/:id', asyncHandler(getById))

router.put('/:id', protect, admin, asyncHandler(updateProduct))


export default router;