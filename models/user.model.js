const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.isGoogleUser; // Only required if not a Google user
    },
  },
  isGoogleUser: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: Number,
    required: function () {
      return !this.isGoogleUser; // Only required if not a Google user
    },
  },
  gender: {
    type: String,
    required: function () {
      return !this.isGoogleUser; // Only required if not a Google user
    },
  },
  address: {
    type: String,
    required: function () {
      return !this.isGoogleUser; // Only required if not a Google user
    },
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

module.exports = model("User", userSchema, "users");
