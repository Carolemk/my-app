const { createUser, findUserByUsername } = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const registerUser = (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).send("Server error");
    }
    createUser(username, hash, (err, userId) => {
      if (err) {
        return res.status(500).send("Could not create user");
      }
      res.status(201).json({ userId });
    });
  });
};

const loginUser = (req, res) => {
  const { username, password } = req.body;
  findUserByUsername(username, (err, user) => {
    if (err || !user) {
      return res.status(401).send("User not found");
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(401).send("Invalid password");
      }
      res.status(200).json({ userId: user.id });
    });
  });
};

module.exports = { registerUser, loginUser };
