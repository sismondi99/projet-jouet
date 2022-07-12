const express = require('express');

const {  verifySeller, verifyUser } = require("../middleware/auth")
const GoodsController = require("./goods.controller");

const router = express.Router();

router.post("", verifySeller, GoodsController.createGoods);
router.get("", verifyUser, GoodsController.getAllGoods);
router.get("/query/:query", GoodsController.searchGoods);
router.get("/:id", GoodsController.getGoodsDetail);
router.put("/:id", verifySeller, GoodsController.updateGoods);
router.delete("/:id", verifySeller, GoodsController.removeGoods);
router.get("/seller/all", verifySeller, GoodsController.getGoodsOfSeller);

module.exports = router;
