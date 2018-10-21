const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  user_id: {
    type: "ObjectId",
    required: true
  }
});

module.exports = {
  model: mongoose.model("Category", CategorySchema),
  schema: CategorySchema
};
