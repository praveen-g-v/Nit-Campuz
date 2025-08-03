const express = require("express");

const userController = require("../controller/user-controller");
const router = express.Router();
const authenticateToken = require("./jwtTokenAuthentication");

router.post("/", authenticateToken, userController.createUser);

module.exports = router;
