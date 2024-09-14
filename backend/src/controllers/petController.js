const { addPet, getPetsByUserId } = require("../models/petModel");

const savePet = (req, res) => {
  const { userId, petName, petType } = req.body;
  addPet(userId, petName, petType, (err, petId) => {
    if (err) {
      return res.status(500).send("Could not save pet");
    }
    res.status(201).json({ petId });
  });
};

const getPets = (req, res) => {
  const { userId } = req.params;
  getPetsByUserId(userId, (err, pets) => {
    if (err) {
      return res.status(500).send("Could not retrieve pets");
    }
    res.status(200).json(pets);
  });
};

module.exports = { savePet, getPets };
