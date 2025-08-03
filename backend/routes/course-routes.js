const express = require("express");

const courseController = require("../controller/course-controller");
const router = express.Router();
const authenticateToken = require("./jwtTokenAuthentication");

router.get("/getAllCourse", authenticateToken, courseController.getAllCourse);
router.get("/getSemester", authenticateToken, courseController.getSubject);
router.post("/addCourse", authenticateToken, courseController.addCourse);
router.post("/assigncourse", authenticateToken, courseController.addSubject);
router.delete(
  "/deleteCourse",
  authenticateToken,
  courseController.deleteCourse
);
router.delete(
  "/deleteSubject",
  authenticateToken,
  courseController.deleteSubject
);

module.exports = router;
