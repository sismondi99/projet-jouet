const commentsService = require("./comments.service");

class CommentsController{
    constructor() {
    }

    async comment(req, res) {
        try {
            const commenter = req.user;
            const {goodsID, content, score} = req.body;
            await commentsService.createComment({
                goodsID,
                content,
                score,
                buyerID: commenter.id
            });
            res.status(200).json({
                msg: 'ok'
            })
        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }
}

module.exports = new CommentsController();