const mongoose = require("mongoose");

const AuthModel = new mongoose.Schema(
  {
    email: {
      required: true,
      type: String,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Auth", AuthModel);
