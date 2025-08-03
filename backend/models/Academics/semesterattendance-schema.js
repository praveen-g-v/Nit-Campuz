const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const semesterattendanceschema = new Schema({
  year: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "courses" },
  semester: { type: mongoose.Schema.Types.ObjectId, ref: "semester" },
  semesterExamSchedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "semesterExamSchedule",
  },
  studentAcademic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "studentAcademic",
  },
  attendance: [{ type: Object, required: true }],
});

module.exports = mongoose.model("SemesterAttendance", semesterattendanceschema);
