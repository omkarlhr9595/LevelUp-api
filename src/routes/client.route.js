const router = require("express").Router();
const Client = require("../models/client.modal");

//* LOGIN
router.post("/register", async (req, res) => {
  const { name, email, username, password } = req.body;
  try {
    const client = new Client({
      name,
      email,
      username,
      password,
    });
    await client.save();
    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ log: "Something went wrong", message: error.message });
  }
});

module.exports = router;
