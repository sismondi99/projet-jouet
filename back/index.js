require('dotenv').config();
const mongoose = require("mongoose");
const app = require("./app");
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URL)


app.listen(PORT);