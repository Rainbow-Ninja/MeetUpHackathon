const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth_controller");
const passport = require("passport");
const {
    authRedirect,
    authorize
} = require("../middleware/auth_middleware");


router.get('/', (req, res) => {
    res.render('welcome');
});

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



////// google oauth routes ///////
router.get('/auth/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login']
    }));
router.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        res.redirect('/');
    });
/////////////////////////



module.exports = router;