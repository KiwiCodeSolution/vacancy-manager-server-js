const router = require("express").Router();
const { ctrlWrapper } = require("../middlewares/");
const { update } = require("../controller/profileCtrl");
const auth = require("../middlewares/authMiddleware");

router.post("/", auth, ctrlWrapper(update));

module.exports = router;