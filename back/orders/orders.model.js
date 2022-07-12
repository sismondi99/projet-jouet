const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
    goodsID: mongoose.Types.ObjectId,
    quantity: Number,
    buyerID: mongoose.Types.ObjectId,
    buyerAddress: String,
    buyerPhone: String,
    send: {
        type: Boolean,
        default: false
    },
    createdTime: {
        type: Date,
        default: Date.now
    }
});

const OrdersModel = mongoose.model("order", OrdersSchema);

module.exports = OrdersModel;