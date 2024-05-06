const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const uploadFile = (folder) => {
	const storage = new CloudinaryStorage({
		cloudinary: cloudinary,
		params: {
			folder: folder,
			allowedFormats: ["jpg", "png", "jpeg"],
		},
	});

	return multer({ storage });
};

module.exports = uploadFile;
