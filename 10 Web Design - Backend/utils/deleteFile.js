const cloudinary = require("cloudinary").v2;

const deleteFile = (imgUrl) => {
	const imgSplit = imgUrl.split("/");
	const folderName = imgSplit.at(-2);
	const fieldName = imgSplit.at(-1).split(".");

	const public_id = `${folderName}/${fieldName[0]}`;

	cloudinary.uploader.destroy(public_id, () => {
		console.log("Imagen eliminada");
	});
};

module.exports = { deleteFile };
