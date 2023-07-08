const { sqlQuery } = require('./../utils/');
const getUserDataById = (id) => {
	const sqlStatment = 'select * from ?? where ma_nguoi_dung = ? ';
	const data = ['NguoiDung', id];
	return sqlQuery(sqlStatment, data);
};

module.exports = {
	getUserDataById,
};
