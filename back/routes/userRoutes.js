import express from 'express';
const router = express.Router();
import asyncHandler from '../middleware/asynchandler.js'

import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser 
} from '../controller/userController.js';

import {protect, admin} from '../middleware/authMiddleware.js'

router.get('/', protect, admin, asyncHandler(getUsers))
router.post('/', asyncHandler(registerUser))

router.post('/logout', asyncHandler(logoutUser))
router.post('/login', asyncHandler(authUser))

router.get('/profile', protect, asyncHandler(getUserProfile))
router.put('/profile', protect, asyncHandler(updateUserProfile))

router.get('/:id', protect, admin, asyncHandler(getUserById))

router.put('/:id', protect, admin, asyncHandler(updateUser))
router.delete('/:id', protect, admin, asyncHandler(deleteUser))

export default router;