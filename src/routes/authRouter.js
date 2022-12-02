const Router = require("express");
const { check } = require("express-validator");

const router = new Router();
const controller = require("../controller/userController");
const auth = require("../middlewares/authMiddleware");

router.post("/register", [
    check("username", "username is required").notEmpty(),
    check("password", "from 4 to 10 symbols").isLength({ min: 4, max: 10 })

], controller.registration);
router.post("/login", controller.login);
router.get("/logout", auth, controller.logout);
router.get("/users", auth, controller.getUser);

module.exports = router;