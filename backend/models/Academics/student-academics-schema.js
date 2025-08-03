const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentAcademicSchema = new Schema({
  year: { type: String, required: true },
  timetable: { type: Object },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, //user assignes here for Academics
  course: { type: mongoose.Schema.Types.ObjectId, ref: "courses" },
  semester: [{ type: mongoose.Schema.Types.ObjectId, ref: "semester" }],
  internalExams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "internalExamResult",
    },
  ],
  semesterExams: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }], //nedd to write for semester Exam
  semesterAttendance: [], //attendance for semester
  library: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

module.exports = mongoose.model("studentAcademic", studentAcademicSchema);
