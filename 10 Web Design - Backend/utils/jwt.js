const jwt = require("jsonwebtoken");

const generateSecret = (id) => {
	return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "60d" });
};

const verifyJwt = (token) => {
	return jwt.verify(token, process.env.SECRET_KEY);
};

module.exports = { generateSecret, verifyJwt };
