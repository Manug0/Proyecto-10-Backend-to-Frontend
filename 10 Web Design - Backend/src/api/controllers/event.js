const { deleteFile } = require("../../../utils/deleteFile");
const { verifyJwt } = require("../../../utils/jwt");
const Attendee = require("../models/attendee");
const Event = require("../models/event");
const User = require("../models/user");

const getEvent = async (req, res, next) => {
	try {
		const events = await Event.find().populate("attendees");
		return res.status(200).json(events);
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
};

const getEventById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const events = await Event.findById(id).populate("attendees");
		return res.status(200).json(events);
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
};

const createEvent = async (req, res, next) => {
	try {
		const newEvent = new Event(req.body);
		if (req.file) {
			newEvent.poster = req.file.path;
		}

		const saveEvent = await newEvent.save();

		const user = await User.findById(req.user);
		user.eventsCreated.push(req.event);
		await user.save();

		return res.status(201).json(saveEvent);
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
};

const confirmEvent = async (req, res, next) => {
	try {
		const { name, email } = req.body;
		const attendee = new Attendee({ name, email });
		attendee.eventsConfirmed.push(req.params.id);
		await attendee.save();

		const event = await Event.findById(req.params.id);
		event.attendees.push(attendee);
		await event.save();

		return res.status(200).json({ message: "Te has apuntado al evento", attendee });
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
};

const removeEvent = async (req, res, next) => {
	try {
		const { id } = req.params;
		const deletedEvent = await Event.findByIdAndDelete(id);
		deleteFile(deletedEvent.poster);
		return res.status(200).json({ message: "Evento eliminado", deletedEvent });
	} catch (error) {
		console.log(error);
		return res.status(400).json("error");
	}
};

module.exports = { getEvent, getEventById, createEvent, confirmEvent, removeEvent };
