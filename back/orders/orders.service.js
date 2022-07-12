const OrdersModel = require("./orders.model");
const mongoose = require("mongoose")
class OrdersService {
    constructor() {
    }

    async createOrder(order) {
        return OrdersModel.create(order);
    }

    async sendGoods(orderID) {
        return OrdersModel.findByIdAndUpdate(orderID, {send: true});
    }

    async createCartGoodsOrder(carts, userInfo, buyerID) {
        const ordersPromises = carts.map(cart => {
            return this.createOrder({
                goodsID: cart.goods._id,
                quantity: cart.quantity,
                buyerID,
                buyerAddress: userInfo.address,
                buyerPhone: userInfo.phone
            })
        });
        return Promise.all(ordersPromises);
    }

    async getBuyerOrders(buyerID) {
        return OrdersModel.aggregate([
            {
                $match: {buyerID: mongoose.Types.ObjectId(buyerID)}
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

    async getSellerOrders(sellerID) {
        console.log(sellerID)
        return OrdersModel.aggregate([
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
                    path: "$goods",
                }
            },
            {
                $match: {
                    "goods.seller": mongoose.Types.ObjectId(sellerID)
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'buyerID',
                    foreignField: '_id',
                    as: 'buyer'
                }
            },
            {
                $unwind: {
                    path: "$buyer"
                }
            }
        ])
    }
}

module.exports = new OrdersService();