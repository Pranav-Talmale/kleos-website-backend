const asyncHandler = require("express-async-handler");
const Event = require("../models/eventModel.js");
const User = require("../models/userModel.js");

/*

1. Retrieve Events
2. Display Event
3. Register for Event
4. Admin View ???

*/

const retrieveEvents = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id); // req.body.id for testing
    const filter = req.body.filter

    if (filter === "registered") {
        
        const eventIds = user.events;

        const events = await Event.find({ _id: { $in: eventIds } }, 'title date desc');

        res.json(events);
    }
    else if (filter === "upcoming") {
      
        const upcomingEvents = await Event.find({ upcoming: true });

        res.json(upcomingEvents);
    } 
    else {
        
        const events = await Event.find({});
        res.json(events);
    }
});

const displayEvent = asyncHandler(async (req, res) => {
    
});

const registerEvent = asyncHandler(async (req, res) => {
    

});

/*const createEvent = asyncHandler(async (req, res) => {
    const { title, date, desc, price, content, src, upcoming, participants } = req.body;
  
    // Validate required fields
    if (!title || !date || !desc || !price || !content || !src || upcoming === undefined) {
      res.status(400);
      throw new Error("Please add all required fields");
    }
  
    // Create a new event
    const event = await Event.create({
      title,
      date,
      desc,
      price,
      content,
      src,
      upcoming,
      participants: participants || [],
    });
  
    if (event) {
      res.status(201).json(event);
    } else {
      res.status(400);
      throw new Error("Invalid event data");
    }
  });
  */

  module.exports = { retrieveEvents };

