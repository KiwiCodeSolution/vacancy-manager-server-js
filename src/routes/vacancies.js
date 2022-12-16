const router = require("express").Router();
const { validation, ctrlWrapper } = require("../middlewares/");
const { joiCreateVacancy, joiUpdateVacancy } = require("../dbMongo/models/vacancyModel");
const vacancy = require("../controller/vacancyCtrl");
const auth = require("../middlewares/authMiddleware");

router.get("/", auth, ctrlWrapper(vacancy.get));

router.post("/", auth, validation(joiCreateVacancy), ctrlWrapper(vacancy.create));

router.put("/", auth, validation(joiUpdateVacancy), ctrlWrapper(vacancy.update));

router.delete("/:id", auth, ctrlWrapper(vacancy.remove));

module.exports = router;
