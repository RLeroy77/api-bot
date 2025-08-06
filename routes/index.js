const express = require("express");
const router = express.Router();

const moves = ["UP", "DOWN", "LEFT", "RIGHT", "STAY"];

let botMemory = {
  position: [0, 0],
  mazeMap: {}, // "x,y" => "wall" | "free"
  visited: new Set(), // positions déjà visitées
};

function key(x, y) {
  return `${x},${y}`;
}

function updateMapWithVision(vision, posX, posY) {
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      const cell = vision[dx + 1][dy + 1];
      const mapX = posX + dx;
      const mapY = posY + dy;
      botMemory.mazeMap[key(mapX, mapY)] = cell;
    }
  }
}

function findValidMove() {
  const [x, y] = botMemory.position;
  botMemory.visited.add(key(x, y));

  const directions = {
    UP: [x - 1, y],
    DOWN: [x + 1, y],
    LEFT: [x, y - 1],
    RIGHT: [x, y + 1],
    STAY: [x, y],
  };

  // 1️⃣ Cherche un move vers une case libre jamais visitée
  for (const move of moves) {
    const [nx, ny] = directions[move];
    const cell = botMemory.mazeMap[key(nx, ny)];
    if (cell === "free" && !botMemory.visited.has(key(nx, ny))) {
      return move;
    }
  }

  // 2️⃣ Sinon, recule vers une case libre déjà visitée (backtrack)
  for (const move of moves) {
    const [nx, ny] = directions[move];
    const cell = botMemory.mazeMap[key(nx, ny)];
    if (cell === "free") {
      return move;
    }
  }

  // 3️⃣ Si bloqué, rester sur place
  return "STAY";
}

router.get("/action", (req, res) => {
  let vision;
  try {
    if (req.query.vision) {
      vision = JSON.parse(req.query.vision);
    }
  } catch (e) {
    vision = null;
  }

  if (vision && Array.isArray(vision) && vision.length === 3) {
    const [posX, posY] = botMemory.position;
    updateMapWithVision(vision, posX, posY);
  }

  const move = findValidMove();

  // Mise à jour position
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
  }

  console.log(`Position: ${botMemory.position}, Move: ${move}`);
  res.json({ move });
});

module.exports = router;
