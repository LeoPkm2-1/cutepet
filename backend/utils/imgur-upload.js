// CommonJS syntax
const { ImgurClient } = require("imgur");
const { readENV } = require("./index");
const { createReadStream } = require("node:fs");
const client = new ImgurClient({ clientId: readENV("CLIENT_ID_TEST") });

const uploadMedia = async (path, turnOffSound = 1) => {
	client.on("uploadProgress", (progress) => console.log("ahihi", progress));
	const response = await client
		.upload({
			image: createReadStream(path),
			type: "stream",
			disable_audio: turnOffSound,
		})
		.catch((err) => {
			throw err;
		});
	return response;
};
module.exports = { uploadMedia };
