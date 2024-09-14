// database/petModel.js

const db = require("./database"); // Importa a configuração do banco de dados

const createPet = (name, type, ownerId, callback) => {
  const query = "INSERT INTO pets (name, type, owner_id) VALUES (?, ?, ?)";
  db.run(query, [name, type, ownerId], function (err) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, this.lastID);
    }
  });
};

const getPetById = (petId, callback) => {
  const query = "SELECT * FROM pets WHERE id = ?";
  db.get(query, [petId], (err, row) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, row);
    }
  });
};

// Exporte as funções para uso em outros arquivos
module.exports = { createPet, getPetById };
