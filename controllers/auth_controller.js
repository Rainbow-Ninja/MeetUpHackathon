const User = require("../../database/models/user_model");

const registerNew = (req, res) => {
    // res.send("RegisterNew");
    res.render("/register");
}

const registerCreate = async (req, res) => {
    let {email, password} = req.body;
    let user = await User.create({email, password});
    req.session.user = user
    console.log(user);
    // res.redirect("/");
    res.send("created");
}

module.exports = {
    registerNew,
    registerCreate
}