require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { connectDB } = require("./src/config/db");
const userRouter = require("./src/api/routes/user");
const authRouter = require("./src/api/routes/auth");
const eventRouter = require("./src/api/routes/event");
const cloudinary = require("cloudinary").v2;

const app = express();

app.use(cors());

app.use(
	cors({
		origin: "http://localhost:5173",
	})
);

connectDB();

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/users", userRouter);

app.use("*", (req, res, next) => {
	return res.status(404).json("Route not found");
});

app.listen(3000, () => {
	console.log("http://localhost:3000");
});
