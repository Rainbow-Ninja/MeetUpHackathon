const User = require("../database/models/user_model");

const registerNew = (req, res) => {
    res.send("Register");
    // res.render("login/register");
}

module.exports = {
    registerNew
}