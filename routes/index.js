var express = require("express");
var router = express.Router();

const directions = ["UP", "RIGHT", "DOWN", "LEFT"];

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

// Choisit le prochain mouvement selon la méthode "toujours à droite"
function decideMove(vision) {
  // On va tester les directions dans un ordre de priorité : droite, avant, gauche, arrière
  const priority = ["RIGHT", "UP", "LEFT", "DOWN"];

  for (let dir of priority) {
    if (isFree(vision, dir)) {
      return dir;
    }
  }
  return "STAY"; // si bloqué
}

router.get("/action", (req, res) => {
  let vision;
  try {
    vision = JSON.parse(req.query.vision);
  } catch (e) {
    vision = null;
  }

  console.log("Vision:", JSON.stringify(vision));

  const move = vision ? decideMove(vision) : "UP";

  console.log("Move choisi:", move);

  res.json({ move, action: "NONE" });
});

module.exports = router;
