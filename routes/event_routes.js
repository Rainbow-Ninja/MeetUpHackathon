const express = require("express");
const router = express.Router();
const EventController = require("./../controllers/event_controller");
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })

router.get("/event", EventController.index);
router.get("/event/new", EventController.make);
router.post("/event", upload.single('picture'), EventController.create);
router.get("/event/edit/:id", EventController.edit);

module.exports = router;