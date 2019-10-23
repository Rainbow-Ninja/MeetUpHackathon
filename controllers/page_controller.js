
const mongoose = require('mongoose')
const Event = require('../database/models/event_model')

const index = (req, res) => {
  res.render("page/index");
}

const dashboard = (req, res) => {
  // note: req.session is not accessible in handlebars, hence it needs to be passed as an object to the handlebar
  let {email, name } = req.user
  Event.find({user: req.user.id})
    .then(events =>{
      res.render('page/dashboard', {
        events: events,
        email,
        name
      });
    })

 
}

module.exports = {
  index,
  dashboard
}