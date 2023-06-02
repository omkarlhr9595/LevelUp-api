import Freelancer from "../models/freelancer.model.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, state } = req.body;
    const newFreelancer = new Freelancer({
      firstName,
      lastName,
      email,
      password,
      state,
    });

    await newFreelancer.save();
    res.status(201).json({ message: "Freelancer registered" });
  } catch (e) {
    res.status(500).json({ message: "User Already Exists" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, client_password } = req.body;
    const user = await Freelancer.findOne({ email: email });
    if (!user) return res.status(401).json({ message: "User does not exist" });

    if (!isPasswordCorrect(client_password, user.password))
      return res.status(401).json({ message: "Wrong Password" });

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECURITY_KEY,
      { expiresIn: "3d" }
    );

    const { password, ...userdata } = user._doc;
    res.status(200).json({ userdata, accessToken });
  } catch (error) {
    res.status(500).json({ message: "Internal error" });
  }
};

const isPasswordCorrect = (password, dbPassword) => {
  const hashedPassword = CryptoJS.AES.decrypt(
    dbPassword,
    process.env.PASS_SECURITY_KEY
  );

  const originaldbPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

  if (originaldbPassword != password) return false;
  else return true;
};
