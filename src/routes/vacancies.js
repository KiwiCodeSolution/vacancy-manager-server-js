const router = require("express").Router();
const ctrlWrapper = require("../middlewares/ctrlWrapper");
const auth = require("../middlewares/auth");
const vacancyCtrl = require("../controller/vacancyCtrl");

router.get("/", auth, ctrlWrapper(vacancyCtrl.get));
router.post("/", auth, ctrlWrapper(vacancyCtrl.create));
router.put("/", auth, ctrlWrapper(vacancyCtrl.update));
router.delete("/", auth, ctrlWrapper(vacancyCtrl.remove));

module.exports = router;