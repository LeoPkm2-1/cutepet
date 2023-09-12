const { readENV } = require('./read_env.js');

const NON_SQL_DB_ADDRESS = 'mongodb://localhost:27017';

// Database Name
const NON_SQL_DB_NAME = 'cutepet_nonsql';

module.exports = { NON_SQL_DB_ADDRESS, NON_SQL_DB_NAME };
