import asyncHandler from '../middleware/asynchandler.js'
import User from '../models/userModel.js';


// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async(req,res) =>{
    res.send('auth')
}

// @desc    register user
// @route   POST /api/users
// @access  Public
const registerUser = async(req,res) =>{
    res.send('register')
}

// @desc    logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = async(req,res) =>{
    res.send('logout')
}

// @desc    get user profile
// @route   GET /api/users
// @access  Private
const getUserProfile = async(req,res) =>{
    res.send('user profile')
}

// @desc    update user profile
// @route   GET /api/users/profile
// @access  Private
const updateUserProfile = async(req,res) =>{
    res.send('update profile')
}

// @desc    get user 
// @route   GET /api/users
// @access  private admin
const getUser = async(req,res) =>{
    res.send('user profile')
}

// @desc    get user by id
// @route   GET /api/users/:id
// @access  private admin
const getUserById = async(req,res) =>{
    res.send('user user by id')
}

// @desc    delete user 
// @route   DELETE /api/users
// @access  private admin
const deleteUser = async(req,res) =>{
    res.send('delete user')
}


// @desc    update user 
// @route   PUT /api/users/:id
// @access  private admin
const updateUser = async(req,res) =>{
    res.send('update user')
}

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUser,
    getUserById,
    deleteUser,
    updateUser

}