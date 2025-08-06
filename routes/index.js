var express = require("express");
var router = express.Router();

// Directions et rotations
const directions = ["UP", "RIGHT", "DOWN", "LEFT"];
let currentDirectionIndex = 0; // 0 = UP par défaut

// Fonction utilitaire pour vérifier si une case est libre
function isFree(vision, move) {
  switch (move) {
    case "UP":
      return vision[0][1] === "free";
    case "DOWN":
      return vision[2][1] === "free";
    case "LEFT":
      return vision[1][0] === "free";
    case "RIGHT":
      return vision[1][2] === "free";
    default:
      return false;
  }
}

// Obtenir direction à droite
function rightOf(dirIndex) {
  return directions[(dirIndex + 1) % 4];
}

// Obtenir direction à gauche
function leftOf(dirIndex) {
  return directions[(dirIndex + 3) % 4];
}

// Demi-tour
function backOf(dirIndex) {
  return directions[(dirIndex + 2) % 4];
}

router.get("/action", (req, res) => {
  let vision;
  try {
    vision = JSON.parse(req.query.vision);
  } catch (e) {
    vision = null;
  }

  if (!vision) {
    // Si aucune vision reçue → avancer tout droit
    res.json({ move: directions[currentDirectionIndex], action: "NONE" });
    return;
  }

  let dirIndex = currentDirectionIndex;

  // Vérifie à droite
  if (isFree(vision, rightOf(dirIndex))) {
    dirIndex = (dirIndex + 1) % 4; // Tourner à droite
  }
  // Sinon si devant est libre, on garde la direction
  else if (isFree(vision, directions[dirIndex])) {
    // rien à changer
  }
  // Sinon si gauche est libre, on tourne à gauche
  else if (isFree(vision, leftOf(dirIndex))) {
    dirIndex = (dirIndex + 3) % 4;
  }
  // Sinon demi-tour
  else {
    dirIndex = (dirIndex + 2) % 4;
  }

  currentDirectionIndex = dirIndex;
  const move = directions[dirIndex];

  res.json({ move, action: "NONE" });
});

module.exports = router;
