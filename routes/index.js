var express = require("express");
var router = express.Router();

// Orientations possibles
const directions = ["UP", "RIGHT", "DOWN", "LEFT"];
let currentDirectionIndex = 0; // Commence en haut

// Actions possibles
const actions = ["NONE"]; // Toujours NONE pour Maze Runner

router.get("/action", (req, res) => {
  // Tourner à droite à chaque appel (méthode "toujours à droite")
  currentDirectionIndex = (currentDirectionIndex + 1) % directions.length;
  const move = directions[currentDirectionIndex];
  const action = actions[0];

  console.log(`Bot joue: ${move}/${action}`);

  res.json({ move, action });
});

module.exports = router;
