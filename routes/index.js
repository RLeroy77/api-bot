const express = require("express");
const router = express.Router();

// Variable partagée (commande actuelle)
let currentCommand = { move: "UP", action: "NONE" };

// Endpoint pour que le jeu récupère la commande
router.get("/action", (req, res) => {
  res.json(currentCommand);
});

// Endpoint pour que l'interface change la commande
router.post("/command", (req, res) => {
  const { move, action } = req.body;
  if (move) currentCommand.move = move;
  if (action) currentCommand.action = action;
  res.json({ success: true, command: currentCommand });
});

module.exports = { router, currentCommand };
