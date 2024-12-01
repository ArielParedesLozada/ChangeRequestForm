const express = require("express");
const solicitudes = require("./middleware/solicitudes");
const api = express.Router();

api.get("/", (req, res) => {
  res.render("pages/index");
});

api.get("/forms", solicitudes.selectAll);
api.get("/forms/:id", solicitudes.select);
api.put("/form", solicitudes.eliminate);
api.post("/form", solicitudes.agregate);

module.exports = api;
