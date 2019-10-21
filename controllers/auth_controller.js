const User = require("../database/models/user_model");

const registerNew = (req, res) => {
    res.render("login/register");
}

const registerCreate = async (req, res) => {
    try{
        console.log("#####################", req.body);
        let {email, password} = req.body;
        let user = await User.create({email, password});
        //req.session.user = user;
        console.log("$$$$$$$$$$$$$$$$$$$$$$ ", user);

    }
    catch(err){
        console.log("-------------------", err);
    }
    
    // res.redirect("/");
    res.send("created");
}

const loginNew = (req, res) => {
    res.render("login/login");
}

const loginCreate = async (req, res) => {
    let {email, password} = req.body;
    let user = await User.findOne({email})
    if(!user) {
        return res.render("login/login", {error: "Invalid user"})
    } 
    
    // const validUser = await user.verifyPassword(password);
    // if(!validUser) {
    //     return res.render("login/login", {error: "Invalid password"});
    // }
    // req.session.user = user;
    // res.redirect("/");
    res.send("LoginCreated");
}

module.exports = {
    registerNew,
    registerCreate,
    loginNew,
    loginCreate
}