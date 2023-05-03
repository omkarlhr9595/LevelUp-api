const mongoose = require("mongoose");
const validator = require("validator");
const CryptoJS = require("crypto-js");
const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isAlpha(value.split(" ").join("")))
          throw new Error("Not a name");
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Not an Email");
      },
    },
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

clientSchema.pre("save", async function (next) {
  const client = this;
  if (client.isModified("password"))
    client.password = CryptoJS.AES.encrypt(
      client.password,
      process.env.PASS_SECURITY_KEY
    );
  next();
});

const Client = mongoose.model("client", clientSchema);
module.exports = Client;
