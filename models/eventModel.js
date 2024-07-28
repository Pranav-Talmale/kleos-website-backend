const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(

    {
      title: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        required: true
      },
      desc: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      src: {
        type: String,
        required: true
      },
      upcoming: {

        type: Boolean,
        required: true
      },
      participants: {

        type: [String],
        required: false
      }
})
      
const Event = mongoose.model("Event", eventSchema);
module.exports = Event;  