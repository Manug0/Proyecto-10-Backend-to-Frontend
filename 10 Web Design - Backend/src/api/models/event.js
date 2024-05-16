const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		date: { type: String, required: true },
		location: { type: String, required: true },
		description: { type: String, required: false },
		poster: { type: String, required: false },
		attendees: [{ type: mongoose.Types.ObjectId, required: false, ref: "attendees" }],
		// users: [{ type: mongoose.Types.ObjectId, required: false, ref: "users" }],
	},
	{
		timestamps: true,
		collection: "events",
	}
);

const Event = mongoose.model("events", eventSchema, "events");

module.exports = Event;
