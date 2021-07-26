let User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  generateToken,
  createUserJwt,
} = require("../utils/tokens");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json("Error" + err);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json("Error" + err);
  }
};

const signUpUser = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) return res.status(404).json({ message: "User already exist" });

    if (password !== confirmPassword)
      return res.status(404).json({ message: "Passwords don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName},${lastName}`,
    });

    const data = { email: result.email, id: result._id };

    // const token = jwt.sign({ email: result.email, id: result._id }, "test", {
    //   expiresIn: "1h",
    // });

    const token = generateToken(data);

    res.status(200).json({ result, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", err });
  }
};

const signInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    // const token = jwt.sign(
    //   { email: existingUser.email, id: existingUser._id },
    //   "test",
    //   { expiresIn: "1h" }
    // );

    const token = generateToken({
      email: existingUser.email,
      id: existingUser._id,
    });

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { getUsers, getUser, signInUser, signUpUser };
