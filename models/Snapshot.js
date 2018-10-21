const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const category = require("./Category");

const SnapshotSchema = new Schema({
  user_id: {
    type: "ObjectId",
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  categories: [category.schema]
});

module.exports = mongoose.model("Snapshot", SnapshotSchema);
