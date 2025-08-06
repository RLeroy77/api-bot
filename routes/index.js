const express = require("express");
const router = express.Router();

const moves = ["UP", "DOWN", "LEFT", "RIGHT"];
const moveVectors = {
  UP: [-1, 0],
  DOWN: [1, 0],
  LEFT: [0, -1],
  RIGHT: [0, 1],
};

let botMemory = {
  position: [0, 0],
  mazeMap: {}, // "x,y" => "wall" | "free"
  visited: new Set(),
  path: [], // Liste de moves à suivre
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

/**
 * BFS pour trouver le chemin vers la case libre la plus proche non visitée
 */
function bfsPath(start) {
  const queue = [[start]];
  const visited = new Set([key(...start)]);

  while (queue.length > 0) {
    const path = queue.shift();
    const [cx, cy] = path[path.length - 1];

    // Cherche une case libre non visitée comme objectif
    if (
      botMemory.mazeMap[key(cx, cy)] === "free" &&
      !botMemory.visited.has(key(cx, cy))
    ) {
      return path;
    }

    // Explore voisins
    for (const move of moves) {
      const [dx, dy] = moveVectors[move];
      const nx = cx + dx;
      const ny = cy + dy;
      const nk = key(nx, ny);

      if (botMemory.mazeMap[nk] === "free" && !visited.has(nk)) {
        visited.add(nk);
        queue.push([...path, [nx, ny]]);
      }
    }
  }

  return null; // Aucun chemin trouvé
}

function getMoveToNextStep() {
  // Si on n'a pas de chemin, en recalculer un
  if (botMemory.path.length === 0) {
    const newPath = bfsPath(botMemory.position);
    if (newPath && newPath.length > 1) {
      // On retire la position actuelle et garde que le chemin à suivre
      botMemory.path = newPath.slice(1);
    }
  }

  if (botMemory.path.length > 0) {
    const [nextX, nextY] = botMemory.path.shift();
    const [curX, curY] = botMemory.position;

    if (nextX < curX) return "UP";
    if (nextX > curX) return "DOWN";
    if (nextY < curY) return "LEFT";
    if (nextY > curY) return "RIGHT";
  }

  return "STAY"; // Rien à faire
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

  const [posX, posY] = botMemory.position;

  if (vision && Array.isArray(vision) && vision.length === 3) {
    updateMapWithVision(vision, posX, posY);
  }

  botMemory.visited.add(key(posX, posY));

  const move = getMoveToNextStep();

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
