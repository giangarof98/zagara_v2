import express from 'express';

import asyncHandler from '../middleware/asynchandler.js'
import { 
    getProducts, 
    getById, 
    createProduct, 
    updateProduct,
    deleteProduct 
} from '../controller/productController.js';

import {protect, admin} from '../middleware/authMiddleware.js'

const router = express.Router();

//create product
router.post('/', protect, admin, asyncHandler(createProduct))

// fetch all
router.get('/', asyncHandler(getProducts))

// fetch sigle product by id
router.get('/:id', asyncHandler(getById))

// update product
router.put('/:id', protect, admin, asyncHandler(updateProduct))

// delete product
router.delete('/:id', protect, admin, asyncHandler(deleteProduct))


export default router;