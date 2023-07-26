const { Response } = require("./../utils");

const handleLogout = (req, res) => {
	if (req.cookies.auth_) {
		res.clearCookie("auth_", { httpOnly: true, encode: String });
	}
	res.status(200).send(new Response(200, [], "đăng xuất thành công"));
};

module.exports = {
	handleLogout,
};
