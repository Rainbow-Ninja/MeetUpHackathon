const express = require("express");
const router = express.Router();
const EventController = require("./../controllers/event_controller");
const multer  = require('multer')
const upload = multer({ dest: 'public/upload/' })

router.get("/event", EventController.index);
router.get("/event/new", EventController.make);
router.post("/event", upload.single('picture'), EventController.create);
router.get("/event/:id", EventController.show);
router.get("/event/edit/:id", EventController.edit);
router.put("/event/:id", EventController.update);
router.delete("/event/:id", EventController.destroy);

module.exports = router;