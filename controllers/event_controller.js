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
    let { title, date, startTime, endTime, address, details } = req.body;
    let picture  = req.file.filename;
    console.log(req.file);
    let event = await EventModel.create({ title, date, startTime, endTime, address, details, picture })
        .catch(err => res.status(500).send(err));
    res.redirect("/event");
}

const edit = async (req, res) => {
    let {id} = req.params;
    let event = await EventModel.findById(id)
        .catch(err => res.status(500).send(err))
    res.render("event/edit", {event})
}

const update = async (req, res) => {
    let { id } = req.params
    let { title, date, startTime, endTime, address, details, picture } = req.body
    await EventModel.findByIdAndUpdate(id, {title, date, startTime, endTime, address, details, picture })
        .catch(err => res.status(500).send(err));
    res.redirect(`/event/${id}`)
}

const destroy = async (req, res) => {
    console.log("PARAMS --------- ", req.params);
    let { id } = req.params
    await EventModel.findByIdAndDelete(id)
        .catch(err => res.status(500).send(err));
    res.redirect('/event');
}

module.exports = {
    index,
    make,
    create,
    edit,
    update,
    destroy
}