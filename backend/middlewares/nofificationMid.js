const { Response } = require('./../utils');
const utilHelper = require('./../utils/UtilsHelper');

function preProcessGetNotiStartFrom(req, res, next) {
	const VALID_PARAM = 'tham số không hợp lệ';
	let { index, num } = req.body;
	try {
		index = parseInt(index);
		if (Number.isNaN(index) || index < 0) {
			throw new Error(VALID_PARAM);
		}
		if (typeof num != 'undefined' && Number.isNaN(parseInt(num))) {
			throw new Error(VALID_PARAM);
		}
		num = typeof num == 'undefined' ? undefined : parseInt(num);
		if (num <= 0) throw new Error(VALID_PARAM);
		req.body.index = index;
		req.body.num = num;
	} catch (error) {
		res.status(400).json(new Response(400, [], VALID_PARAM, 300, 300));
		return;
	}
	next();
}

function preProcessGetNotiUntil(req, res, next) {
	const VALID_PARAM = 'tham số không hợp lệ';
	let { before, num } = req.body;
	try {
		if (!utilHelper.isDateValid(new Date(before))) {
			throw new Error(VALID_PARAM);
		}
		if (typeof num != 'undefined' && Number.isNaN(parseInt(num))) {
			throw new Error(VALID_PARAM);
		}
		num = typeof num == 'undefined' ? undefined : parseInt(num);
		if (num <= 0) throw new Error(VALID_PARAM);
		req.body.before = new Date(before);
		req.body.num = num;
	} catch (error) {
		res.status(400).json(new Response(400, [], VALID_PARAM, 300, 300));
		return;
	}
	next();
}

module.exports = {
	preProcessGetNotiStartFrom,
	preProcessGetNotiUntil,
};
