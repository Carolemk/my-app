const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// Configuração do CORS
const corsOptions = {
  origin: "http://localhost:8081", // Frontend
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Rotas
app.post("/login", (req, res) => {
  // Lógica de login
  res.send({ success: true });
});

app.post("/register", (req, res) => {
  // Lógica de registro
  res.send({ success: true });
});

app.get("/pet-info/:petId", (req, res) => {
  // Lógica para obter informações sobre pets
  res.send({ petId: req.params.petId, info: "Pet info here" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
