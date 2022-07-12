const mongoose = require("mongoose");

const CartsSchema = new mongoose.Schema({
    buyerID: mongoose.Types.ObjectId,
    goodsID: mongoose.Types.ObjectId,
    quantity: Number
});

const CartsModel = mongoose.model("cart", CartsSchema);

module.exports = CartsModel;