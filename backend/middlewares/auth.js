const { vertifyJWT } = require("./../utils/loginHelper");
const { Response } = require("./../utils");

const requireLogined = (req, res, next) => {
	const jwtToken = req.cookies.auth_;
	let [decodeStatus, decoded] = [true, []];
	if (jwtToken) {
		[decodeStatus, decoded] = vertifyJWT(jwtToken);
	} else {
		decodeStatus = false;
	}
	if (decodeStatus) {
		// store userlogin infor for future
		req.auth_decoded = {
			...decoded,
		};
		// console.log(req.auth_decoded);
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
	const jwtToken = req.cookies.auth_;
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
