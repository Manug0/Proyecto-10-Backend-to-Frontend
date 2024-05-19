const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true },
		password: { type: String, required: true },
		email: { type: String, required: true },
		profilePic: { type: String, required: false },
		eventsCreated: [{ type: mongoose.Types.ObjectId, ref: "Event" }],
		eventsConfirmed: [{ type: mongoose.Types.ObjectId, ref: "Event" }],
		rol: {
			type: String,
			required: true,
			default: "user",
			enum: ["admin", "user"],
		},
	},
	{
		timestamps: true,
		collection: "users",
	}
);

userSchema.pre("save", function () {
	this.password = bcrypt.hashSync(this.password, 12);
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
