import { Router } from "express";
import {
    changePassword,
    deleteUser,
    forgotPassword,
    getAllUsers,
    getSingleUser,
    getUserDetail,
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser,
    resetPassword,
    updateProfile,
    updateRole
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"; 
import { authorizeRoles, verifyAuth } from "../middlewares/auth.middleware.js";
import { editHeroPage } from "../controllers/announcement.controller.js";

const router = Router()

const uploadMulter = upload.fields([
    { name: "avatar", maxCount: 1 },
]);

const heroImageMutler = upload.fields([
    {name: 'heroImg', maxCount: 1}
])

router.route("/register").post(uploadMulter, registerUser)
router.route("/login").post(loginUser)
router.route("/forgot").post(forgotPassword)
router.route("/reset/:token").put(resetPassword)

// secured routes
router.route("/logout").post(verifyAuth, logoutUser)
router.route("/refresh-token").get(verifyAuth, refreshAccessToken)
router.route("/profile").get(verifyAuth, getUserDetail)
router.route("/change-password").patch(verifyAuth, changePassword)
router.route("/update-profile").patch(verifyAuth, uploadMulter, updateProfile)
// admin routes
router.route("/admin/all/users").get(verifyAuth, authorizeRoles("admin"), getAllUsers)
router.route("/admin/user/:id").get(verifyAuth, authorizeRoles("admin"), getSingleUser)
router.route("/admin/user/role/:id").patch(verifyAuth, authorizeRoles("admin"), updateRole)
router.route("/admin/user/delete/:id").delete(verifyAuth, authorizeRoles("admin"), deleteUser)
router.route('/owner/user/editpage/').post(verifyAuth, authorizeRoles('admin'), heroImageMutler, editHeroPage)



export default router