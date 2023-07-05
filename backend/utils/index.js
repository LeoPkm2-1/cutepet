const { readENV } = require('./read_env');
const sql_connection = require('./sql_connector');
module.exports = { readENV, sql_connection };
