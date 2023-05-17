const Freelancer = require("../models/freelancer.model");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const newFreelancer = new Freelancer({
      firstName,
      lastName,
      email,
      password,
    });

    await newFreelancer.save();
    res.status(201).json({ message: "Freelancer registered" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = register;
