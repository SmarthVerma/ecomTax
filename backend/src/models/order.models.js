import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    shippingInfo: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true },
        county: { type: String, required: true },
        pinCode: { type: String, required: true },
        phoneNo: { type: Number, required: true },
    },
    orderItems: [
        {
            product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
            name: { type: String, required: true },
            image: { type: String, required: true }, // doubt product se bhi to le skte ha
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
        }
    ],
    user: {
        _id: { type: Schema.Types.ObjectId, ref: "User" },
        name: { type: String, required: true },
        email: { type: String, required: true },
    },
    paymentInfo: {
        id: { type: String, required: true }, // why id hein mongu provide for use
        status: { type: String, required: true }
    },
    itemPrice: { type: Number, default: 0, required: true },
    taxPrice: { type: Number, default: 0, required: true },
    shippingPrice: { type: Number, default: 0, required: true },
    totalPrice: { type: Number, default: 0, required: true },
    orderStatus: { type: String, required: true, default: "Processing" },
    paidAt: { type: Date, required: true },
    deliveredAt: { type: Date },
}, { timestamps: true }
)

export const Order = mongoose.model("Order", orderSchema)