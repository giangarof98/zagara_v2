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


// @desc    create product
// @route   POST /api/products
// @access  PRIVATE/ADMIN
const createProduct = async(req,res) =>{
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        category:'Sample category',
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct)
}

export {getProducts, getById, createProduct}