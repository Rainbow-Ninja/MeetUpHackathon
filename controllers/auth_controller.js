const User = require("../database/models/user_model");
const jwt = require("jsonwebtoken");
const EventModel = require("../database/models/event_model");

async function welcome(req, res) {
    let event = await EventModel.find();
    res.render("welcome", {event});
}

const registerNew = (req, res) => {
    res.render("login/register");
}

const registerCreate = async (req, res) => {
    try {
        let {
            email,
            password
        } = req.body;
        let user = await User.create({
            email,
            password
        });

    } catch (err) {
        console.log("catching register creation error", err);
    }
    res.send("created");
}

const loginNew = (req, res) => {
    res.render("login/login");
}

const loginCreate =  (req, res) => {
    try {
    const token = jwt.sign({
        sub: req.user._id
    }, 'secretkey');
    console.log("token", token);
    res.cookie('jwt', token);
    res.redirect('/')
} catch (err) {
    console.log('---------------  catching a JWT token error logging', err)
};
    // sign the user details to generate json web token
}
const logout = (req, res) => {
    req.logout();
    res.cookie('jwt', null, {
        maxAge: -1
    });
    res.redirect("/");
}


module.exports = {
    welcome,
    registerNew,
    registerCreate,
    loginNew,
    loginCreate,
    logout
}