const User = require("../api/models/user");
const { verifyJwt } = require("../../utils/jwt");

const auth = async (req, res, next) => {
	try {
		const token = req.headers.authorization;

		if (!token) {
			return res.status(401).json("Tienes que estar conectado para realizar esta función");
		}

		const parsedToken = token.replace("Bearer ", "");
		const decoded = verifyJwt(parsedToken);

		if (!decoded || !decoded.id) {
			return res.status(401).json("Token inválido o no proporcionado");
		}

		const user = await User.findById(decoded.id);

		if (!user) {
			return res.status(404).json("Usuario no encontrado");
		}

		user.password = undefined;
		req.user = user;
		next();
	} catch (error) {
		console.log(error);
		return res.status(500).json("Error en la autenticación");
	}
};

module.exports = { auth };
