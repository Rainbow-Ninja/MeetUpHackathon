const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = require('./user_schema')

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
        // required: true
    },
    endTime: {
        type: String,
        // required: true
    },
    address: {
        type: String,
        // required: true
    },
    details: {
        type: String,
        default: ""
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "users"
    },
  
});

module.exports = EventSchema;