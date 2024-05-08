const imgbbUploader = require("imgbb-uploader");
const { readENV } = require("./index");

imgbbUploader(readENV("API_KEY"), "./../media/72738.jpg")
	.then((res) => console.log(res))
	.catch((err) => console.log(err));
