import { Router } from "express";
import { allOrders, deleteOrder, getSingleOrderItem, myOrders, newOrder, updateOrderStatus } from "../controllers/order.controller.js";
import { authorizeRoles, verifyAuth } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/create").post(verifyAuth ,newOrder)
router.route("/:orderId").get(verifyAuth, getSingleOrderItem)
router.route("/my/list").get(verifyAuth, myOrders)
router.route("/admin/all").get(verifyAuth, authorizeRoles("admin"), allOrders)
router.route("/admin/update/:orderId").post(verifyAuth, authorizeRoles("admin"), updateOrderStatus)
router.route("/admin/update/:orderId").post(verifyAuth, authorizeRoles("admin"), deleteOrder)
export default router