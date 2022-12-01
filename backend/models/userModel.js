const { model, Schema } = require("mongoose");

const userSchema = Schema(
  {
    userName: {
      type: String,
      default: "John Doe",
    },
    userEmail: {
      type: String,
      required: [true, "DB: provide userEmail"],
    },
    userPassword: {
      type: String,
      required: [true, "DB: provide userPassword"],
    },
    token: {
      type: String,
      default: null,
    },
    // roles:,
  },
  { timestamps: true, versionKey: false }
);
module.exports = model("user", userSchema);
