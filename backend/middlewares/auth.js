const { vertifyJWT } = require("./../utils/loginHelper");
const userModel = require("./../models/userModel");
const { Response } = require("./../utils");

const NOT_HAVING_AUTH_INFOR = "not having authentication infor";
const NOT_VERTIFIED = "NOT VERTIFIED";
const TOKEN_NOT_MATCH = "TOKEN NOT MATCH";
const REDIRECT_TO_LOGIN_MESS = "chuyển hướng tới trang đăng nhập";
const MUST_LOGOUT = "cần đăng xuất ra trước";

const getToken = (req) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	return token;
};

const requireLogined = async (req, res, next) => {
	try {
		const jwtToken = getToken(req);
		let [decodeStatus, decoded] = [true, []];
		if (!jwtToken) {
			decodeStatus = false;
			throw new Error(NOT_HAVING_AUTH_INFOR);
		}
		[decodeStatus, decoded] = vertifyJWT(jwtToken);
		// console.log("hehehe:", decodeStatus);
		if (decodeStatus === false) {
			throw new Error(NOT_VERTIFIED);
		} else {
			const user = await userModel.getUserById(decoded.ma_nguoi_dung);
			if (user.payload[0].token !== jwtToken) {
				[decodeStatus, decoded] = [false, []];
				throw new Error(TOKEN_NOT_MATCH);
			}
			req.auth_decoded = {
				...decoded,
			};
			next();
			return;
		}
	} catch (error) {
		if (
			error.message === NOT_HAVING_AUTH_INFOR ||
			error.message === NOT_VERTIFIED ||
			error.message === TOKEN_NOT_MATCH
		) {
			res.status(301).json(new Response(301, [], REDIRECT_TO_LOGIN_MESS));
		} else {
			throw error;
		}
	}
};

const nonRequireLogined = async (req, res, next) => {
	try {
		const jwtToken = getToken(req);
		let [decodeStatus, decoded] = [false, []];
		if (jwtToken) {
			[decodeStatus, decoded] = vertifyJWT(jwtToken);
			if (decodeStatus) {
				const user = await userModel.getUserById(decoded.ma_nguoi_dung);
				if (user.payload[0].token === jwtToken) {
					throw new Error(MUST_LOGOUT);
				}
			}
		}
		next();
		return;
	} catch (error) {
		if (error.message === MUST_LOGOUT) {
			res.status(400).json(new Response(400, [], MUST_LOGOUT));
		}
	}
};

module.exports = { requireLogined, nonRequireLogined };
