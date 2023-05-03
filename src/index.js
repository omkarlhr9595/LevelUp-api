const express = require("express");

//* IMPORTING ROUTES
const clientRoute = require("./routes/client.route");

//* DB CONNECTION
require("./db/connection");

//* EXPRESS APP
const app = express();
const port = process.env.PORT || 3000;

//* MIDDLEWARES
app.use(express.json());

//* ROUTES
app.use("/api/client", clientRoute);

//* APP LOG
app.listen(port);
console.log(`listening on http://localhost:${port}`);
