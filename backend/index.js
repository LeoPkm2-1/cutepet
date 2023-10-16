const express = require("express");
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const { createSocketHandler } = require("./socketHandler/index");
const app = express();
const server = createServer(app);
const io = new Server(server,{
	cors:{
		origin:"http://localhost:3001",
	}
});


var bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const router = require("./routes/index");
var cors=require('cors');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
// static file.
app.use(express.static('public'));
app.use(express.static('test_socket/js'));
// Add Access Control Allow Origin headers
app.options('*', cors());
app.use((req, res, next) => {
	// res.header(
	// 	"Access-Control-Allow-Headers",
	// 	"Origin, X-Requested-With, Content-Type, Accept"
	// );
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.setHeader("Access-Control-Allow-Headers", "*");
	// res.setHeader("Access-Control-Allow-Headers", "Authorization,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
	next();
});

app.use("/", router);
app.get("/", (req, res) => {
	res.send("xin chao");
});
app.get("/test_socket", (req, res) => {
	res.status(200).sendFile(join(__dirname, "test_socket", "test_socket.html"));
});

// create socket io
createSocketHandler(io);

// set port
const PORT = 3000;
server.listen(PORT, function () {
	console.log(`Node app is running on port ${PORT}`);
});
