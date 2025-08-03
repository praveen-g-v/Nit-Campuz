const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const internalExamResultschema = new Schema({
  internalExamSchedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "internalExamSchedule",
  },
  studentAcademic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "studentAcademic",
  },
  internalMark: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "internalMark",
  },
});

module.exports = mongoose.model("internalExamResult", internalExamResultschema);
