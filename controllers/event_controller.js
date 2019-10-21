const EventModel = require("../database/models/event_model");

async function index(req, res) {
    let event = await EventModel.find();
    res.render("event/index", {event});
}

function make (req, res) {
    res.render("event/new");
}

async function create(req, res) {
    console.log("#################### ", req.body);
    let { title, date, startTime, endTime, details } = req.body;
    let event = await EventModel.create({ title, date, startTime, endTime, details })
        .catch(err => res.status(500).send(err));
    res.redirect("/event");
}

module.exports = {
    index,
    make,
    create
}