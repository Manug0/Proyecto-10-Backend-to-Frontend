const { deleteFile } = require("../../../utils/deleteFile");
const Event = require("../models/event");
const User = require("../models/user");

const getEvent = async (req, res) => {
	try {
		const events = await Event.find().populate("attendees").populate("creator");
		return res.status(200).json(events);
	} catch (error) {
		console.error(error);
		return res.status(400).json(error);
	}
};

const getEventById = async (req, res) => {
	try {
		const { id } = req.params;
		const event = await Event.findById(id).populate("attendees").populate("creator");
		return res.status(200).json(event);
	} catch (error) {
		console.error(error);
		return res.status(400).json(error);
	}
};

const createEvent = async (req, res) => {
	try {
		const { name, date, location, description } = req.body;
		const creator = req.user._id;
		const poster = req.file ? req.file.path : null;

		const newEvent = new Event({ name, date, location, description, poster, creator });
		const savedEvent = await newEvent.save();

		const user = await User.findById(creator);
		user.eventsCreated.push(savedEvent._id);
		await user.save();

		return res.status(201).json(savedEvent);
	} catch (error) {
		console.error(error);
		return res.status(400).json(error);
	}
};

const confirmEvent = async (req, res, next) => {
	try {
		const { name, email } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: "Usuario no encontrado" });
		}

		if (user.eventsConfirmed.includes(req.params.id)) {
			return res.status(400).json({ message: "Ya estás registrado en este evento" });
		}

		user.eventsConfirmed.push(req.params.id);
		await user.save();

		const event = await Event.findById(req.params.id);
		if (!event) {
			return res.status(400).json({ message: "Evento no encontrado" });
		}

		event.attendees.push({ _id: user._id, username: user.username });
		await event.save();

		return res.status(200).json({ message: "Te has apuntado al evento", user });
	} catch (error) {
		console.error(error);
		return res.status(400).json({ message: "Ha ocurrido un error", error });
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
