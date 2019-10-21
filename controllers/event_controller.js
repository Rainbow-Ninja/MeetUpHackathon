const EventModel = require("../database/models/event_model");

async function index(req, res) {
    let event = await EventModel.find();
    res.render("event/index", {event});
}

module.exports = {
    index
}