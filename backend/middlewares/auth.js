const { vertifyJWT } = require("./../utils/loginHelper");
const userModel = require("./../models/userModel");

const { Response } = require("./../utils");

const getToken = (req) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	return token;
};

const requireLogined = async (req, res, next) => {
	const jwtToken = getToken(req);
	let [decodeStatus, decoded] = [true, []];
	if (jwtToken) {
		[decodeStatus, decoded] = vertifyJWT(jwtToken);
		const user = await userModel.getUserById(decoded.ma_nguoi_dung);
		if (user.payload[0].token !== jwtToken) {
			[decodeStatus, decoded] = [false, []];
		}
	} else {
		decodeStatus = false;
	}
	if (decodeStatus) {
		// store userlogin infor for future
		req.auth_decoded = {
			...decoded,
		};
		next();
		return;
	} else {
		// có dấu hiệu của việc sử dung jwt sai
		res.status(301).json(
			new Response(301, [], "chuyển hướng tới trang đăng nhập")
		);
	}
};

const nonRequireLogined = (req, res, next) => {
	const jwtToken = getToken(req);
	let [decodeStatus, decoded] = [true, []];
	if (jwtToken === undefined) {
		next();
		return;
	} else {
		[decodeStatus, decoded] = vertifyJWT(jwtToken);
	}

	if (!decodeStatus) {
		next();
		return;
	} else {
		res.status(400).json(new Response(400, [], "cần đăng xuất ra trước"));
	}
};

module.exports = { requireLogined, nonRequireLogined };
