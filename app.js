const express = require("express");
const path = require("path");
const config = require("./config");
const routes = require("./src/web/routes");
const errors = require("./src/web/errors");

const app = express();
app.set("port", config.app.port);

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "src")));
app.set("views", path.join(__dirname, "src/views"));
app.use("/", routes);
app.use(errors);

module.exports = app;
