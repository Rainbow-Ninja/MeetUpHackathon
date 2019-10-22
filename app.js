// middlewares required
const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');

const path = require("path")


require("./database/connect");
const app = express();

// creating port
var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`started server on port ${port}`);
});

// connect mongo
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { expires: 600000 },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// setting up cookie-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());


// passport setup and require passport file
require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// method override
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//static files

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')))
app.use('/event', express.static(path.join(__dirname, 'public')))


// requiring routes files
app.use(require("./routes/login_routes"));
app.use(require("./routes/event_routes"));
app.use(require('./routes/auth_routes'));

module.exports = app;