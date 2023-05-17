const router = require("express").Router();
const { ctrlWrapper } = require("../middlewares/");
const { update, uploadAvatar } = require("../controller/profileCtrl");
const auth = require("../middlewares/authMiddleware");

router.post("/", auth, ctrlWrapper(update));
router.post("/uploadAva", auth, ctrlWrapper(uploadAvatar));

module.exports = router;