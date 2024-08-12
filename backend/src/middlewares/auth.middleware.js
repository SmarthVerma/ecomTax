import jwt from 'jsonwebtoken'
import { asyncHandler, asyncHandler2 } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.models.js'


// access accesstoken from cookies
// verify that token from secert key u have
// the decoded token would have all the details u initial set
// find the user in database and give them ID

const verifyAuth = asyncHandler(async (req, _, next) => {
  console.log('hey auth')
  const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
  if (!token) throw new ApiError(401, "Unauthorized Request you are required to login")


  const decodedToken = jwt.verify(token, process.env.ACCESS_SECRET_KEY)
  if (!decodedToken) throw new ApiError(401, "Invalid access token")

  const userId = decodedToken._id

  const user = await User.findById(userId)
  if (!user) throw new ApiError(401, "Invalid access token")

  req.user = user

  next()

})

const authorizeRoles = (...role) => asyncHandler(async (req, res, next) => {

  console.log('does it include', role.includes(req.user.role))
  if (!role.includes(req.user.role)) {
    throw new ApiError(403, "Cannot be excess by user") // check if next require
    next()
  }
  else next()

})

export { verifyAuth, authorizeRoles }