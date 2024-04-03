const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: "events",
		allowedFormats: ["jpg", "png", "jpeg"],
	},
});

const uploadEvent = multer({ storage });
module.exports = uploadEvent;
