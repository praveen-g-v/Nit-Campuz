const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const semestermarkschema = new Schema({
  year: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "courses" },
  semester: { type: mongoose.Schema.Types.ObjectId, ref: "semester" },
  studentAcademic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "studentAcademic",
  },
  semesterMarks: { type: Object, required: true },
});

module.exports = mongoose.model("semesterMark", semestermarkschema);
