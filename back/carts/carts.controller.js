const cartsService = require("./carst.service");

class CartsController {
    constructor() {
    }

    async getGoodsOfCart(req, res) {
        try {
            const buyer = req.user;
            const goods = await cartsService.getGoodsOfCart(buyer.id);
            res.status(200).json(goods);
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }

    async addGoodsToCart(req, res) {
        try {
            const buyer = req.user;
            const cartNote = req.body;
            cartNote.buyerID = buyer.id;
            await cartsService.addGoodsToCarts(cartNote);
            res.status(200).json({
                msg: 'ok'
            });
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }

    async updateGoodsQuantityOfCarts(req, res) {
        try {
            const { cartID, quantity } = req.body;
            await cartsService.updateGoodsQuantityOfCarts(cartID, quantity);
            res.status(200).json({
                msg: 'ok'
            })
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }

    async removeGoodsFromCarts(req, res) {
        try {
            const {ids} = req.body;
            await cartsService.removeGoodsFromCart(ids);
            res.status(200).json({
                msg: 'ok'
            })
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }
}

module.exports = new CartsController();