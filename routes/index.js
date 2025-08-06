var express = require("express");
var router = express.Router();

// Liste des mouvements possibles
const moves = ["UP", "DOWN", "LEFT", "RIGHT", "STAY"];
// Liste des actions possibles
const actions = ["COLLECT", "NONE"]; // Pas de BOMB par défaut (risqué)

/**
 * GET /action
 * Retourne un move et une action
 */
router.get("/action", (req, res) => {
  // Choix aléatoire d'un mouvement
  const move = moves[Math.floor(Math.random() * moves.length)];
  // Choix aléatoire d'une action
  const action = actions[Math.floor(Math.random() * actions.length)];

  res.json({ move, action });
});

module.exports = router;
