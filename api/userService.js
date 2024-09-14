// server.js

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createUser, findUserByUsername } from "./database/userService"; // Funções de usuário
import { createPet, getPetById } from "./database/petModel"; // Funções de pet

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Endpoint para registro de usuário
app.post("/register", async (req, res) => {
  // Lógica para registro de usuário
});

// Endpoint para adicionar um pet
app.post("/pet-info", async (req, res) => {
  try {
    const { name, type, ownerId } = req.body;

    if (!name || !type || !ownerId) {
      return res
        .status(400)
        .json({ message: "Name, type, and ownerId are required" });
    }

    createPet(name, type, ownerId, (err, petId) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error creating pet", error: err });
      }
      res.status(201).json({ message: "Pet created successfully", petId });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Endpoint para obter informações sobre um pet
app.get("/pet-info/:id", async (req, res) => {
  try {
    const petId = req.params.id;

    getPetById(petId, (err, pet) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error fetching pet", error: err });
      }
      if (!pet) {
        return res.status(404).json({ message: "Pet not found" });
      }
      res.status(200).json(pet);
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
