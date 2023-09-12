const userModel = require('../models/userModel');

const convertUserNameToId = async (req, res, next) => {
	const tai_khoan = req.body.requestUserName;
	// console.log(req.body);
	const { ma_nguoi_dung } = await userModel.getUserIdByUsername(tai_khoan);
	req.body.requestID = ma_nguoi_dung;
	delete req.body.requestUserName;
	// console.log(req.body);
	next();
};

module.exports = {
	convertUserNameToId,
};
