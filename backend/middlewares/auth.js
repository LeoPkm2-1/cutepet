const { vertifyJWT } = require("./../utils/loginHelper");

const requireLogined = (req, res, next) => {
	const jwtToken = req.cookies.auth_;
	let [decodeStatus, decoded] = [true, []];
	if (jwtToken) {
		[decodeStatus, decoded] = vertifyJWT(jwtToken);
	} else {
		decodeStatus = false;
	}
	if (decodeStatus) {
		next();
		return;
	} else {
		// có dấu hiệu của việc sử dung jwt sai
		res.status(301).json({
			status: 301,
			payload: [],
			message: "redirect to login page",
		});
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
		res.status(400).json({
			status: 400,
			payload: [],
			message: "must logout first",
		});
	}
};

module.exports = { requireLogined, nonRequireLogined };
