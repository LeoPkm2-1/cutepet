const userModel = require("../models/userModel");
const register = async (req, res) => {
	const data = await userModel.getAll();
	console.log(data, " data");
	res.send(data);
};
// For View
const login = (req, res) => {
	res.send("login");
};

const logout = (req, res) => {
	res.send("logout");
};
const getAllUser = async (req, res) => {
	const data = await userModel.getAllUsers();
	// console.log(data);
	res.json(data);
};
const getUserByUserName = async (req, res) => {
	const username = req.params.username;
	// console.log(username, "1");
	const test = await userModel.getUserByUsername(username).then((data) => data);
	res.json(test);
	return;
};
module.exports = {
	register,
	login,
	logout,
	getAllUser,
	getUserByUserName,
};
