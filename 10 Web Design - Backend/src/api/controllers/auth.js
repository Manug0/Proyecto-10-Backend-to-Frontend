const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateSecret } = require("../../../utils/jwt");

const registerUser = async (req, res, next) => {
	try {
		const newUser = new User(req.body);
		req.body.rol = "user";

		if (req.file) {
			newUser.profilePic = req.file.path;
		}

		const userDuplicated = await User.findOne({
			username: req.body.username,
		});

		if (userDuplicated) {
			console.log("El nombre de usuario ya existe");
		}

		const saveUser = await newUser.save();

		return res.status(201).json(saveUser);
	} catch (error) {
		return res.status(400).json(error);
	}
};

const loginUser = async (req, res, next) => {
	try {
		const user = await User.findOne({ username: req.body.username });

		if (user) {
			if (bcrypt.compareSync(req.body.password, user.password)) {
				const token = generateSecret(user._id);
				return res.status(200).json({ user, token });
			} else {
				return res.status(400).json("Usuario o contraseña incorrectos");
			}
		} else {
			return res.status(400).json("Usuario o contraseña incorrectos");
		}
	} catch (error) {
		return res.status(400).json(error);
	}
};

module.exports = { registerUser, loginUser };
