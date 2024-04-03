const { getAttendee, getAttendeeById, deleteAttendee } = require("../controllers/attendee");
const { admin } = require("../../middlewares/admin");
const { auth } = require("../../middlewares/auth");

const attendeeRouter = require("express").Router();

attendeeRouter.get("/", [auth], getAttendee);
attendeeRouter.get("/:id", [admin], getAttendeeById);
attendeeRouter.delete("/:id", [admin], deleteAttendee);

module.exports = attendeeRouter;
