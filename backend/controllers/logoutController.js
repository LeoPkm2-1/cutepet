const handleLogout = (req, res) => {
	if (req.cookies.auth_) {
		res.clearCookie("auth_", { httpOnly: true, encode: String });
	}
	res.status(200).send("end");
};

module.exports = {
	handleLogout,
};
