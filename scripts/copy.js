const path = require("path");
const fs = require("fs");
const shell = require("shelljs");

const cwd = process.cwd();
shell.mkdir("-p", path.resolve(cwd, "./build/assets"));
shell.cp("-R", path.resolve(cwd, "./docs/assets/cycle_arrow.png"), path.resolve(cwd, "./build/assets"));