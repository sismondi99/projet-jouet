const express = require("express");

const OrdersController = require("./orders.controller");
const {verifyUser, verifySeller} = require("../middleware/auth");
const router = express.Router();

router.get("", verifyUser, OrdersController.getBuyerOrders);
router.get("/seller", verifySeller, OrdersController.getSellerOrders);
router.post("", verifyUser, OrdersController.buyGoods);
router.post("/carts", verifyUser, OrdersController.buyCartGoods);
router.put("/send/:orderID", verifySeller, OrdersController.sendGoods);

module.exports = router;