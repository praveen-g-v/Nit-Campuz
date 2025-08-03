const express = require("express");

const academicController = require("../controller/academic-controller");
const router = express.Router();
const authenticateToken = require("./jwtTokenAuthentication");

// router.get('/getAllCourse',courseController.getAllCourse);
router.get(
  "/getInternalExamTimeTable",
  authenticateToken,
  academicController.getInternalExamTimeTable
);
router.get(
  "/getUpcomingSemesterSchedule",
  authenticateToken,
  academicController.getUpcomingSemesterExam
);
router.get(
  "/getUpcomingInternalSchedule",
  authenticateToken,
  academicController.getUpcomingInternalExam
);
router.get(
  "/getInternalExamResult",
  authenticateToken,
  academicController.getInternalExamResult
);
router.get(
  "/getSemesterExamResult",
  authenticateToken,
  academicController.getSemesterExamResult
);
router.get(
  "/getAcademicAttendance",
  authenticateToken,
  academicController.getStudentTotalAttendance
);
router.get(
  "/getAllAttendance",
  authenticateToken,
  academicController.getStudentAllAttendance
);
router.get("/getTimeTable", authenticateToken, academicController.getTimeTable);
router.get(
  "/getInternalTimeTable",
  authenticateToken,
  academicController.getInternalExamTimeTable
);
router.get(
  "/getSemesterExamTimeTable",
  authenticateToken,
  academicController.getSemesterExamTimeTable
);
router.get(
  "/getStudentDetailInternal",
  authenticateToken,
  academicController.getStudentsForEvaluation
);
router.get(
  "/getStudentDetailSemester",
  authenticateToken,
  academicController.getStudentsForEvaluationSemester
);
router.get(
  "/getStudentDetailAssessedInternal",
  authenticateToken,
  academicController.getAssessedStudentForEvaluation
);
router.get(
  "/getStudentForAttendance",
  authenticateToken,
  academicController.getStudenstAttendance
);
// router.post("/addCourse",courseController.addCourse)
router.post(
  "/addTimeTable",
  authenticateToken,
  academicController.addTimeTable
);
router.post(
  "/createNewInternalExam",
  authenticateToken,
  academicController.createInternalExam
);
router.post(
  "/createNewSemesterExam",
  authenticateToken,
  academicController.createSemesterExam
);
router.post(
  "/addInternalMarks",
  authenticateToken,
  academicController.addInternalMarks
);
router.post(
  "/addSemesterMarks",
  authenticateToken,
  academicController.addSemesterMarks
);
router.post(
  "/addStudentAttendance",
  authenticateToken,
  academicController.addStudentAttendance
);
router.patch(
  "/modifyTimeTable",
  authenticateToken,
  academicController.modifyTimeTable
);
router.patch(
  "/modifyInternalExam",
  authenticateToken,
  academicController.patchInternalExamTimeTable
);
router.patch(
  "/modifySemesterExam",
  authenticateToken,
  academicController.patchSemesterExamTimeTable
);
// router.delete("/deleteCourse",courseController.deleteCourse);
// router.delete("/deleteSubject",courseController.deleteSubject);

module.exports = router;
