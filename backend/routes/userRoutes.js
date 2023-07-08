// routes/index.js
const express = require('express');
const app = express();
const getUserDataController = require('./../controllers/userController');

app.get('/:id', (req, res) => {
	res.send('ahihi');
});

module.exports = { app };
