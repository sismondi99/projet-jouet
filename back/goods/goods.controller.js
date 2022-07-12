const path = require("path");
const goodsService = require("./goods.service");

class GoodsController {
    constructor() {
    }

    async getGoodsOfSeller(req, res) {
        try {
            const seller = req.user;

            const goods = await goodsService.findSellerGoods(seller.id);
            res.status(200).json(goods);
        } catch (err) {
            console.log(err)
            res.status(500).send(err);
        }
    }

    async searchGoods(req, res) {
        try {
            const { query } = req.params;
            const goods = await goodsService.findGoods(query);
            res.status(200).json(goods);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async getAllGoods(req, res) {
        try {
            const goods = await goodsService.findGoods();
            res.status(200).json(goods);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async getGoodsDetail(req, res) {
        try {
            const {id} = req.params;
            const goods = await goodsService.findOneGood(id);
            res.status(200).json(goods);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async createGoods(req, res) {
        try {
            let imagePaths = [],
                imageNames = [];
            const user = req.user,
                  uploadPath = `/images`,
                  goods = req.body;

            // save images and get its path
            imageNames = req.body.imageNames.split(",");
            await Promise.all(imageNames.map(imageName => {
                return new Promise((resolve, reject) => {
                    const file = req.files[imageName];
                    const filePath = uploadPath + '/' + req.user.id + Date.now() + ".jpg";
                    const mvPath = path.resolve(__dirname, '../public/' + filePath);
                    file.mv(mvPath, function (err) {
                        if (err) return reject(err);
                        imagePaths.push(filePath);
                        resolve();
                    })
                })
            }));

            goods.images = imagePaths;
            goods.seller = user.id;

            await goodsService.createGoods(goods);

            res.status(200).json({msg: 'ok'});
        } catch (err) {
            console.log(err)
            res.status(500).send(err);
        }
    }


    async updateGoods(req, res) {
        try {
            let imagePaths = [],
                imageNames = [];
            const user = req.user,
                  uploadPath = '/images',
                  goods = req.body,
                  goodsId = req.params.id;


            // save images and get its path
            imageNames = req.body.imageNames.split(",");
            await Promise.all(imageNames.map(imageName => {
                return new Promise((resolve, reject) => {
                    const file = req.files[imageName];
                    const filePath = uploadPath + '/' + req.user.id + Date.now() + ".jpg";
                    const mvPath = path.resolve(__dirname, '../public/' + filePath);
                    file.mv(mvPath, function (err) {
                        if (err) return reject(err);
                        imagePaths.push(filePath);
                        resolve();
                    })
                })
            }));

            goods.images = imagePaths;
            goods.seller = user.id;
            await goodsService.updateGoods(goodsId, goods);
            res.status(200).json({msg: 'ok'});
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async removeGoods(req, res) {
        try {
            const {id} = req.params;
            const user = req.user;
            const goods = await goodsService.findOneGood(id);
            if (user.id !== goods.seller.toString()) {
                return res.status(403).send("Forbidden");
            }
            await goodsService.removeGoods(id);
            res.status(200).send({msg: 'ok'});
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = new GoodsController();