const express = require("express");
const cors = require("cors");
const path = require("path");
const indexRouter = require("./routes/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Servir les fichiers statiques (interface web)
app.use(express.static(path.join(__dirname, "public")));

// Utiliser nos routes API
app.use("/", indexRouter);

module.exports = app;
