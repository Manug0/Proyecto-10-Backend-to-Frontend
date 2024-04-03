const User = require("../api/models/user");
const { verifyJwt } = require("../../utils/jwt");

const auth = async (req, res, next) => {
	try {
		const token = req.headers.authorization;

		if (!token) {
			return res.status(400).json("Tienes que estar conectado para realizar esta función");
		}

		const parsedToken = token.replace("Bearer ", "");
		const { id } = verifyJwt(parsedToken);
		const user = await User.findById(id);

		user.password = null;
		req.user = user;
		next();
	} catch (error) {
		console.log(error);
		return res.status(400).json(error);
	}
};

module.exports = { auth };
