const router = require("express").Router();

const { validation, ctrlWrapper } = require("../middlewares/");
const { joiCreateQuickLink, joiUpdateQuickLink } = require("../dbMongo/models/quickLinksModel");
const auth = require("../middlewares/authMiddleware");
const quickLinks = require("../controller/quickLinks");

router.get("/", auth, ctrlWrapper(quickLinks.get));

router.post( "/", auth, validation(joiCreateQuickLink), ctrlWrapper(quickLinks.create) );

router.put( "/", auth, validation(joiUpdateQuickLink), ctrlWrapper(quickLinks.update) );

router.delete("/", auth, ctrlWrapper(quickLinks.remove));

module.exports = router;