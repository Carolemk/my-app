const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

// Simulando um banco de dados em memória
const users = [];

// Middleware para o body parser
router.use(bodyParser.json());

// Rota para criar um novo usuário
router.post("/create", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res
      .status(400)
      .json({ success: false, message: "Email e senha são obrigatórios." });
  }

  // Verifica se o usuário já existe
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "Usuário já existe." });
  }

  // Simulando a criação do usuário
  const newUser = { email, senha };
  users.push(newUser);

  res.status(201).json({
    success: true,
    message: "Usuário criado com sucesso.",
    user: newUser,
  });
});

// Endpoint para login
router.post("/login", (req, res) => {
  const { email, senha } = req.body;
  const user = users.find(
    (user) => user.email === email && user.senha === senha
  );

  if (user) {
    res.status(200).json({ success: true, message: "Login bem-sucedido." });
  } else {
    res
      .status(401)
      .json({ success: false, message: "Email ou senha inválidos." });
  }
});

module.exports = router;
