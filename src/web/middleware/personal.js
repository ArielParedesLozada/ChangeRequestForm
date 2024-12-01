const responses = require("../responses");
const personalCon = require("../../controllers/PersonalController");

const selectAll = async function selectAll(req, res, next) {
  try {
    const rawData = await personalCon.selectAll();
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