const User = require("../models/user");
const { deleteFile } = require("../../../utils/deleteFile");

const getUser = async (req, res, next) => {
	try {
		const user = await User.find().populate("eventsCreated");
		return res.status(200).json(user);
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
};

const userUpdate = async (req, res, next) => {
	try {
		const { id } = req.params;

		delete req.body.rol;

		const newUser = await User(req.body);
		newUser._id = id;

		if (req.user._id.toString() !== id) {
			return res.status(400).json("No puedes modificar a alguien que no seas tu mismo");
		}

		if (req.file) {
			updateUser.profilePic = req.file.path;
			const oldUser = await User.findById(id);
			deleteFile(oldUser.profilePic);
		}

		const userUpdated = await User.findByIdAndUpdate(id, newUser, {
			new: true,
		});

		return res.status(200).json({ message: "Usuario actualizado", userUpdated });
	} catch (error) {
		console.log(error);
		return res.status(400).json("error");
	}
};

const deleteUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const deletedUser = await User.findByIdAndDelete(id);
		deleteFile(deletedUser.profilePic);
		return res.status(200).json({ mensaje: "Usuario eliminado", deletedUser });
	} catch (error) {
		return res.status(400).json(error);
	}
};

module.exports = {
	getUser,
	userUpdate,
	deleteUser,
};
