const ordersService = require("./orders.service");
const cartService = require("../carts/carst.service")
class OrdersController {
    constructor() {
    }

    async sendGoods(req, res) {
        try {
            const {orderID} = req.params;
            await ordersService.sendGoods(orderID);
            res.status(200).json({msg: 'ok'});
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }

    async getSellerOrders(req, res) {
        try {
            const seller = req.user;
            const orders = await  ordersService.getSellerOrders(seller.id);
            orders.sort((prev, next) => {
                return next.send ? 1 : -1;
            })
            res.status(200).json(orders);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }

    async getBuyerOrders(req, res) {
        try {
            const buyer = req.user;
            const orders = await ordersService.getBuyerOrders(buyer.id);
            res.status(200).json(orders);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }

    }

    async buyGoods(req, res) {
        try {
            const buyer = req.user;
            const order = req.body;
            order.buyerID = buyer.id;
            await ordersService.createOrder(order);
            res.status(200).json({msg: 'ok'});
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }

    async buyCartGoods(req, res) {
        try {
            const buyer = req.user;
            const { carts, userInfo } = req.body;
            await ordersService.createCartGoodsOrder(carts, userInfo, buyer.id);
            await cartService.removeGoodsFromCart(carts.map(item => item._id));
            res.status(200).json({msg: 'ok'});
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }
}

module.exports = new OrdersController();