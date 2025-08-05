const express = require("express");
const path = require("path");
const cors = require("cors");

const indexRouter = require("./routes/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/", indexRouter);

app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
