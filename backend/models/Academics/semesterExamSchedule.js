const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const semesterExamScheduleschema = new Schema({
  year: { type: String, required: true },
  name: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "courses" },
  semester: { type: mongoose.Schema.Types.ObjectId, ref: "semester" },
  subjects: [{ type: Object }],
  schedule: { type: Object, required: true },
  semesterMarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "semesterExamResult",
    },
  ],
});

module.exports = mongoose.model(
  "semesterExamSchedule",
  semesterExamScheduleschema
);
