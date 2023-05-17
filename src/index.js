const express = require("express");
const cors = require("cors");
const freelancerRoute = require("./routes/freelancer.route");

//* DB CONNECTION
require("./db/connection");

//* EXPRESS APP
const app = express();
const port = process.env.PORT || 3000;


//* MIDDLEWARES
app.use(express.json());
// app.use(cors());


//* ROUTES
app.use("/freelancer", freelancerRoute);

app.post("/test", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});



//* APP LOG
app.listen(port);
console.log(`listening on http://localhost:${port}`);
