const express = require("express");
const path = require("path");
const cors = require("cors");
const router = require("./routes/index");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Servir les fichiers statiques (ton frontend)
app.use(express.static(path.join(__dirname, "public")));

// Routes API
app.use("/", router);

module.exports = app;
