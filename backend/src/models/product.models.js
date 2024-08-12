import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {

        name: {
            type: String,
            required: [true, "Please enter product name"],
            trim: true,
            unique: true
        },
        description: {
            type: String,
            required: [true, "Please enter product description"]
        },
        price: {
            type: Number,
            required: [true, "Please enter product price"],
            maxlength: [6, "Price cant execeds 6 figures"]
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "CreatedBy missing"]
        },
        ratings: {
            type: Number,
            default: 0,
        },
        images: [
            {
                public_ID: {
                    type: String,
                    required: [true, 'images required for products (public_id)']
                },
                url: {
                    type: String,
                    required: [true, 'images required for products (url)']
                },
            }
        ],
        category: { 
            type: String,
            required: [true, "Please enter product category"],
            // TODO: add enum too
        },
        stock: {
            type: Number,
            required:[true, "Please enter product Stock"],
            maxlength: 4,
            default: 1,
        },
        numOfReviews: {
            type: Number,
            default: 0,
        },
        reviews: [
            {
                createdBy: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                    required: [true, "CreatedBy missing"]
                },
                name: {
                    type: String,
                    required: true,
                },
                comment: {
                    type: String,
                    required: true,
                },
                rating: { // rating validation not working properly tell frontEnd to write
                    type: Number,
                    required: true,
                    min: [0, 'Rating must be at least 0'],
                    max: [5, 'Rating must be at most 5']
                },
            }
        ]
    }, { timestamps: true }
)

export const Product = mongoose.model("Product", productSchema)