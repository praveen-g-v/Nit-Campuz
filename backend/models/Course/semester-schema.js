const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const semesterSchema = new Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "courses" },
  subjectIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "subject" }],
  semester: { type: String, required: true },
});

module.exports = mongoose.model("semester", semesterSchema);
