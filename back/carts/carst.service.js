const cartsModel = require("./carts.model");
const mongoose = require("mongoose");
class CarstService {
    constructor() {
    }


    async getGoodsOfCart(buyerID) {
        return cartsModel.aggregate([
            {
                $match: { buyerID: mongoose.Types.ObjectId(buyerID) }
            },
            {
                $lookup: {
                    from: 'goods',
                    localField: 'goodsID',
                    foreignField: '_id',
                    as: 'goods'
                }
            },
            {
                $unwind: {
                    path: '$goods'
                }
            }
        ])
    }

    async addGoodsToCarts(cartNote) {
        return cartsModel.create(cartNote);
    }

    async updateGoodsQuantityOfCarts(id, newQuantity) {
        return cartsModel.findByIdAndUpdate(id, { quantity: newQuantity });
    }

    async removeGoodsFromCart(ids) {
        return cartsModel.deleteMany({
            _id: {
                $in: ids
            }
        })
    }
}

module.exports = new CarstService();