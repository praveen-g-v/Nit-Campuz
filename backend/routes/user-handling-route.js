const express = require("express");

const userController = require("../controller/user-controller");
const router = express.Router();
const authenticateToken = require("./jwtTokenAuthentication");

router.get("/getAllUser", authenticateToken, userController.getAllUser);
router.get("/getRole", authenticateToken, userController.getRole);
router.get("/getUserRole", authenticateToken, userController.getUserRole);
router.get("/getUserName", authenticateToken, userController.getUserName);
router.get(
  "/getUserProfile",
  authenticateToken,
  userController.getUserProfileData
);
router.get(
  "/getUnassignedUser",
  authenticateToken,
  userController.getAcademicWithRole
);
router.post("/assigncourse", authenticateToken, userController.addAcademic);
router.patch(
  "/updateStatus",
  authenticateToken,
  userController.updateUserStatus
);
router.patch("/removeuser", authenticateToken, userController.deletUser);

module.exports = router;
