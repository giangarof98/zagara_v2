import express from 'express';

import asyncHandler from '../middleware/asynchandler.js'
import { getProducts, getById } from '../controller/productController.js';

const router = express.Router();

// fetch all
router.get('/', asyncHandler(getProducts))

// fetch sigle product by id
router.get('/:id', asyncHandler(getById))

export default router;