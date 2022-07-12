const GoodsModel = require("./goods.model");
const mongoose = require("mongoose");

class GoodsService {
    constructor() {
        this.commentService = require("../comments/comments.service");
    }

    async findSellerGoods(id) {
        return GoodsModel.find({seller: new mongoose.Types.ObjectId(id)})
    }

    async findGoods(query = '') {
        const regex = new RegExp(`.*${query}.*`);
        return GoodsModel.find({ title: {$regex: regex} });
    }

    async findOneGood(id) {

        const goods = await GoodsModel.findById(id).lean();
        const comments = await this.commentService.findCommentsOfGoods(id);
        goods.comments = comments;
        return goods;
    }

    async createGoods(goods) {
        return GoodsModel.create(goods);
    }

    async updateGoods(id, goods) {
        return GoodsModel.findByIdAndUpdate(id, goods);
    }

    async removeGoods(id) {
        return GoodsModel.findByIdAndDelete(id);
    }

}

module.exports = new GoodsService();