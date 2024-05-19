const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateSecret } = require("../../../utils/jwt");

const registerUser = async (req, res) => {
	try {
		const { username, password, email } = req.body;
		const existingUser = await User.findOne({ $or: [{ username }, { email }] });
		if (existingUser) {
			return res.status(400).json({ message: "El nombre de usuario o email ya existe" });
		}

		const newUser = new User({ username, password, email, rol: "user" });
		if (req.file) newUser.profilePic = req.file.path;
		const saveUser = await newUser.save();
		return res.status(201).json(saveUser);
	} catch (error) {
		console.error(error);
		return res.status(400).json(error);
	}
};

const loginUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		if (!user || !bcrypt.compareSync(password, user.password)) {
			return res.status(400).json("Usuario o contraseña incorrectos");
		}
		const token = generateSecret(user._id);
		return res.status(200).json({ user, token });
	} catch (error) {
		console.error(error);
		return res.status(400).json(error);
	}
};

module.exports = { registerUser, loginUser };
