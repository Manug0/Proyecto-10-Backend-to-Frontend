const { admin } = require("../../middlewares/admin");
const { auth } = require("../../middlewares/auth");
const uploadFile = require("../../middlewares/uploadFile.js");
const {
	getEvent,
	getEventById,
	createEvent,
	confirmEvent,
	removeEvent,
} = require("../controllers/event");

const eventRouter = require("express").Router();

const uploadConsole = uploadFile("events");

eventRouter.get("/", getEvent);
eventRouter.get("/:id", [auth], getEventById);
eventRouter.post("/add", [auth], uploadConsole.single("poster"), createEvent);
eventRouter.put("/confirm/:id", [auth], confirmEvent);
eventRouter.delete("/:id", [admin], removeEvent);

module.exports = eventRouter;
