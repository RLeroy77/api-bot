const express = require("express");
// const path = require("path"); // Serveur de fichiers statiques (décommenter si besoin)
const cors = require("cors");

const indexRouter = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares utiles pour parser le corps des requêtes POST (optionnel pour GET)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS : activer si le client (simulateur) est sur un autre domaine
app.use(cors());

// Servir des fichiers statiques (ex: interface web)
// app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Bot running on port ${PORT}`);
});

module.exports = app;
