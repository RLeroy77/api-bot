const express = require("express");
const router = express.Router();

// Commande courante, initialisée avec STAY / NONE
let currentCommand = { move: "STAY", action: "NONE" };

// POST /command pour recevoir la commande du frontend
router.post("/command", (req, res) => {
  const { move, action } = req.body;

  // Valide les valeurs reçues (optionnel mais conseillé)
  const validMoves = ["UP", "DOWN", "LEFT", "RIGHT", "STAY"];
  const validActions = ["NONE", "COLLECT", "BOMB"];

  if (move && validMoves.includes(move.toUpperCase())) {
    currentCommand.move = move.toUpperCase();
  }
  if (action && validActions.includes(action.toUpperCase())) {
    currentCommand.action = action.toUpperCase();
  }

  console.log("Commande reçue :", currentCommand);
  res.json({ success: true, command: currentCommand });
});

// GET /action pour retourner la commande actuelle
router.get("/action", (req, res) => {
  res.json(currentCommand);
});

module.exports = router;
