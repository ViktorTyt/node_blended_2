const { model, Schema } = require("mongoose");

const deviceSchema = Schema(
  {
    vendor: {
      type: String,
      required: [true, "DB: provide vendor"],
    },
    model: {
      type: String,
      default: "Samsung",
    },
    color: {
      type: String,
      default: "white",
    },
    price: {
      type: Number,
      required: [true, "DB: provide price"],
    },
    user: String,
  },
  { timestamps: true, versionKey: false }
);
module.exports = model("device", deviceSchema);
