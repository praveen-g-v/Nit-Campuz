const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const academicSchema = new Schema({
  year: { type: String, required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "courses" },
  semester: [{ type: mongoose.Schema.Types.ObjectId, ref: "semester" }],
  library: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  timetable: { type: Object },
});

module.exports = mongoose.model("academic", academicSchema);
