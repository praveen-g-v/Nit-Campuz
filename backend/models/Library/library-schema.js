const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const librarySchema = new Schema({
  booksCollectionDetails: [
    { type: mongoose.Types.ObjectId, required: true, ref: "bookCollection" },
  ],
});

module.exports = mongoose.model("library", librarySchema);
