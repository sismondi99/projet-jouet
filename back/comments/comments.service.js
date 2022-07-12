const commentsModel = require("./comments.model");
const mongoose = require("mongoose")
class CommentsService {
    constructor() {
    }

    async createComment(comment) {
        return commentsModel.create(comment);
    }

    async findCommentsOfGoods(goodsID) {
        return commentsModel.aggregate([
            {
                $match: {
                    goodsID: mongoose.Types.ObjectId(goodsID)
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'buyerID',
                    foreignField: '_id',
                    as: 'commenter'
                }
            },
            {
                $unwind: {
                    path: '$commenter'
                }
            }
        ])
    }
}

module.exports = new CommentsService();