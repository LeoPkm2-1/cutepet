const { sqlQuery } = require('./index');

const sql = 'select * from NguoiDung';
sqlQuery(sql).then((val) => {
	console.log(val);
});
