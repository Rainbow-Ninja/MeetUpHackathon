const express = require("express");
const router = express.Router();
const passport = require("passport");


////// google oauth routes ///////
router.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
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