var express = require("express");
var router = express.Router();

let currentCommand = { move: "UP", action: "NONE" };

// Endpoint pour recevoir une commande depuis l'interface
router.post("/command", (req, res) => {
  const { move, action } = req.body;
  if (move) currentCommand.move = move;
  if (action) currentCommand.action = action;
  res.json({ success: true, command: currentCommand });
});

// Endpoint pour que le bot récupère la commande
router.get("/action", (req, res) => {
  res.json(currentCommand);
});

module.exports = router;
