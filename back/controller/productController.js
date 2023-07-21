import asyncHandler from '../middleware/asynchandler.js'
import Product from '../models/productModel.js';


// @desc    fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async(req,res) =>{
    const products = await Product.find({});
    res.json(products);
}

// @desc    fetch single product by id
// @route   GET /api/products/id
// @access  Public
const getById = async(req,res) => {
    const product = await Product.findById(req.params.id);
    if(product){
        return res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found')
    }
}

export {getProducts, getById}