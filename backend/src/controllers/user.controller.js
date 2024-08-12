import { asyncHandler, asyncHandler2 } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from '../utils/ApiRespone.js'
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from 'jsonwebtoken'
import { sendEmail } from '../utils/sendEmail.js'
import crypto from 'crypto'
import { Product } from "../models/product.models.js";

const options = {
    httpOnly: true,
    secure: true
}

const generateAccessTokenAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()


        user.refreshToken = refreshToken

        await user.save({ validtateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        console.log('error', error)
    }
}

// Register User

const registerUser = asyncHandler2(async (req, res) => {
    const { name, email, password, role } = req.body

    if (
        [email, password, name].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    // if user exist
    const existedUser = await User.findOne({ email })
    if (existedUser) throw new ApiError(400, "User already exists")

    // console.log("req.files automatically from multer", req.files)

    // extracting localPath of avatar
    const avatarLocalPath = req.files?.avatar[0]?.path
    if (!avatarLocalPath) throw new ApiError(400, "Please select your avatar file")

    //  uploading to cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if (!avatar) throw new ApiError(500, "Something went wrong while uploading on cloudinary try again")

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_ID: avatar.public_id,
            url: avatar.url,
        },
        role
    })

    const createdUser = await User.findById(user._id).select("-password")
    if (!createdUser) throw new ApiError(500, "something went wrong when creating the user")

    return res.status(200)
        .json(new ApiResponse(201, { createdUser }, "User succesfully registerd"))
})
// Login User
const loginUser = asyncHandler(async (req, res, next) => {
    // get data from req body

    const { email, password } = req.body

    if (!(email && password)) throw new ApiError(400, "email and password is required")

    // check if user exist

    const userExist = await User.findOne({ email })
    if (!userExist) throw new ApiError(404, "User not found please register")

    const isPasswordCorrect = await userExist.isPasswordCorrect(password)
    if (!isPasswordCorrect) throw new ApiError(400, "Password invalid")

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshTokens(userExist._id)

    const loggedInUser = await User.findById(userExist._id).select("-password -refreshToken")


    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200,
            { user: loggedInUser, accessToken, refreshToken },
            "Succesfully Logged in"))

})
// logOut user
const logoutUser = asyncHandler2(async (req, res) => {
    // verify toh krlo user legit login ha ki // middleware lagyga
    // after u get userDetails delete refreshToken from db
    // now just clear cookies baby

    const userId = req.user._id

    await User.findByIdAndUpdate(
        userId,
        { $unset: { refreshToken: 1 } },
        { new: true }
    );

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, {}, "User logged out")
        )

})
// refreshTokens
const refreshAccessToken = asyncHandler2(async (req, res) => {
    // extract refresh token
    // decode it and and find the userID with it
    // generate both new tokens and set them in cookies

    const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshAccessToken

    if (!incomingRefreshToken) throw new ApiError(401, "Unauthorized request")

    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_SECRET_KEY)
    if (!decodedToken) throw new ApiError(401, "wrong refreshToken")

    const userId = decodedToken._id
    const user = await User.findById(userId)

    if (incomingRefreshToken !== user.refreshToken) throw new ApiError(401, "Refresh token is expired or")

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshTokens(userId)

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, { accessToken, refreshToken }, "access token refreshed")
        )
})
// forgotPassword before login
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body
    if (!email) throw new ApiError(400, "Please enter the email")

    const user = await User.findOne({ email })
    if (!user) throw new ApiError(404, "User not found")

    // get resetPassword Tokenå


    const resetToken = user.getResetPasswordToken()
    await user.save({ validateBeforeSave: false }) // because of above function

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it `;
    try {
        await sendEmail({
            email: user.email,
            subject: 'Ecommerce Password Recovery',
            message,
            name: user.name
        });

        return res.status(200).json(
            new ApiResponse(200, {}, `Email sent to ${user.email} successfully`)
        );
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });

        throw new ApiError(500, error.message);
    }
})
// reset password
const resetPassword = asyncHandler(async (req, res) => {
    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token) // got token from /:token
        .digest("hex");

    // finding user with that token stored
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {
            $gt: Date.now()
        }
    })

    if (!user) throw new ApiError(400, "Reset Passowrd Token is invalid or has been expired")

    const { newPassword, confirmPassword } = req.body
    if (newPassword !== confirmPassword) {
        throw new ApiError(400, "Password dosnt match")
    }

    user.password = newPassword
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save({ validateBeforeSave: false })

    // login bhi kra do at a same time

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshTokens(user.id)

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, user, "Password Changed successfully"))
})
// get User details
const getUserDetail = asyncHandler(async (req, res, next) => {
    const user = req.user
    return res.status(200)
        .json(new ApiResponse(200, user, "User details fetched succesfully"))
})
// update user Password
const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body

    const user = req.user
    const isCorrect = user.isPasswordCorrect(oldPassword)

    if (!isCorrect) throw new ApiError(400, "Invalid old password")
    if (!(newPassword === confirmPassword)) throw new ApiError(400, "confirm password dosnt match with new password")

    user.password = newPassword

    await user.save({ validtateBeforeSave: false })

    return res.status(200)
        .json(new ApiResponse(200, {}, "Password Changed Succesfully"))
})
// update user Profule
const updateProfile = asyncHandler(async (req, res) => {
    let user = req.user
    const { name, email } = req.body
    console.log('reqBody', req.body)
    console.log('reqFiles', req.files)

    let newAvatar = undefined
    if (req.files?.avatar) {
        const localPath = req.files?.avatar[0].path
        newAvatar = await uploadOnCloudinary(localPath)
    }
    user.name = name || user.name
    user.email = email || user.email
    user.avatar.public_ID = newAvatar?.public_id || user.avatar.public_ID
    user.avatar.url = newAvatar?.url || user.avatar.url
    await user.save({ validateBeforeSave: false })
    user = await User.findById(user.id).select('-role -refreshToken -password')

    return res.status(200)
        .json(new ApiResponse(200, user, "Updated sucessfully"))
})

// admin-> get all Users
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.aggregate([
        {
            $project: {
                name: 1,
                email: 1,
                role: 1,
                avatar: 1,
                createdAt: 1
            }
        }
    ])
    const numberOfUsers = await User.countDocuments()

    return res.status(200)
        .json(new ApiResponse(200, { users, numberOfUsers }, "successfully fetched all users"))
})
//admin->userProfile
const getSingleUser = asyncHandler(async (req, res) => {
    const userId = req.params.id
    const user = await User.findById(userId)

    if (!user) throw new ApiError(404, "User with this id does not exist")

    return res.status(200)
        .json(new ApiResponse(200, user, "successfully fetched the selected user"))
})
//admin ->select user role
const updateRole = asyncHandler(async (req, res, next) => {
    const { role } = req.body
    const userId = req.params.id

    const user = await User.findById(userId)
    if (!user) throw new ApiError(404, "User with this id does not exist")
    user.role = role

    await user.save({ validateBeforeSave: false })

    return res.status(200)
        .json(new ApiResponse(200, user))
})
//admin->delete User
const deleteUser = asyncHandler(async (req, res, next) => {
    const userId = req.params.id
    const user = await User.findByIdAndDelete(userId)
    if (!user) throw new ApiError(404, "User with this id does not exist")

    return res.status(200)
        .json(new ApiResponse(200, {}, "Successfully deleted"))
})

//create-review


export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    forgotPassword,
    resetPassword,
    getUserDetail,
    changePassword,
    updateProfile,
    getAllUsers,
    getSingleUser,
    updateRole,
    deleteUser,
}