const mongoose = require("mongoose");

const RequestSchema = mongoose.Schema(
  {
    productName: { type: String, required: true },
    description: { type: String, require: true },
  },
  { minimize: false }
);

const Request = mongoose.model("Request", RequestSchema);

module.exports = Request;
