const mongoose = require("mongoose");
const EventSchema = require("../schemas/event_schema");
const Event = mongoose.model("Event", EventSchema);

module.exports = Event;