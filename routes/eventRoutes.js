const express = require("express");
const router = express.Router();
const { retrieveEvents } = require("../controllers/eventController.js");

//router.post("/create", createEvent);
router.post("/",retrieveEvents)

module.exports = router;
