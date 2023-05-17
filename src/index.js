const express = require("express");
const cors = require("cors");

//* DB CONNECTION
require("./db/connection");

//* EXPRESS APP
const app = express();
const port = process.env.PORT || 3000;

//* MIDDLEWARES
app.use(express.json());
app.use(cors());



//* APP LOG
app.listen(port);
console.log(`listening on http://localhost:${port}`);
