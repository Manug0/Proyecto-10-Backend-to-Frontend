const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		date: { type: String, required: true },
		location: { type: String, required: true },
		description: { type: String, required: false },
		poster: { type: String, required: false },
		attendees: [{ type: mongoose.Types.ObjectId, ref: "User" }],
		creator: { type: mongoose.Types.ObjectId, ref: "User" },
	},
	{
		timestamps: true,
		collection: "events",
	}
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
