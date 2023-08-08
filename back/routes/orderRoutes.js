import express from 'express';
const router = express.Router();
import asyncHandler from '../middleware/asynchandler.js'

import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
} from '../controller/orderController.js';

import {protect, admin} from '../middleware/authMiddleware.js'

router.get('/', protect, admin, asyncHandler(getOrders))
router.post('/', protect, asyncHandler(addOrderItems))

router.get('/mine', protect, asyncHandler(getMyOrders))

router.get('/:id', protect, asyncHandler(getOrderById))
router.put('/:id/pay', protect, asyncHandler(updateOrderToPaid))
router.put('/:id/deliver', protect, admin, asyncHandler(updateOrderToDelivered))

export default router