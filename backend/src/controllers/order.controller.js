import { Order } from "../models/order.models.js";
import { ApiResponse } from "../utils/ApiRespone.js";
import { asyncHandler, asyncHandler2 } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/product.models.js";
import mongoose from "mongoose";

// FUNCTION
const updateStock = async (productId, quantity) => {
    const product = await Product.findById(productId)
    if (quantity > product.stock) throw new ApiError(400, "No stock for the requested quantity")

    product.stock -= quantity

    if (product.stock < 0) throw new ApiError(500, "Something went wrong while updating the stock")

    await product.save({ validateBeforeSave: false })
}

//CONTROLLERS

// create order
const newOrder = asyncHandler(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body

    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user
    })

    return res.status(201)
        .json(new ApiResponse(201, order, "Order sucessfully created"))
})
// get singleOrder
// Get a single order item based on orderItem._id
const getSingleOrderItem = asyncHandler2(async (req, res, next) => {
    const { orderId } = req.params;
    console.log('orderItemId', orderId);
    const orderItem = await Order.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(orderId) } // Filter by the specific orderId
        },
        {
            $unwind: "$orderItems" // Deconstruct the orderItems array
        },
        {
            $project: {
                'orderItems': 1,
                'shippingInfo': 1,
                'paidAt': 1,
                "orderStatus": 1,
            } // Project only the orderItems field
        }
    ]);
    console.log(orderItem)

    if (orderItem.length === 0) {
        return res.status(404).json(new ApiResponse(404, null, "Order item not found"));
    }

    return res.status(200).json(new ApiResponse(200, orderItem[0], "Order item fetched successfully"));
});

// Get logged-in user orders
const myOrders = asyncHandler(async (req, res, next) => {
    const user = req.user;
    const orders = await Order.aggregate([
        {
            "$match": {
                "user._id": new mongoose.Types.ObjectId(user._id)
            }
        },
        {
            "$unwind": "$orderItems"
        },
        {
            "$project": {
                "orderStatus": 1,
                "paidAt": 1,
                "shippingInfo": 1,
                "product": "$orderItems.product",
                "name": "$orderItems.name",
                "image": "$orderItems.image",
                "price": "$orderItems.price",
                "quantity": "$orderItems.quantity",
                "_id": "$orderItems._id"
            }
        }
    ]);

    res.status(200).json(new ApiResponse(200, orders, "All user orders fetched"));
});

const myOrderItem = asyncHandler(async (req, res, next) => {

})
// admin get all orders
const allOrders = asyncHandler(async (req, res, next) => {

    const allOrders = await Order.aggregate([
        {
            $unwind: "$orderItems"
        }
    ])

    let totalAmount = 0
    allOrders.forEach((order) => {
        totalAmount += order.totalPrice
    })

    return res.status(200)
        .json(new ApiResponse(200, { allOrders, totalAmount }, "All orderFetched"))

})
//update orderStatus
const updateOrderStatus = asyncHandler(async (req, res, next) => {
    const { orderStatus } = req.body
    const { orderId } = req.params

    const order = await Order.findById(orderId)
    if (!order) throw new ApiError(404, "Order not found")

    for (const order of order.orderItems) { // forEach dont work properly for await
        await updateStock(order.product, order.quantity)
    }

    if (order.orderStatus === "Delivered") throw new ApiError(400, "You have already delivered this order")
    if (orderStatus === "Delivered") order.deliveredAt = Date.now()

    order.orderStatus = orderStatus

    await order.save({ validateBeforeSave: true })
    return res.status(200)
        .json(new ApiResponse(200, order, "Order status successFully updated"))
})
// delete order
const deleteOrder = asyncHandler(async (req, res, next) => {
    const { orderId } = req.params
    const order = await Order.findById(orderId)
    if (!order) throw new ApiError(400, "Order not found")

    if (!(order.orderStatus === "Processing"))
        throw new ApiError(400, "Order cannot be deleted as it is not in Processing status")

    await order.remove()

    return res.status(200)
        .json(new ApiResponse(200, deletedOrder, "Successfully deleted"))
})

export {
    newOrder,
    getSingleOrderItem,
    myOrders,
    allOrders,
    updateOrderStatus,
    deleteOrder
}