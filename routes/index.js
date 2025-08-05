const express = require("express");
const router = express.Router();

const moves = ["UP", "DOWN", "LEFT", "RIGHT", "STAY"];

// Mémoire globale
let botMemory = {
  position: [0, 0],
  mazeMap: {}, // clé "x,y" => "wall" ou "free"
};

// Fonction pour transformer coordonnées en clé string
function key(x, y) {
  return `${x},${y}`;
}

// Met à jour la carte mémoire avec la vision locale 3x3 reçue
function updateMapWithVision(vision, posX, posY) {
  // vision est un tableau 3x3
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      const cell = vision[dx + 1][dy + 1];
      const mapX = posX + dx;
      const mapY = posY + dy;
      botMemory.mazeMap[key(mapX, mapY)] = cell;
    }
  }
}

// Trouve un mouvement valide (pas mur) parmi les moves
function findValidMove() {
  const [x, y] = botMemory.position;

  const directions = {
    UP: [x - 1, y],
    DOWN: [x + 1, y],
    LEFT: [x, y - 1],
    RIGHT: [x, y + 1],
    STAY: [x, y],
  };

  // Priorité : éviter murs
  for (const move of moves) {
    const [nx, ny] = directions[move];
    const cell = botMemory.mazeMap[key(nx, ny)];
    if (cell !== "wall" && cell !== undefined) {
      return move;
    }
  }
  // Si tout est mur ou inconnu, rester sur place
  return "STAY";
}

router.get("/action", (req, res) => {
  // Récupérer la vision locale si fournie en query param
  let vision;
  try {
    if (req.query.vision) {
      vision = JSON.parse(req.query.vision);
    }
  } catch (e) {
    vision = null;
  }

  if (vision && Array.isArray(vision) && vision.length === 3) {
    // Mettre à jour la carte
    const [posX, posY] = botMemory.position;
    updateMapWithVision(vision, posX, posY);
  }

  // Trouver le meilleur mouvement
  const move = findValidMove();

  // Met à jour la position si on bouge (supposition que move est valide)
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

  res.json({ move });
});

module.exports = router;
