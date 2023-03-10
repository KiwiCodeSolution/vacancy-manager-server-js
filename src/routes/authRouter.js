const Router = require("express");
const { check } = require("express-validator");

const router = new Router();
const controller = require("../controller/userController");
const { googleAuth } = require("../controller/googleAuth");
const auth = require("../middlewares/authMiddleware");
const ctrlWrapper = require("../middlewares/ctrlWrapper");

router.post("/register", [
    check("username", "username is required").notEmpty(),
    check("password", "from 4 to 10 symbols").isLength({ min: 4, max: 10 })

], ctrlWrapper(controller.registration));
router.get("/emailVerify", ctrlWrapper(controller.emailVerification));
router.post("/login", ctrlWrapper(controller.login));

router.post("/googleAuth", ctrlWrapper(googleAuth));

router.get("/logout", auth, ctrlWrapper(controller.logout));
router.get("/current", auth, ctrlWrapper(controller.getCurrent));

// FOR TESTING ONLY - delete before production
router.get("/users", ctrlWrapper(controller.getUser));

module.exports = router;