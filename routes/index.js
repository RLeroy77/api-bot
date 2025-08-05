const express = require("express");
const router = express.Router();

const moves = ["UP", "DOWN", "LEFT", "RIGHT", "STAY"];
const actions = ["NONE"];

// Mémoire globale du bot entre appels
let botMemory = {
  position: [0, 0], // On suppose qu'on commence en 0,0
  mazeMap: {}, // Clé "x,y" => "wall" ou "free" (pour l'instant vide)
  lastMoveIndex: -1,
};

function getNextMove() {
  // On cycle sur les directions pour explorer
  botMemory.lastMoveIndex = (botMemory.lastMoveIndex + 1) % (moves.length - 1); // -1 car on exclut "STAY" pour explorer
  return moves[botMemory.lastMoveIndex];
}

router.get("/action", (req, res) => {
  const move = getNextMove();
  const action = "NONE";

  // Optionnel: mise à jour position si on sait que le move a réussi (ici on simule)
  // Par exemple, pour avancer la position :
  const [x, y] = botMemory.position;
  switch (move) {
    case "UP":
      botMemory.position = [x - 1, y];
      break;
    case "DOWN":
      botMemory.position = [x + 1, y];
      break;
    case "LEFT":
      botMemory.position = [x, y - 1];
      break;
    case "RIGHT":
      botMemory.position = [x, y + 1];
      break;
    case "STAY":
      break;
  }

  res.json({ move, action });
});

module.exports = router;
