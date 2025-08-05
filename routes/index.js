var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Bienvenue sur BOT WAR API");
});

// Route GET /action
router.get("/action", function (req, res, next) {
  res.json({ move: "UP", action: "COLLECT" });
});

module.exports = router;
