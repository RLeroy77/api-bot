var express = require("express");
var router = express.Router();

const directions = ["UP", "RIGHT", "DOWN", "LEFT"]; // sens horaire
let currentDirectionIndex = 0; // commence vers UP

// Vérifie si la case à une direction donnée est libre
function isFree(vision, direction) {
  try {
    switch (direction) {
      case "UP":
        return vision[0][1] === "free";
      case "RIGHT":
        return vision[1][2] === "free";
      case "DOWN":
        return vision[2][1] === "free";
      case "LEFT":
        return vision[1][0] === "free";
      default:
        return false;
    }
  } catch {
    return false;
  }
}

// Méthode toujours à droite
function decideMove(vision) {
  let rightIndex = (currentDirectionIndex + 1) % 4;
  let frontIndex = currentDirectionIndex;
  let leftIndex = (currentDirectionIndex + 3) % 4;
  let backIndex = (currentDirectionIndex + 2) % 4;

  // Vérifie en priorité la droite
  if (isFree(vision, directions[rightIndex])) {
    currentDirectionIndex = rightIndex;
    return directions[rightIndex];
  }
  // Sinon avance si possible
  if (isFree(vision, directions[frontIndex])) {
    return directions[frontIndex];
  }
  // Sinon tourne à gauche
  if (isFree(vision, directions[leftIndex])) {
    currentDirectionIndex = leftIndex;
    return directions[leftIndex];
  }
  // Sinon demi-tour
  currentDirectionIndex = backIndex;
  return directions[backIndex];
}

router.get("/action", (req, res) => {
  let vision;
  try {
    vision = JSON.parse(req.query.vision);
  } catch {
    vision = null;
  }

  console.log("Vision:", JSON.stringify(vision));

  const move = vision ? decideMove(vision) : "UP";

  console.log("Move choisi:", move);

  res.json({ move, action: "NONE" });
});

module.exports = router;
