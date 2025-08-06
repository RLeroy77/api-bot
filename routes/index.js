var express = require("express");
var router = express.Router();

const moves = ["UP", "DOWN", "LEFT", "RIGHT", "STAY"];
const actions = ["NONE"]; // on supprime COLLECT pour Maze Runner

/**
 * GET /action
 * Query param vision : JSON 3x3
 */
router.get("/action", (req, res) => {
  let vision;

  try {
    vision = JSON.parse(req.query.vision);
  } catch (e) {
    vision = null;
  }

  // Fonction qui vérifie si la case en direction 'move' est libre
  function canMove(move) {
    if (!vision) return true; // Sans vision, on joue au hasard

    // vision est une matrice 3x3 : [ligne][colonne]
    // Le centre est vision[1][1] => la position actuelle
    // Les directions :
    // UP => vision[0][1]
    // DOWN => vision[2][1]
    // LEFT => vision[1][0]
    // RIGHT => vision[1][2]

    switch (move) {
      case "UP":
        return vision[0][1] === "free";
      case "DOWN":
        return vision[2][1] === "free";
      case "LEFT":
        return vision[1][0] === "free";
      case "RIGHT":
        return vision[1][2] === "free";
      case "STAY":
        return true;
    }
    return false;
  }

  // Filtrer les moves valides
  const validMoves = moves.filter(canMove);

  // Choisir un move valide aléatoire
  const move =
    validMoves[Math.floor(Math.random() * validMoves.length)] || "STAY";

  const action = "NONE";

  res.json({ move, action });
});

module.exports = router;
