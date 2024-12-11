const responses = require("../responses");
const proyectoCon = require("../../controllers/ProyectosController");

const selectAll = async function selectAll(req, res, next) {
  try {
    const rawData = await proyectoCon.selectAll();
    const data = rawData.map((row) => Object.values(row));
    responses.success(req, res, data)
    //res.render("pages/all", { data });
  } catch (error) {
    next(error);
  }
};

module.exports = {
    selectAll
}
