const db = require("../database/database");

const createUser = (username, password, callback) => {
  const query = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.run(query, [username, password], function (err) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, this.lastID);
    }
  });
};

const findUserByUsername = (username, callback) => {
  const query = "SELECT * FROM users WHERE username = ?";
  db.get(query, [username], (err, row) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, row);
    }
  });
};

module.exports = { createUser, findUserByUsername };
