import asyncHandler from '../middleware/asynchandler.js'
import Product from '../models/productModel.js';

// @desc    fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async(req,res) =>{
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;

    const keyword  = req.query.keyword ? {name: {$regex: req.query.keyword, $options:'i'}} : {}

    const count = await Product.countDocuments({...keyword})

    const products = await Product.find({...keyword})
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    res.json({products, page, pages: Math.ceil(count / pageSize)});
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

// @desc    update product
// @route   PUT /api/products/:id
// @access  PRIVATE/ADMIN
const updateProduct = async(req,res) =>{
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if(product){
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Resource not found')
    }
}

// @desc    delete product
// @route   DELETE /api/products/:id
// @access  PRIVATE/ADMIN
const deleteProduct = async(req,res) =>{

    const product = await Product.findById(req.params.id);

    if(product){
        await Product.deleteOne({_id:product._id})
        res.status(200).json({message: 'Product deleted'})
    } else {
        res.status(404)
        throw new Error('Resource not found')
    }
}

// @desc    comment product
// @route   POST /api/products/:id/reviews
// @access  provate
const createReview = async(req,res) =>{
    const {rating,comment} = req.body;
    const product = await Product.findById(req.params.id);

    if(product){
        const alreadyReview = product.reviews.find((review) => review.user.toString() === req.user._id.toString());
        if(alreadyReview){
            res.status(400);
            throw new Error('Product a;ready reviewed')
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user:req.user._id
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc,review) => acc + review.rating, 0) / product.reviews.length;
        await product.save()
        res.status(201).json({message: 'Review added'})
    } else {
        res.status(404)
        throw new Error('Resource not found')
    }
    
}

// @desc    top products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = async(req,res) =>{
    const products = await Product.find({}).sort({rating: -1}).limit(3);
    res.status(200).json(products)
}



export {
    getProducts, 
    getById, 
    createProduct, 
    updateProduct, 
    deleteProduct, 
    createReview, 
    getTopProducts}