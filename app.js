const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
require("./database/connect");


const app = express();

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`started server on port ${port}`);
});

// mongoose.connect("mongodb://localhost/", { useNewUrlParser: true });
// mongoose.Promise = global.Promise;
// mongoose.connection.on("error", err => console.log(err));

app.engine("handlebars", exphbs({ defaultLayout: "app" }));
app.set("view engine", "handlebars");

app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

app.use(require("./routes/index.js"));