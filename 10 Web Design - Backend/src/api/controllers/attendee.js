const Attendee = require("../models/attendee");

const getAttendee = async (req, res, next) => {
	try {
		const attendee = await Attendee.find();
		return res.status(200).json(attendee);
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
};

const getAttendeeById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const attendees = await Attendee.findById(id);
		return res.status(200).json(attendees);
	} catch (error) {
		return res.status(400).json(error);
	}
};

const deleteAttendee = async (req, res, next) => {
	try {
		const { id } = req.params;
		const deletedAttendee = await Attendee.findByIdAndDelete(id);
		return res.status(200).json({ mensaje: "Usuario eliminado", deletedAttendee });
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
};

module.exports = { getAttendee, getAttendeeById, deleteAttendee };
