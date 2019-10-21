const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const mongoose = require("mongoose");

const app = express();

const port = 3000;

app.engine("handlebars", exphbs({ defaultLayout: "app" }));
app.set("view engine", "handlebars");

app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

app.use(require("./routes"));

app.use(express.static("public"));



app.listen(port, () => console.log(`Listening on port ${port}`));

// app.listen(port, () => console.log(`Listening on port ${port}`));
module.exports = app;