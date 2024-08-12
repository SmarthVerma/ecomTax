import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiRespone.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const editHeroPage = asyncHandler(async(req, res, next) => {
    const { heroTitle, heroDescription } = req.body
    const { heroImg } = req.files

    if(!heroImg) throw new ApiError(400, 'Image required')

    const heroImgPath = heroImg[0]?.path;
    console.log('this is file path', heroImgPath)

    if(!heroImgPath) throw new ApiError(400, "Error finding path to image")    

    res.status(200)
    .json( new ApiResponse(200, {}, "working"))
})

export { editHeroPage }

