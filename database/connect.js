const mongoose = require("mongoose");
const keys = require('../config/keys')

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.connection.on("error", console.log);
