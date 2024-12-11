const express = require("express");
const solicitudes = require("./middleware/solicitudes");
const proyectos = require("./middleware/proyectos");
const personal = require("./middleware/personal");
const api = express.Router();

api.get("/", (req, res) => {
  res.render("pages/index");
});

api.get("/forms", solicitudes.selectAll);
api.get("/forms/:id", solicitudes.select);
api.put("/form", solicitudes.eliminate);
api.post("/form", solicitudes.agregate);

api.get("/projects", proyectos.selectAll)

api.get("/personal", personal.selectAll)

module.exports = api;
