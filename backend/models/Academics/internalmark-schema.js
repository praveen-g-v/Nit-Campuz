const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const internalmarkschema = new Schema({
  year: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "courses" },
  semester: { type: mongoose.Schema.Types.ObjectId, ref: "semester" },
  studentAcademic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "studentAcademic",
  },
  internalMarks: { type: Object, required: true },
});

module.exports = mongoose.model("internalMark", internalmarkschema);
