const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountsSchema = new Schema({
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

module.exports = mongoose.model("Account", AccountsSchema);
