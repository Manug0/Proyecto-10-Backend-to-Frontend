const User = require("../models/user");
const { deleteFile } = require("../../../utils/deleteFile");

const getUser = async (req, res, next) => {
	try {
		const user = await User.find().populate("eventsCreated").populate("eventsConfirmed");
		return res.status(200).json(user);
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
};

const userUpdate = async (req, res) => {
	try {
		const { id } = req.params;
		if (req.user._id.toString() !== id) {
			return res.status(400).json("No puedes modificar a alguien que no seas tú mismo");
		}

		const updates = { ...req.body };
		if (req.file) {
			updates.profilePic = req.file.path;
			const oldUser = await User.findById(id);
			deleteFile(oldUser.profilePic);
		}

		const userUpdated = await User.findByIdAndUpdate(id, updates, { new: true });
		return res.status(200).json({ message: "Usuario actualizado", userUpdated });
	} catch (error) {
		console.error(error);
		return res.status(400).json(error);
	}
};

const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedUser = await User.findByIdAndDelete(id);
		if (deletedUser.profilePic) deleteFile(deletedUser.profilePic);
		return res.status(200).json({ message: "Usuario eliminado", deletedUser });
	} catch (error) {
		console.error(error);
		return res.status(400).json(error);
	}
};

module.exports = {
	getUser,
	userUpdate,
	deleteUser,
};
