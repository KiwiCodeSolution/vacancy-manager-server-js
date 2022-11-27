const Router = require("express");
const { check } = require("express-validator");

const router = new Router();
const controller = require("../controller/userController");
const authMiddleweare = require("../middlewares/authMiddleweare");

router.post("/registration", [
    check("username", "должно быть заполнено").notEmpty(),
    check("password", "пароли должен біть ot 4 do 10 symbols").isLength({ min: 4, max: 10 })

], controller.registration);
router.post("/login", controller.login);
router.post("/logout", controller.logout);
router.get("/users", authMiddleweare, controller.getUser);

module.exports = router;