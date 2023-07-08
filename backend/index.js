var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const router = require('./routes/index');
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.use('/', router);

// set port
const PORT = 3000;
app.listen(PORT, function () {
	console.log(`Node app is running on port ${PORT}`);
});
