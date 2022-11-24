const router = require("express").Router();
const { auth, validation, ctrlWrapper } = require("../middlewares/");
const { joiCreateVacancy, joiUpdateVacancy } = require("../dbMongo/models/vacancyModel");
const vacancyCtrl = require("../controller/vacancyCtrl");

router.get("/", ctrlWrapper(vacancyCtrl.get));
router.post("/", validation(joiCreateVacancy), ctrlWrapper(vacancyCtrl.create));
router.put("/", validation(joiUpdateVacancy), ctrlWrapper(vacancyCtrl.update));
router.delete("/", ctrlWrapper(vacancyCtrl.remove));

module.exports = router;