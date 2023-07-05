// const { readENV } = require('./utils');

// console.log(readENV('DB_USERNAME'));
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
var anhRouter = require('./routes/loai');
app.use('/anh', anhRouter);
// default route
app.get("/", function (req, res) {
  return res.send({ error: true, message: "hello" });
});
app.get("/home", function (req, res) {
    return res.send({ name: "thuyne", age: "23" });
  });


// set port
app.listen(3000, function () {
  console.log("Node app is running on port 3000");
});
module.exports = app;
