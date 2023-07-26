var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const router = require("./routes/index");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
// Add Access Control Allow Origin headers
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.use("/", router);
app.get("/", (req, res) => {
	res.send("xin chao");
});

// set port
const PORT = 3000;
app.listen(PORT, function () {
	console.log(`Node app is running on port ${PORT}`);
});
