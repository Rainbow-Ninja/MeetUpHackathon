const express = require("express");
const router = express.Router();
const EventController = require("./../controllers/event_controller");

router.get("/event", EventController.index);

module.exports = router;