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

module.exports = {
    registerNew,
    registerCreate,
    loginNew
}