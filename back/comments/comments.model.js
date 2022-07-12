const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
    goodsID: mongoose.Types.ObjectId,
    buyerID: mongoose.Types.ObjectId,
    content: String,
    score: {
        type: Number,
        default: 0
    },
    createdTime: {
        type: Date,
        default: Date.now
    }
});

const CommentsModel = mongoose.model("comment", CommentsSchema);

module.exports = CommentsModel;