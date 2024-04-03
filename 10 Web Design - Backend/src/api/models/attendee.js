const mongoose = require("mongoose");

const attendeesSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		eventsConfirmed: [{ type: mongoose.Types.ObjectId, required: false, ref: "events" }],
	},
	{
		timestamps: true,
		collection: "attendees",
	}
);

const Attendee = mongoose.model("attendees", attendeesSchema, "attendees");

module.exports = Attendee;
