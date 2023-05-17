import express from "express";
import cors from "cors";
import freelancerRoute from "./routes/freelancer.route.js";

//* DB CONNECTION
import "./db/connection.js";

//* EXPRESS APP
const app = express();
const port = process.env.PORT || 3000;

//* MIDDLEWARES
app.use(express.json());
app.use(cors());

//* ROUTES
app.use("/freelancer", freelancerRoute);

app.post("/test", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

//* APP LOG
app.listen(port);
console.log(`listening on http://localhost:${port}`);
