const express = require("express");

const router = express.Router();

const libraryController = require("../controller/library-controller");
const authenticateToken = require("./jwtTokenAuthentication");
router.get("/getAllBook", authenticateToken, libraryController.getAllBook);
router.post("/addBooks", authenticateToken, libraryController.createBook);
router.delete("/removeBook", authenticateToken, libraryController.removeBook);
module.exports = router;
