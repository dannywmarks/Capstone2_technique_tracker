let User = require("../models/user.model");

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
const addUser = async (req, res) => {
  try {
    const username = req.body.username;
    const newUser = await new User({ username });
    newUser.save();
    res.status(200).json("User Added");
  } catch (err) {
    res.status(400).json("Error" + err);
  }
};

module.exports = { getUsers, getUser, addUser };
