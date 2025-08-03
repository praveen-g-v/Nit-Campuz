const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const semesterExamResultschema = new Schema({
  semesterExamSchedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "semesterExamSchedule",
  },
  studentAcademic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "studentAcademic",
  },
  semesterMark: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "semesterMark",
  },
});

module.exports = mongoose.model("semesterExamResult", semesterExamResultschema);
