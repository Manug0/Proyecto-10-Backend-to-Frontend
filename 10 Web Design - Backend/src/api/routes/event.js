const { admin } = require("../../middlewares/admin");
const { auth } = require("../../middlewares/auth");
const uploadEvent = require("../../middlewares/eventFile");
const {
	getEvent,
	getEventById,
	createEvent,
	confirmEvent,
	removeEvent,
} = require("../controllers/event");

const eventRouter = require("express").Router();

eventRouter.get("/", getEvent);
eventRouter.get("/:id", [auth], getEventById);
eventRouter.post("/add", [auth], uploadEvent.single("poster"), createEvent);
eventRouter.put("/confirm/:id", [auth], confirmEvent);
eventRouter.delete("/:id", [admin], removeEvent);

module.exports = eventRouter;
