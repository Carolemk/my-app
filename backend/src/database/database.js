const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Define o caminho para o banco de dados
const dbPath = path.resolve(__dirname, "database.db");

// Cria uma nova instância do banco de dados SQLite
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Não foi possível conectar ao banco de dados", err);
  } else {
    console.log("Conectado ao banco de dados");

    // Cria a tabela de usuários se não existir
    db.run(
      `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
      )
    `,
      (err) => {
        if (err) {
          console.error("Erro ao criar tabela de usuários", err);
        }
      }
    );

    // Cria a tabela de pets se não existir
    db.run(
      `
      CREATE TABLE IF NOT EXISTS pets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        pet_name TEXT,
        pet_type TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `,
      (err) => {
        if (err) {
          console.error("Erro ao criar tabela de pets", err);
        }
      }
    );
  }
});

module.exports = db;
