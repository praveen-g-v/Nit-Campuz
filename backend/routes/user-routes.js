const express = require("express");

const userController = require("../controller/user-controller");
const router = express.Router();

router.get("/", userController.doLogin);
router.get("/refresh", userController.refresh);
router.get("/logout", userController.logOut);
router.get("/haslogged", userController.hasLogged);
router.get("/get", userController.getUserName);

module.exports = router;
