var path = require("path");
var fs = require("fs");
var shell = require('shelljs');

var cwd = process.cwd();
shell.mkdir("-p", path.resolve(cwd, "./build/assets"));
shell.cp("-R", path.resolve(cwd, "./docs/assets/cycle_arrow.png"), path.resolve(cwd, "./build/assets"));