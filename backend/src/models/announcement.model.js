import mongoose, { Schema } from "mongoose";

const adminHomeSchema = new Schema({
    heroTitle: { type: String, required: true },
    heroDescription: { type: String, required: true },
    heroImage: { type: String, required: true }, // Added image field
    readMore: {
        subject: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
    }
}, {timestamps: true})

export const adminHomeContent = mongoose.model("adminHomeContent", adminHomeSchema)