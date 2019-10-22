const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth_controller");
const passport = require("passport");
const {
    authRedirect,
    authorize
} = require("../middleware/auth_middleware");


router.get('/', AuthController.welcome);

//  Register routes 
router.get("/register", authRedirect, AuthController.registerNew);
router.post("/register", AuthController.registerCreate);

// login routes
router.get("/login", AuthController.loginNew);
router.post("/login", passport.authenticate('local', {
    failureRedirect: '/login',
    session: false
}), AuthController.loginCreate)

// logout routes
router.get("/logout", AuthController.logout);
router.get("/dashboard", passport.authenticate('jwt', {
    session: false
}));






module.exports = router;