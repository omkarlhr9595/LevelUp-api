const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGOURL;
// console.log(url);
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected Succesfuly");
  })
  .catch((e) => {
    console.log(e.message);
  });
