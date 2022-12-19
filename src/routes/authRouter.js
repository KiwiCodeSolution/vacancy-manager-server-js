const Router = require("express");
const { check } = require("express-validator");

const router = new Router();
const controller = require("../controller/userController");
const auth = require("../middlewares/authMiddleware");
const ctrlWrapper = require("../middlewares/ctrlWrapper");

router.post("/register", [
    check("username", "username is required").notEmpty(),
    check("password", "from 4 to 10 symbols").isLength({ min: 4, max: 10 })

], ctrlWrapper(controller.registration));
router.post("/login", ctrlWrapper(controller.login));
router.get("/logout", auth, ctrlWrapper(controller.logout));
router.get("/users", auth, ctrlWrapper(controller.getUser));

module.exports = router;