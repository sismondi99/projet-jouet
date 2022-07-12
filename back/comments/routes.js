const express = require("express");
const { verifyUser } = require("../middleware/auth");
const commentsController = require("./comments.controller");

const router = express.Router();

router.post("", verifyUser,commentsController.comment);

module.exports = router;

