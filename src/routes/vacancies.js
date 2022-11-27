const router = require("express").Router();
const { validation, ctrlWrapper } = require("../middlewares/");
const { joiCreateVacancy, joiUpdateVacancy } = require("../dbMongo/models/vacancyModel");
const vacancyCtrl = require("../controller/vacancyCtrl");
const authMiddleweare = require("../middlewares/authMiddleweare");

router.get("/", authMiddleweare, ctrlWrapper(vacancyCtrl.get));
router.post("/", authMiddleweare, validation(joiCreateVacancy), ctrlWrapper(vacancyCtrl.create));
router.put("/", authMiddleweare, validation(joiUpdateVacancy), ctrlWrapper(vacancyCtrl.update));
router.delete("/", authMiddleweare, ctrlWrapper(vacancyCtrl.remove));

module.exports = router;