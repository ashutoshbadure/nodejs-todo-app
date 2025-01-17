const AuthModel = require("../models/auth-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "Bad request please provide email and password!",
      });
      return;
    }
    const existUser = await AuthModel.findOne({ email });
    if (existUser) {
      res.status(400).json({
        message:
          "User with same email already exist please try with different email!",
      });
      return;
    }
    if (!email || !password) {
      res.status(400).json({
        message: "Bad request please provide email and password!",
      });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const registeredUser = await AuthModel.create({
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "User registered sucessfully!",
    });
  } catch (error) {
    console.error("Error in register user!", error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        message: "Bad request please provide email and password!",
      });
      return;
    }
    const loggedInUser = await AuthModel.findOne({ email });
    if (!loggedInUser) {
      res.status(400).json({
        message: "Invalid email!",
      });
      return;
    }
    const isPasswordMatched = await bcrypt.compare(
      password,
      loggedInUser.password
    );
    if (!isPasswordMatched) {
      res.status(400).json({
        message: "Invalid password!",
      });
      return;
    }
    const accessToken = jwt.sign(
      {
        email,
        date: Date.now,
      },
      process.env.SECRET_KEY,
      { expiresIn: "10m" }
    );
    res.status(200).json({
      message: "User loggedin sucessfully!",
      accessToken,
    });
  } catch (error) {
    console.error("Error in login user!", error);
  }
};

module.exports = { registerUser, loginUser };
