const { Response } = require("./../utils");
const { deleteUserToken } = require("./../models/userModel");
const handleLogout = async (req, res) => {
	await deleteUserToken(req.auth_decoded.ma_nguoi_dung);
	res.status(200).send(new Response(200, [], "đăng xuất thành công"));
};

module.exports = {
	handleLogout,
};
