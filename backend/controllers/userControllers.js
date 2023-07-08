const userModel = require("../models/userModel");

// const getAllUser = async (req, res) => {
// 	const data = await userModel.getAllUsers();
// 	// console.log(data);
// 	res.json(data);
// };
const getUserByUserName = async (req, res) => {
	const username = req.params.username;
	// console.log(username, "1");
	const test = await userModel.getUserByUsername(username).then((data) => data);
	res.json(test);
	return;
};
module.exports = {
	getUserByUserName,
};
