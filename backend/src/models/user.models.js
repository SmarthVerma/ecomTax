import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs'
import validator from 'validator';
import jwt from 'jsonwebtoken'
import crypto from 'crypto' // research on it



const userSchema = new Schema({

    name: {
        type: String,
        required: [true, "Please Enter your name"],
        maxLength: [30, "Name should not exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [8, "Password should be greater than  8 characters"],
        // todo yahan p select false aayaga
    },
    avatar: {
        public_ID: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    inCart: {
        items: [
            {

                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "Product"
                },
                addedAt: {
                    type: Date,
                    default: Date.now
                },
                items: {
                    type: Number,
                    default: 1
                }
            }
        ]
    },
    role: {
        type: String,
        default: "user"
    },
    refreshToken: {
        type: String,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// generating Password reset token
userSchema.methods.getResetPasswordToken = function () {

    const resetToken = crypto.randomBytes(20).toString("hex");

    // dont know why we had to hash this
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex")
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000 // 15 min ki expiry time

    return resetToken;
}

userSchema.methods.generateAccessToken = function () {
    // payload, secertKey, options
    const payload = {
        _id: this._id,
        email: this.email,
        name: this.name
    }

    const secretKey = process.env.ACCESS_SECRET_KEY;
    const options = {
        expiresIn: process.env.ACCESS_EXPIRES
    };

    const token = jwt.sign(payload, secretKey, options)
    return token
}
userSchema.methods.generateRefreshToken = function () {
    try {
        const payload = {
            _id: this._id,
        };

        const secretKey = process.env.REFRESH_SECRET_KEY;
        const options = {
            expiresIn: process.env.REFRESH_EXPIRES
        };
        const token = jwt.sign(payload, secretKey, options);
        return token;
    } catch (error) {
        console.error('Error while generating refresh token', error);
        throw error;
    }
};

export const User = mongoose.model("User", userSchema)