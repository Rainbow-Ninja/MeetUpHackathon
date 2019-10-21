const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/meetup_hack", { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.connection.on("error", console.log);
