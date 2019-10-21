const express = require("express");
const router = express.Router();
const EventController = require("./../controllers/event_controller");

router.get("/event", EventController.index);
router.get("/event/new", EventController.make);
router.post("/event", EventController.create);

module.exports = router;