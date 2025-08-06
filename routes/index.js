const express = require("express");
const router = express.Router();

const directions = ["UP", "RIGHT", "DOWN", "LEFT"];
let currentDirectionIndex = 0;

router.get("/action", (req, res) => {
  currentDirectionIndex = (currentDirectionIndex + 1) % directions.length;
  const move = directions[currentDirectionIndex];
  const action = "NONE";

  console.log(`Bot joue: ${move}/${action}`);

  res.json({ move, action });
});

module.exports = router;
