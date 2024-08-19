import { Router } from "express";
import {
    createEditReview,
    createProduct,
    deleteProduct,
    deleteReview,
    getAllProducts,
    getAllReviews,
    getProduct,
    updateProduct
} from "../controllers/product.controller.js";
import { verifyAuth, authorizeRoles } from '../middlewares/auth.middleware.js'
import { upload } from "../middlewares/multer.middleware.js";
const router = Router()


const uploadMulter = upload.fields([
    { name: "images", maxCount: 10 },
]);


router.route('/all').get(getAllProducts)
router.route('/admin/create-product/').post(verifyAuth, authorizeRoles("admin"), uploadMulter, createProduct)
router.route('/admin/:id')
    .patch(verifyAuth, authorizeRoles("admin"), updateProduct)
    .delete(verifyAuth, authorizeRoles("admin"), deleteProduct)

router.route('/:productId').get(getProduct)
//reviews
router.route('/reviews/:productId/all').get(getAllReviews)
router.route("/reviews/:productId")
    .post(verifyAuth, createEditReview)
    .delete(verifyAuth, deleteReview)

export default router