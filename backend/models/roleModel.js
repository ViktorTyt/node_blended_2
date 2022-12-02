const { model, Schema } = require("mongoose");

const roleSchema = Schema(
  {
    value: {
      type: String,
      unique: true,
      default: "USER",
    },
  },
  { timestamps: true, versionKey: false }
);
module.exports = model("Role", roleSchema);
