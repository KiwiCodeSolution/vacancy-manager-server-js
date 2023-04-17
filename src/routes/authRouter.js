const Router = require("express");
const { check } = require("express-validator");

const router = new Router();
const controller = require("../controller/userController");
const { googleAuth } = require("../controller/googleAuth");
const auth = require("../middlewares/authMiddleware");
const ctrlWrapper = require("../middlewares/ctrlWrapper");

router.post("/register", [
    // check("username", "username is required").notEmpty(),
    check("password", "from 8 to 32 symbols").isLength({ min: 8, max: 32 })

], ctrlWrapper(controller.registration));
router.get("/emailVerify", ctrlWrapper(controller.emailVerification));
router.post("/login", ctrlWrapper(controller.login));
router.post("/passRestore", ctrlWrapper(controller.passRestore));
router.get("passCodeVerify", ctrlWrapper(controller.passCodeVerify));

router.post("/googleAuth", ctrlWrapper(googleAuth));

router.get("/logout", auth, ctrlWrapper(controller.logout));
router.get("/current", auth, ctrlWrapper(controller.getCurrent));

// FOR TESTING ONLY - delete before production
router.get("/users", ctrlWrapper(controller.getUser));

module.exports = router;