const express = require("express");
const cartsController = require("./carts.controller");
const {verifyUser} = require("../middleware/auth")

const router = express.Router();

router.get("", verifyUser, cartsController.getGoodsOfCart);
router.post("", verifyUser, cartsController.addGoodsToCart);
router.put("", verifyUser, cartsController.updateGoodsQuantityOfCarts);
router.delete("", verifyUser, cartsController.removeGoodsFromCarts);

module.exports = router;