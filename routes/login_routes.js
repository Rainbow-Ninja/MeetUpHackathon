const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth_controller");

router.get('/', (req, res) => {
    res.render('welcome');
});

router.get("/register", AuthController.registerNew);
router.post("/register", AuthController.registerCreate);

router.get("/login", AuthController.loginNew);
router.post("/login", AuthController.loginCreate);

module.exports = router;