// import asyncHandler from '../middleware/asynchandler.js'
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
// @desc    create new order
// @route   POST /api/order
// @access  Private
const addOrderItems = async(req,res) =>{
    const {
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice} = req.body;

        if(orderItems && orderItems.length === 0){
            res.status(400);
            throw new Error('No order items')
        } else {
            const order = new Order({
                orderItems: orderItems.map((x) => ({
                    ...x,
                    product: x._id,
                    _id: undefined
                })),
                user: req.user._id, 
                shippingAddress, 
                paymentMethod, 
                itemsPrice, 
                taxPrice, 
                shippingPrice, 
                totalPrice
            });
            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        }
}

// @desc    get logged in user orders
// @route   GET /api/order/myorder
// @access  Private
const getMyOrders = async(req,res) =>{
    const orders = await Order.find({user: req.user._id});
    res.status(200).json(orders)
}

// @desc    get order by id
// @route   GET /api/order/:id
// @access  Private
const getOrderById = async(req,res) =>{
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if(order){
        res.status(200).json(order)
    } else{
        res.status(404)
        throw new Error('Order not found')
    }
}

// @desc    update order to paid
// @route   PUT /api/order/:id/paid
// @access  Private
const updateOrderToPaid = async(req,res) =>{
    const order = await Order.findById(req.params.id);

    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymenResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        }

        const updateOrder = await order.save();

        res.status(200).json(updateOrder);
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
}

// @desc    update order to delivered
// @route   put /api/order/:id/deliver
// @access  Private
const updateOrderToDelivered = async(req,res) =>{
    res.send('update order to delivered')
}

// @desc    getall orders
// @route   POST /api/order
// @access  Private/admin
const getOrders = async(req,res) =>{
    res.send('all orders')
}

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
}

