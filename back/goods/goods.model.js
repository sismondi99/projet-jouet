const mongoose = require("mongoose");

const GoodsSchema = new mongoose.Schema({
   title: String,
   price: Number,
   introduction: String,
   images: [String],
   sales: {
      type: Number,
      default: 0
   },
   seller: mongoose.Types.ObjectId,
   createdTime: {
      type: Date,
      default: Date.now
   }
});

const GoodsModel = mongoose.model("goods", GoodsSchema);

module.exports = GoodsModel;