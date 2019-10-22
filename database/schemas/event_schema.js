const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    details: {
        type: String,
        default: ""
    },
    picture: {
        type: String,
        required: true
    }
});

module.exports = EventSchema;