const shell = require("shelljs");
const path = require("path");

shell.cp(path.join(__dirname, ".env.prod"), path.join(__dirname, ".env"));
