import * as filestack from 'filestack-js';
const { ImgurClient } = require('imgur');
const client = filestack.init('apikey');
const CLIENT_ID_TEST="5305acf7178e9df";
const CLIENT_SECRET_TEST="f241746b1ad00d1301af67cd57b960ee10d65742";

const url = "https://duhocthanhcong.vn/wp-content/uploads/school-photos/IMG%20Academy/IMG-Academy-Album1.jpg"

export const uploadMedia = async () => {
    const client = new ImgurClient({ clientId:  CLIENT_ID_TEST });
	// client.on("uploadProgress", (progress) => console.log("ahihi", progress));
	const response = await client
		.upload({
			image: url,
			type: "stream",
			disable_audio: "0",
		})
		.catch((err:any) => {
			throw err;
		});
	return response;
};
