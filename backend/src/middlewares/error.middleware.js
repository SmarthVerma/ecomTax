// import { ApiError } from "../utils/ApiError";
// import { ApiResponse } from "../utils/ApiRespone";

// const specialError = (err, res, req, next) => {
//     err.statusCode = err.statusCode || 500
//     err.message = err.message || "internal server Error"

//     // duplicate
//     if(err.code === 11000) {
//         const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
//         err = new ApiError(400, message)
//     }

//     res.status(err.statusCode).json({
//         success: false,
//         message: err.message
//     })
// }

// export default specialError