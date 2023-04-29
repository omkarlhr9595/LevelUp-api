const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://omkarlohar91:Pass123@cluster0.l5wvdao.mongodb.net/LevelUp",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected Succesfuly");
  })
  .catch((e) => {
    console.log(e.message);
  });

// Define student schema
const studentSchema = new mongoose.Schema({
  rollno: Number,
  name: String,
  email: String,
  password: String,
});

// Create student model
const Student = mongoose.model("Student", studentSchema);

// Define routes
app.post("/students", async (req, res) => {
  try {
    const student = new Student({
      rollno: req.body.rollno,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await student.save();
    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/students/:rollno", async (req, res) => {
  try {
    const rollno = req.params.rollno;
    const student = await Student.findOne({ rollno: rollno });
    if (!student) {
      return res.status(404).send("User not found");
    }
    res.send(student);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/", async (req, res) => {
  const alldata = await Student.find();
  res.send(alldata);
});

app.listen(port);
console.log(`listening on http://localhost:${port}`);
