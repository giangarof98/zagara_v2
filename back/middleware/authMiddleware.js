import jwt from "jsonwebtoken";
import asyncHandler from "./asynchandler.js";
import User from "../models/userModel.js";

// Protect routes
export const protect = asyncHandler(async (req,res,next) => {
    let token;
    // read jwt from the cookie
    token = req.cookies.jwt

    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch(e){
            console.log(e)
            res.status(401);
            throw new Error('Not Authorized, token failed!')
        }

    } else {
        res.status(401);
        throw new Error('Not Authorized, no token!')
    }
});

// Admin middleware
export const admin = (req,res,next) => {
    if(req.user && req.user.isAdmin){
        next();
    } else {
        throw new Error('Not authorized as admin!')
    }
}